const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    feedback: String,
    serial_number: String,
    user_id: String,
    user: Object,
}, {timestamps: true})

module.exports = mongoose.model('feedbacks', feedbackSchema)