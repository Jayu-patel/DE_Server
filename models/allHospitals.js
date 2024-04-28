const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fullAdd: {
        type: String,
        required: true
    },
    bed: {
        type: Number,
        required: true,
    },
    distance: {
        type: String,
        required: true
    },
    ad: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    services: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('hospital',userSchema)