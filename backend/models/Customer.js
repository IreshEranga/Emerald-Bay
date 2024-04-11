const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create student schema

const customerSchema = new Schema({

    
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
    password:{
        type:String,
    },
    status:{
        type:String,
        default:"Normal",
    },
    address:{
        type:String,
    }
})


const Customer = mongoose.model("Customers", customerSchema);

module.exports = Customer;