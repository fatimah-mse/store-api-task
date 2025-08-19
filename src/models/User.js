const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    user_name: {
        type: String,
        trim: true,
        required: true
    },
    email: { 
        type: String, 
        trim: true,
        unique: true, 
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User