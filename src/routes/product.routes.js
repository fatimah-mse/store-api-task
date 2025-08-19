const express = require("express")
const router = express.Router()
const productController = require("../controllers/product.controller")
const auth = require("../middlewares/auth.middleware")
const upload = require("../config/multer")
const { createProductValidate, updateProductValidate } = require("../validation/product.validate")

router.get("/", [auth], productController.getAllProducts)
router.get("/:id", [auth], productController.getProductById)
router.post("/", [auth , upload.single("image")], [...createProductValidate], productController.createProduct)
router.put("/:id", [auth , upload.single("image")], [...updateProductValidate], productController.updateProduct)
router.delete("/:id", [auth], productController.deleteProduct)

module.exports = router