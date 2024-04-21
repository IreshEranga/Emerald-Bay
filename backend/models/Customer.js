const mongoose = require("mongoose");
const USER_ROLES = require("../constants/roles");

// Create customer schema
const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        
        unique: true
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
    password: {
        type: String,
    },
    status: {
        type: String,
        default: "Normal",
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: USER_ROLES.CUSTOMER,
    },
});

// Define a function to generate the next customer ID
customerSchema.pre("save", async function (next) {
    const Customer = this.constructor;
    const lastCustomer = await Customer.findOne({}, {}, { sort: { customerId: -1 } });
    let newCustomerId;
    if (lastCustomer) {
        const lastCustomerId = parseInt(lastCustomer.customerId.slice(-2)); // Extract the numerical part from the last employeeid
        newCustomerId = `cus${(lastCustomerId + 1).toString().padStart(2, "0")}`; // Increment and format the new employeeid
    } else {
        newCustomerId = "cus01"; // If there are no riders yet, start from 01
    }
    this.customerId = newCustomerId;
    next();
});

module.exports = mongoose.model("Customer", customerSchema);
