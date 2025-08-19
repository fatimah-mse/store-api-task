const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY)
}

module.exports = generateToken