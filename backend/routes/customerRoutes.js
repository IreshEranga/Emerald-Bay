const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

//import Student model
const Customer = require("../models/Customer");


//add student
router.route("/add").post((req,res)=>{
    //create a new student object with the data from the request body

    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const status = req.body.status;
    const address = req.body.address;

    //convert request to a number 
    const mobile = Number(req.body.mobile);

    const newCustomer = new Customer({
        
        name,
        email,
        mobile,
        password,
        status,
        address,
    });

    newCustomer.save()
    //if insert success  //js promise
        .then(()=>{
            res.json("Customer Added ");
        })
        //if unsucces
        .catch((err)=>{
            console.log(err);
        })
});



/*router.post("/add", authMiddleware(["CUSTOMER"]), async (req, res) => {
    try {
      const { name, email, address, mobile, password, status } = req.body;
  
      // Convert mobile to number
      const mobileNumber = Number(mobile);
  
      const newCustomer = new Customer({
        name,
        email,
        address,
        mobile: mobileNumber,
        password, // Assuming password is already hashed
        status,
      });
  
      await newCustomer.save();
      res.status(201).json({ success: true, message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Error adding customer" });
    }
  });*/

module.exports = router;