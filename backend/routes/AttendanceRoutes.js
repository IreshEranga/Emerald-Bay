const express = require("express");
const EmployeeAttendanceController = require("../controllers/EmployeeAttendanceController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

// Get all attendance records (accessible only by ADMIN)
router.get("/", authMiddleware([USER_ROLES.ADMIN]), EmployeeAttendanceController.getAttendance);

// Get attendance by ID (accessible by ADMIN and EMPLOYEE)
router.get("/:id", authMiddleware([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]), EmployeeAttendanceController.getAttendanceById);

// Update attendance by ID (accessible by ADMIN and EMPLOYEE)
router.patch("/:id", authMiddleware([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]), EmployeeAttendanceController.updateAttendance);

// Delete attendance by ID (accessible only by ADMIN)
router.delete("/:id", authMiddleware([USER_ROLES.ADMIN]), EmployeeAttendanceController.deleteAttendance);

// Get attendance count (accessible only by ADMIN)
router.get("/count", authMiddleware([USER_ROLES.ADMIN]), EmployeeAttendanceController.getAttendanceCount);

module.exports = router;
