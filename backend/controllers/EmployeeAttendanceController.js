const EmployeeAttendance = require("../models/EmployeeAttendance");

const EmployeeAttendanceController = {
  createAttendance: async (req, res) => {
    try {
      const { EmpID, name, email, date, role } = req.body;

      const newAttendance = new EmployeeAttendance({
        EmpID,
        name,
        email,
        date,
        role
      });

      const savedAttendance = await newAttendance.save();

      res.status(201).json({
        success: true,
        EmployeeAttendance: savedAttendance,
        message: "EmployeeAttendance created successfully",
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

  getAttendance: async (req, res) => {
    try {
      const Attendance = await EmployeeAttendance.find().populate("EmpID");

      res.status(200).json({ success: true, Attendance });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  getAttendanceById: async (req, res) => {
    try {
      const AttendanceId = req.params.id;
      const attendance = await EmployeeAttendance.findById(AttendanceId);

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: "EmployeeAttendance not found",
        });
      }

      res.status(200).json({ success: true, attendance });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateAttendance: async (req, res) => {
    try {
      const AttendanceId = req.params.id;
      const attendance = await EmployeeAttendance.findById(AttendanceId);

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: "EmployeeAttendance not found",
        });
      }

      const updatedAttendance = await EmployeeAttendance.findByIdAndUpdate(
        AttendanceId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        Attendance: updatedAttendance,
        message: "Attendance updated successfully",
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

  deleteAttendance: async (req, res) => {
    try {
      const AttendanceId = req.params.id;

      const attendance = await EmployeeAttendance.findById(AttendanceId);

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: "EmployeeAttendance not found",
        });
      }

      const deletedAttendance = await EmployeeAttendance.findByIdAndDelete(
        AttendanceId
      );

      res.status(200).json({
        success: true,
        EmployeeAttendance: deletedAttendance,
        message: "EmployeeAttendance deleted successfully",
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

  getAttendanceCount: async (req, res) => {
    try {
      const AttendanceCount = await EmployeeAttendance.countDocuments();

      res.status(200).json({ success: true, AttendanceCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  AttendanceForEmployees: async (req, res) => {
    try {
      const { EmpID } = req.query;
      const employeeAttendance = await EmployeeAttendance.find({ EmpID });

      res.status(200).json({ success: true, employeeAttendance });
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

module.exports = EmployeeAttendanceController;
