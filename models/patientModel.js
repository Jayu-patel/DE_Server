const mongoose = require('mongoose')
require('dotenv').config()
const link = process.env.LINK
mongoose.connect(link)

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    age: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    hospitalName: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('Patient',userSchema)