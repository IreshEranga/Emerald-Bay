const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create student schema

const employeeSchema = new Schema({

    userId: {
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
    mobile: {
        type: Number,
        required: true
    },
})


const Employee = mongoose.model("Employees", employeeSchema);

module.exports = Employee;