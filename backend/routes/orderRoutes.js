const router = require("express").Router();

//import order model
let Order = require("../models/Order");


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

//get employees
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


//update student
/*
router.route("/update/:id").put(async (req,res)=>{
    
    let stdId = req.params.id;
    
    //dstructure
    const {userId,name,email,mobile} = req.body;

    const updateStudent = {
        userId,
        name,
        email,
        mobile
    }

    const update = await Student.findByIdAndUpdate(stdId, updateStudent)
    .then(()=>{
        res.status(200).send({status: "User updated", user: update });
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })


    
})*/

// update order
/*router.route("/update/:orderid").put(async (req, res) => {
    let orderid = req.params.orderid;

    // destructure the request body
    const { deliveryaddress, items,totalprice, status } = req.body;

    const updateOrder = {
        orderid,
        customerid,
        customername,
        deliveryaddress,
        items,
        totalprice,
        status
    };

    try {
        const updateOrder = await Em.findOneAndUpdate({ orderid }, updateOrder, { new: true });

        if (!updatedOrder) {
            return res.status(404).send({ status: "Order not found" });
        }

        res.status(200).send({ status: "Order updated", order: updatedOrder });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    }
});*/

/*
router.route("/update/:orderid").put(async (req, res) => {
    const orderid = req.params.orderid;
    const { deliveryaddress, items, totalprice, rider,status } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderid },
            { deliveryaddress, items, totalprice: Number(totalprice),rider, status },
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
});*/

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


//fetch data from one student
/*
router.route("/get/:userId").get(async (req,res)=>{

    let userId = req.params.userId;

    const user = await Student.findOne({userId:userId})
    .then(()=>{
        res.status(200).send({status: "Student fetched ", user: user })
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get student ", error : err.message});   
     })
})*/

// fetch data from one employee
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



module.exports = router;