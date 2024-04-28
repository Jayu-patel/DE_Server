const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("userdatas",Schema)