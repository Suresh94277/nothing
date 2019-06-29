const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    id : {type:String},
    fname:{type:String},
    mname:{type:String},
    lname:{type:String},
    standard:{type:String},
    parent_name:{type:String},
    parent_phone:{type:String},
    dob:{type:Date},
    gender: String,
    address:{type:String}, 
    blood_group:{type:String},
    image: String 
})
const Student = mongoose.model("students", studentSchema);
module.exports = Student;