const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")
const auth = require("../middlewares/auth.middleware")
const { signupValidate, loginValidate } = require("../validation/auth.validate")
const upload = require("../config/multer")

router.post("/signup", [ upload.single("profile_image"), ...signupValidate ], authController.signup)
router.post("/login", [...loginValidate], authController.login)
router.post("/logout", [auth], authController.logout)

module.exports = router