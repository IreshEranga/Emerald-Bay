const router = require("express").Router();

//import Student model
let Employee = require("../models/Employee");


//add student
router.route("/add").post((req,res)=>{
    //create a new student object with the data from the request body

    const userId = req.body.userId;
    const name = req.body.name;
    const email = req.body.email;

    //convert request to a number 
    const mobile = Number(req.body.mobile);

    const newEmployee = new Employee({
        userId,
        name,
        email,
        mobile
    });

    newEmployee.save()
    //if insert success  //js promise
        .then(()=>{
            res.json("Student Added ");
        })
        //if unsucces
        .catch((err)=>{
            console.log(err);
        })
})

//get students
router.route("/").get((req, res) => {
    //return all students in the database
    Employee.find()
    .then((Employees)=>{
        res.json(Employees);
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

// update student
router.route("/update/:userId").put(async (req, res) => {
    let userId = req.params.userId;

    // destructure the request body
    const { name, email, mobile } = req.body;

    const updateEmployee = {
        userId,
        name,
        email,
        mobile
    };

    try {
        const updateEmployee = await Em.findOneAndUpdate({ userId }, updateEmployee, { new: true });

        if (!updatedEmployee) {
            return res.status(404).send({ status: "User not found" });
        }

        res.status(200).send({ status: "User updated", user: updatedEmployee });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    }
});


//delete student
router.route("/delete/:userId").delete(async (req,res)=>{
    let userId=req.params.userId;
    
    await Employee.findOneAndDelete({userId:userId})
    .then(()=>{
        res.status(200).send({status:"User deleted"})
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete student", error : err.message});
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

// fetch data from one student
router.route("/get/:userId").get(async (req, res) => {
    let userId = req.params.userId;

    try {
        const user = await Employee.findOne({ userId: userId });

        if (!user) {
            return res.status(404).send({ status: "Student not found" });
        }

        res.status(200).send({ status: "Student fetched", user: user });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting student", error: err.message });
    }
});



module.exports = router;