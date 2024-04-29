const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({

    customerService: {type: "String"},
    delivery: {type: "String" },
    email: {type: "String"},
    message:{type:"String"},
    name:{type:"String"},
    overallExperience:{type:"String"},
    prices:{type:"String"},
    taste:{type:"String"},
    status:{type:"String",default:"PENDING"}
    
},
{
    timestapms: true,
});
module.exports = mongoose.model("Feedback", feedbackSchema);
