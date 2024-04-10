const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create student schema

const employeeSchema = new mongoose.Schema({

    employeeid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    category:{
        type:String,
    },
    password:{type:String, required:true}
},{
    timestamps:true,
});


module.exports = mongoose.model("Employee", employeeSchema);