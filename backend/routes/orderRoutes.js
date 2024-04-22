const router = require("express").Router();

//import order model
let Order = require("../models/Order");
//import rider model
const Rider = require("../models/Rider");


//create order
router.route("/create").post((req,res)=>{
    //create a new order object with the data from the request body

    const orderid = req.body.orderid;
    const customerid = req.body.customerid;
    const customername = req.body.customername;
    const deliveryaddress = req.body.deliveryaddress;
    const items = req.body.items;
    const totalprice = Number(req.body.totalprice);
    const rider = req.body.rider;
    const status = req.body.status;
   // const salary = req.body.salary;

    

    const newOrder = new Order({
        orderid,
        customerid,
        customername,
        deliveryaddress,
        items,
        totalprice,
        rider,
        status
    });



    newOrder.save()
    //if insert success  //js promise
        .then(()=>{
            res.json("Order Created ");
        })
        //if unsucces
        .catch((err)=>{
            console.log(err);
        })
})

//get 
router.route("/").get((req, res) => {
    //return all orders in the database
    Order.find()
    .then((Orders)=>{
        res.json(Orders);
    })
    .catch((err)=>{
        console.log(err);
    })
})


router.route("/update/:orderid").put(async (req, res) => {
    const orderid = req.params.orderid;
    const { rider, status } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderid },
            { rider, status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ status: "Order updated", order: updatedOrder });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating order" });
    }
});



//delete employee
router.route("/delete/:orderid").delete(async (req,res)=>{
    let EmpID=req.params.EmpID;
    
    await Order.findOneAndDelete({orderid:orderid})
    .then(()=>{
        res.status(200).send({status:"Order deleted"})
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete order", error : err.message});
    })


})


// fetch data from 
router.route("/get/:orderid").get(async (req, res) => {
    let orderid = req.params.orderid;

    try {
        const order = await Order.findOne({ orderid : orderid});

        if (!order) {
            return res.status(404).send({ status: "order not found" });
        }

        res.status(200).send({ status: "order fetched", order: order });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting order", error: err.message });
    }
});

router.get('/rider/:rider', async (req, res) => {
    const rider = req.params.rider;

    try {
        const orders = await Order.find({ rider: rider });
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error retrieving orders for rider' });
    }
});

// Update order status to completed and set rider status as available


/*router.route("/update/status/:orderid").put(async (req, res) => {
    const orderId = req.params.orderid;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            { status: "completed" }, // Set the status to completed
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update rider status to Available after completing order
        await Rider.findOneAndUpdate(
            { name: updatedOrder.rider },
            { status: "Available" },
            { new: true }
        );

        res.status(200).json({ status: "Order status updated", order: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating order status" });
    }
});*/

router.route("/update/status/:orderid").put(async (req, res) => {
    const orderId = req.params.orderid;

    try {
        // Update order status to completed
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            { status: "completed" },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update rider status to Available
        await Rider.findOneAndUpdate(
            { name: updatedOrder.rider },
            { status: "Available" },
            { new: true }
        );

        res.status(200).json({ status: "Order status updated", order: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating order status" });
    }
});


module.exports = router;