const User = require("../models/User")
const argon2 = require("argon2")
const response = require('../utils/response.js')
const generateToken = require('../utils/jwt.js')

class AuthController {

    signup = async (req, res) => {
        try {
            const { first_name, 
                    last_name, 
                    user_name, 
                    email, 
                    password } = req.body

            const hashedPassword = await argon2.hash(password)

            if (!req.file) {
                return res.status(400).json(response.responseError("Profile image is required"))
            }

            const user = await User.create({
                first_name,
                last_name,
                user_name,
                email,
                password: hashedPassword,
                profile_image: req.file.filename 
            })

            const token = generateToken({
                id: user._id,
                email: user.email
            })

            return res.status(200).json(response.responseSuccess("Sign Up Successfully", {
                token,
                user: {
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                    email: user.email,
                    profile_image: `${req.protocol}://${req.get("host")}/${user.profile_image}`
                }
            }))
        } catch (err) {
            return res.status(500).json(response.responseError(err.message))
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            const isPasswordCorrect = await argon2.verify(user.password, password)

            if (!isPasswordCorrect) {
                return res.status(400).json(response.responseError("Email or password is incorrect"))
            }

            const token = generateToken({
                id: user._id,
                email: user.email,
                role: user.role
            })

            return res.status(200).json(response.responseSuccess("Login Successfully", {
                token,
                user: {
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                    email: user.email,
                    profile_image: `${req.protocol}://${req.get("host")}/${user.profile_image}`
                }
            }))
        } catch (err) {
            return res.status(500).json(response.responseError(err.message))
        }
    }

    logout = async (req, res) => {
        try {
            const user = req.user
            if (!user) {
                return res.status(400).json(response.responseError("Unauthorized"))
            }

            return res.status(200).json(response.responseSuccess("Logged out Successfully"))
        } catch (error) {
            return res.status(500).json(response.responseError(error.message))
        }
    }

}

module.exports = new AuthController()