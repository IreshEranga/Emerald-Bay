const router = require("express").Router();

//import Student model
let Employee = require("../models/Employee");


//add employee
router.route("/add").post((req,res)=>{
    //create a new employee object with the data from the request body

    const EmpID = req.body.EmpID;
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const address = req.body.address;
    const Totemployees = req.body.Totemployees;
   // const salary = req.body.salary;

    //convert request to a number 
    const salary = Number(req.body.salary);
    const phone = Number(req.body.phone);

    const newEmployee = new Employee({
        EmpID,
        name,
        email,
        phone,
        role,
        salary,
        address,
        Totemployees,
    });



    newEmployee.save()
    //if insert success  //js promise
        .then(()=>{
            res.json("Employee Added ");
        })
        //if unsucces
        .catch((err)=>{
            console.log(err);
        })
})

//get employees
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

// update employee
router.route("/update/:EmpID").put(async (req, res) => {
    let EmpID = req.params.EmpID;

    // destructure the request body
    const { name, email,phone, role,salary,address,
        Totemployees, } = req.body;

    const updateEmployee = {
        EmpID,
        name,
        email,
        phone,
        role,
        salary,
        address,
        Totemployees,
    };

    try {
        const updatedEmployee = await Em.findOneAndUpdate({ EmpID }, updatedEmployee, { new: true });

        if (!updatedEmployee) {
            return res.status(404).send({ status: "Employee not found" });
        }

        res.status(200).send({ status: "Employee updated", employee: updatedEmployee });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    }
});


//delete employee
router.route("/delete/:EmpID").delete(async (req,res)=>{
    let EmpID=req.params.EmpID;
    
    await Employee.findOneAndDelete({EmpID:EmpID})
    .then(()=>{
        res.status(200).send({status:"Employee deleted"})
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete employee", error : err.message});
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
router.route("/get/:EmpID").get(async (req, res) => {
    let EmpID = req.params.EmpID;

    try {
        const employee = await Employee.findOne({ EmpID: EmpID });

        if (!employee) {
            return res.status(404).send({ status: "Employee not found" });
        }

        res.status(200).send({ status: "Employee fetched", employee: employee });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting employee", error: err.message });
    }
});



module.exports = router;