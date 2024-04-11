const router = require("express").Router();

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

//get students



module.exports = router;