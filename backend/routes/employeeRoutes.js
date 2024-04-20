


const express = require("express");
const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const Employee = require("../models/Employee");
const USER_ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");

const router = express.Router();

//router.post("/add", authMiddleware(["ADMIN"]), deliveryRiderController.createRiders);
router.get("/", authMiddleware(["ADMIN"]), employeeController.getEmployees);

router.get("/:id", authMiddleware(["ADMIN", "EMPLOYEE"]), employeeController.getEmployeeById);
router.patch(
  "/:id",
  authMiddleware(["ADMIN", "EMPLOYEE"]),
  employeeController.updateEmployee
);
router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  employeeController.deleteEmployee
);
router.get(
  "/get/count",
  authMiddleware(["ADMIN"]),
  employeeController.getEmployeeCount
);


/*
router.patch("/update/:id", async (req, res) => {     //for employee getS
  try {
    const riderId = req.params.id;
    const rider = await Rider.findOne({
      _id: riderId,
      role: USER_ROLES.RIDER,
    });*/

    router.get("/", async (req, res) => {
    try {
        const employees = await employees.find();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving employees" });
    }
});
 
/*
    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    // if password is being updated, hash the new password
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updateRider = await Rider.findOneAndUpdate(
      { _id: riderId, role: USER_ROLES.RIDER },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      rider: updateRider,
      message: "Rider updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Internal server error",
    });
  }
});



router.patch("/update/rider/:employeeid", async (req, res) => {
  try {
    const riderId = req.params.employeeid;
    const rider = await Rider.findOne({
      employeeid: riderId,
      role: USER_ROLES.RIDER,
    });

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    // if password is being updated, hash the new password
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updateRider = await Rider.findOneAndUpdate(
      { employeeid: riderId, role: USER_ROLES.RIDER },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      rider: updateRider,
      message: "Rider updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Internal server error",
    });
  }
});*/
module.exports = router;
