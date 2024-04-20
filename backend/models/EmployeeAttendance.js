const mongoose = require("mongoose");

// Create EmployeeAttendance schema
const EmployeeAttendanceSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // Remove the password field as it's not mentioned in the controller functions
}, {
    timestamps: true,
});

module.exports = mongoose.model("EmployeeAttendance", EmployeeAttendanceSchema);
