const User = require("../models/User")
const response = require('../utils/response.js')

class UserController {

    getMe = async (req, res) => {
        try {
            const user = await User.findById(req.user.id)

            res.status(200).json(response.responseSuccess("User profile fetched", {
                first_name: user.first_name,
                last_name: user.last_name,
                profile_image: `${req.protocol}://${req.get("host")}/${user.profile_image}`
            }))
        } catch (err) {
            res.status(500).json(response.responseError(err.message))
        }
    }

}

module.exports = new UserController()