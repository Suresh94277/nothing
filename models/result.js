const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    student: Object,
    date: Date,
    serial_number: String,
    standard: String,
    term: String,
    subjects: [Object]
})

module.exports = mongoose.model("results", resultSchema)
