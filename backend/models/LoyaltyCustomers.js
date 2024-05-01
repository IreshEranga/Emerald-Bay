const mongoose = require("mongoose");

// Create customer schema
const loyaltycustomersSchema = new mongoose.Schema({
   
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
    membershipType: { // New field for membership type
        type: String,
        enum: ['gold', 'silver', 'diamond'], // Allow only these values
        required: true
    },
     status: {
        type: String,
        default: "Normal",
    },

   
    
});



module.exports = mongoose.model("LoyaltyCustomers", loyaltycustomersSchema);
