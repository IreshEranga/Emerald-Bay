const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
    {
        orderid:{type:String,required:true},
        customerid:{type:String, required:true},
        customername:{type:String, required:true},
        deliveryaddress:{type:String, required:true},
        items:[{}],
        totalprice:{type:Number,default:0},
        status:{type:String,
            //enum: ["pending", "ongoing", "completed","Approved"],
            default: "pending",},
        rider:{type: String},
        date:{type:Date},
        time:{type:String}

    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
