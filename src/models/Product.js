const { default: mongoose, Schema } = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

module.exports = Product