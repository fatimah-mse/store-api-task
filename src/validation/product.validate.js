const { body } = require("express-validator")
const validate = require("../middlewares/validate.middleware")

const createProductValidate = [
    body("name")
        .trim()
        .isString().withMessage("Product's Name must be string")
        .bail()
        .notEmpty().withMessage("Product's Name is required")
        .bail(),

    body("price")
        .trim()
        .isString().withMessage("Product's Price must be string")
        .bail()
        .notEmpty().withMessage("Product's Price is required")
        .bail(),

    validate
]

const updateProductValidate = [
    body("name")
        .optional()
        .trim()
        .isString().withMessage("Product's Name must be string")
        .bail(),

    body("price")
        .optional()
        .trim()
        .isString().withMessage("Product's Price must be string")
        .bail(),

    validate
]

module.exports = {
    createProductValidate,
    updateProductValidate
}