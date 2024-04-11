const mongoose = require("mongoose");
const USER_ROLES = require("../constants/roles");


// Create student schema

const customerSchema = new mongoose.Schema({

    
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
    },
    role:{
        type:String,
        default:USER_ROLES.CUSTOMER,
    },
})


module.exports = mongoose.model("Customer", customerSchema);;