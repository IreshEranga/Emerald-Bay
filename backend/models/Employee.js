const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create student schema

const employeeSchema = new Schema({

    EmpID: {
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
        required: true
    },
})


const Employee = mongoose.model("Employees", employeeSchema);

module.exports = Employee;