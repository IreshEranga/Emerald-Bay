const express = require("express");
const router = express.Router();
const EmployeeLeaveController = require("../controllers/EmployeeLeaveController");
const EmployeeLeave = require("../models/EmployeeLeave");
//const authMiddleware = require("../middleware/authMiddleware");

// Route to create employee leave
//chnage the routes
router.post("/", EmployeeLeaveController.createLeaveRequest);


// Route to get all employee leave
router.get("/",EmployeeLeaveController.getLeaveRequest);



// Route to get employee leave by ID
router.get("/:id", EmployeeLeaveController.getLeaveRequestById);



// Route to update employee leave by ID
router.patch("/:id", EmployeeLeaveController.updateLeaveRequest);



// Route to delete employee leave by ID
router.delete("/:id", EmployeeLeaveController.deleteleaveRequest);

// Get all leaves for employee
router.get("/", async (req, res) => {
    try {
        const EmployeeLeaves = await EmployeeLeave.find();
        res.json(EmployeeLeaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving leaves" });
    }
});

module.exports = router;