const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
    {
        orderid:{type:String,unique:true},
        customerid:{type:String, required:true},
        customername:{type:String, required:true},
        deliveryaddress:{type:String, required:true},
        items:[{}],
        totalprice:{type:Number,default:0},
        status:{type:String,
            //enum: ["pending", "ongoing", "completed","Approved"],
            default: "pending",},
        rider:{type: String},
        date:{type:Date,
            default: Date.now},
        time:{type:String}

    },
    {
        timestamps:true,
    }
);

// Define a function to generate the next order ID
async function generateNextOrderid() {
    const lastOrder = await this.findOne({}, {}, { sort: { 'orderid': -1 } });
    const lastOrderid = lastOrder ? parseInt(lastOrder.orderid, 10) : 0;
    return (lastOrderid + 1).toString();
}

orderSchema.pre("save", async function (next) {
    if (!this.orderid) {
        this.orderid = await generateNextOrderid.call(this.constructor);
    }
    next();
});

module.exports = mongoose.model("Order", orderSchema);
