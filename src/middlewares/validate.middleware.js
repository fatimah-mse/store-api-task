const { validationResult } = require("express-validator")
const response = require('../utils/response')

const validate = (req, res, next) => {
    try {
        const result = validationResult(req)

        if(!result.isEmpty()) {
            const errors = result.array().map(e => e.msg)
            return res.status(400).json(response.responseError("Validation failed", errors))
        }

        next()
    } catch(error) {
        throw res.status(500).json(response.responseError(error.message))
    }
}

module.exports = validate