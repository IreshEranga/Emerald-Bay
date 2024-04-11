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
async function generateNextCustomerId() {
    const lastCustomer = await this.findOne({}, {}, { sort: { 'customerId': -1 } });
    const lastCustomerId = lastCustomer ? parseInt(lastCustomer.customerId, 10) : 0;
    return (lastCustomerId + 1).toString();
}

customerSchema.pre("save", async function (next) {
    if (!this.customerId) {
        this.customerId = await generateNextCustomerId.call(this.constructor);
    }
    next();
});

module.exports = mongoose.model("Customer", customerSchema);
