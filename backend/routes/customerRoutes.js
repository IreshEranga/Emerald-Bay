const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const TableReservation = require("../models/TableReservation");
const VIPRoomReservation = require("../models/VIPRoomReservation");
const Event = require("../models/Event");
const sendEmail = require("../util/sendEmail");
const customerRegistrationEmailTemplate = require("../util/email_templates/customerRegistrationEmailTemplate");
const LoyaltyCustomers = require("../models/LoyaltyCustomers");
const Order =  require("../models/Order")

//add customers
router.route("/add").post(async (req,res)=>{
    //create a new customers object with the data from the request body

    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const status = req.body.status;
    const address = req.body.address;

    //convert request to a number 
    const mobile = Number(req.body.mobile);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
        
        name,
        email,
        mobile,
        password:hashedPassword,
        status,
        address,
    });

    newCustomer.save()
    //if insert success  //js promise
        .then(()=>{
            res.json("Customer Added ");
            // Send confirmation email to the customer
      const emailTemplate = customerRegistrationEmailTemplate(name, email, mobile, password, address);
      sendEmail(email, "Registration Confirmation", emailTemplate);
        })
        //if unsucces
        .catch((err)=>{
            console.log(err);
        })
});




  //get customers
router.route("/").get((req, res) => {
  //return all customers in the database
  Customer.find()
  .then((customers)=>{
      res.json(customers);
  })
  .catch((err)=>{
      console.log(err);
  })
})




// update customer profile
router.route("/update/:_id").put(async (req, res) => {
  let _id = req.params._id;

  // destructure the request body
  const { name, email, mobile, address, password } = req.body;

  const updateCustomer = {
      name,
      email,
      mobile,
      address,
      password,
  };

  try {
      const updatedCustomer = await Customer.findOneAndUpdate({ _id }, updateCustomer, { new: true });

      if (!updatedCustomer) {
          return res.status(404).send({ status: "Customer not found" });
      }

      res.status(200).send({ status: "Customer updated", user: updatedCustomer });
  } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
  }
});


//delete customer
router.route("/delete/:_id").delete(async (req,res)=>{
  let _id=req.params._id;
  
  await Customer.findOneAndDelete({_id:_id})
  .then(()=>{
      res.status(200).send({status:"User deleted"})
  })
  .catch((err)=>{
      console.log(err.message);
      res.status(500).send({status:"Error with delete student", error : err.message});
  })


})



// fetch data from one customer
router.route("/get/:_id").get(async (req, res) => {
  let _id = req.params._id;

  try {
      const user = await Customer.findOne({ _id: _id });

      if (!user) {
          return res.status(404).send({ status: "Customer not found" });
      }

      res.status(200).send({ status: "Customer fetched", user: user });
  } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with getting customer", error: err.message });
  }
});

// Fetch table reservations by customer email
router.get("/tableReservations/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const tableReservations = await TableReservation.find({ email: customer.email });
    res.json(tableReservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving table reservations" });
  }
});

// Fetch VIP room reservations by customer email
router.get("/vipRoomReservations/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const vipRoomReservations = await VIPRoomReservation.find({ email: customer.email });
    res.json(vipRoomReservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving VIP room reservations" });
  }
});

// Fetch events by customer email
router.get("/events/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const events = await Event.find({ email: customer.email });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving events" });
  }
});

// Fetch orders by customer id
router.get("/orders/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const customer = await Customer.findOne({ _id });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const orders = await Order.find({ _id: customer._id });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
});



module.exports = router;