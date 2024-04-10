require("dotenv").config();
const User = require("../models/User");
const Employee = require("../models/Employee");
const Rider = require("../models/Rider");
const USER_ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");

const employeeController = {
  getEmployees: async (req, res) => {
    try {
      const employees = await Employee.find({ role: USER_ROLES.EMPLOYEE })
        .select("-password")
        

      res.status(200).json({ success: true, employees });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const employeeId = req.params.id;

      const employee = await Employee.findOne({
        _id: employeeId,
        role: USER_ROLES.EMPLOYEE,
      }).select("-password");

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employer not found",
        });
      }

      res.status(200).json({ success: true, employee });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const employeeId = req.params.id;
      const employee = await Employee.findOne({
        _id: employeeId,
        role: USER_ROLES.EMPLOYEE,
      });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employer not found",
        });
      }

      // if password is being updated, hash the new password
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: employeeId, role: USER_ROLES.EMPLOYEE },
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        employee: updatedEmployee,
        message: "Employee updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const employeeId = req.params.id;

      const employee = await Employee.findOne({
        _id: employeeId,
        role: USER_ROLES.EMPLOYEE,
      });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      const deletedEmployee = await Employee.findOneAndDelete({
        _id: employeeId,
        role: USER_ROLES.EMPLOYEE,
      });

      res.status(200).json({
        success: true,
        employee: deletedEmployee,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  getEmployeeCount: async (req, res) => {
    try {
      const employeeCount = await Employee.find({
        role: USER_ROLES.EMPLOYEE,
      }).countDocuments();

      res.status(200).json({ success: true, employeeCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  
};

module.exports = employeeController;
