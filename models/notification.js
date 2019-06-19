const mongoose = require('mongoose')

const notificationShema = new mongoose.Schema({
    message: String,
    user_id: String,
    link: String,
}, {timestamps: true})

module.exports = mongoose.model('notifications', notificationShema)