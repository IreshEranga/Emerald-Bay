const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeLeaveSchema = new Schema({
    EmpID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    leaveFrom: {
        type: Date,
        required: true
    },
    leaveTo: {
        type: Date,
        required: true
    },
    leaveStatus: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING",
    }
});

//const EmployeeLeave = mongoose.model('EmployeeLeave', EmployeeLeaveSchema)
module.exports = mongoose.model("EmployeeLeave", EmployeeLeaveSchema);

//export default EmployeeLeave