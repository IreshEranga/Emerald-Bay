const router = require("express").Router();


const LoyaltyCustomers = require("../models/LoyaltyCustomers");



//add student
router.route("/add").post(async (req,res)=>{
    //create a new student object with the data from the request body

  
    const name = req.body.name;
    const email = req.body.email;
    const membershipType = req.body.membershipType;
  

    //convert request to a number 
    const mobile = Number(req.body.mobile);
   
    const newLoyaltyCustomers = new LoyaltyCustomers({

        name,
        email,
        mobile,
        membershipType,
       
    });

    newLoyaltyCustomers.save()
    //if insert success  //js promise
        .then(()=>{
            res.json("Loyalty Customer requested. ");
     
        })
        //if unsucces
        .catch((err)=>{
            console.log(err);
        })
});




  //get students
router.route("/").get((req, res) => {
  //return all students in the database
  LoyaltyCustomers.find()
  .then((LoyaltyCustomers)=>{
      res.json(LoyaltyCustomers);
  })
  .catch((err)=>{
      console.log(err);
  })
});


module.exports = router;