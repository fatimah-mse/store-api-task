const Product = require("../models/Product")
const response = require('../utils/response.js')
const fs = require("fs")
const path = require("path")

class ProductController {

    getAllProducts = async (req, res) => {
        try {
            const products = await Product.find()

            if (!products.length) {
                return res.status(200).json(response.responseSuccess("No Products Founded"))
            }

            const productsWithImageURL = products.map(product => ({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: `${req.protocol}://${req.get("host")}/${product.image}`,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }))

            res.status(200).json(response.responseSuccess("Products Fetched Successfully", productsWithImageURL))
        } catch (err) {
            res.status(500).json(response.responseError(err.message))
        }
    }

    getProductById = async (req, res) => {
        try {
            const { id } = req.params

            const product = await Product.findById(id)

            if (!product) {
                return res.status(404).json(response.responseError("Product not found"))
            }

            const productWithImageURL = {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: `${req.protocol}://${req.get("host")}/${product.image}`,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }

            res.status(200).json(response.responseSuccess("Product Fetched successfully", productWithImageURL))
        } catch (err) {
            res.status(500).json(response.responseError(err.message))
        }
    }

    createProduct = async (req, res) => {
        try {
            const { name, price } = req.body

            if (!req.file) {
                return res.status(400).json(response.responseError("Product image is required"))
            }

            const product = await Product.create({
                name,
                price,
                image: req.file.filename
            })

            res.status(200).json(response.responseSuccess("Product created successfully", {
                id: product._id,
                name: product.name,
                price: product.price,
                image: `${req.protocol}://${req.get("host")}/${product.image}`,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }))

        } catch (err) {
            res.status(500).json(response.responseError(err.message))
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { id } = req.params
            const { name, price } = req.body

            const product = await Product.findById(id)

            if (!product) {
                return res.status(404).json(response.responseError("Product not found"))
            }

            if (product.name === name && product.price === price && (!req.file || (product.image === req.file.filename))) {
                return res.status(200).json(response.responseSuccess("No changes made, Data is the same", product))
            }

            if (name) product.name = name
            if (price) product.price = price

            if (req.file && req.file.filename) {
                product.image = req.file.filename
            }

            await product.save()

            res.status(200).json(response.responseSuccess("Product updated successfully", {
                id: product._id,
                name: product.name,
                price: product.price,
                image: `${req.protocol}://${req.get("host")}/${product.image}`,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }))

        } catch (err) {
            res.status(500).json(response.responseError(err.message))
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params

            const product = await Product.findById(id)

            if (!product) {
                return res.status(404).json(response.responseError("Product not Founded"))
            }

            if (product.image) {
                const imagePath = path.join(__dirname, "../../public/uploads/", product.image)
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            }

            await Product.findByIdAndDelete(id)

            return res.status(200).json(response.responseSuccess("Product Deleted successfully"))
        } catch (err) {
            return res.status(500).json(response.responseError(err.message))
        }
    }
}

module.exports = new ProductController()