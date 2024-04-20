const EmployeeLeave = require("../models/EmployeeLeave");
const {get} = require("mongoose");
const EmployeeLeaveController = {
  createLeaveRequest:  (req, res) => {
    try {
      const { EmpID, name, role, leaveType, leaveFrom, leaveTo } = req.body;

      const newLeaveRequest= new EmployeeLeave({
        EmpID,
        name,
        role,
        leaveType,
        leaveFrom,
        leaveTo,
      });

      const savedLeaveRequest =  newLeaveRequest.save();

      res.status(201).json({
        success: true,
        leaveRequest: savedLeaveRequest,
        message: "LeaveRequest created successfully",
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


  getLeaveRequest: async(req,res) => {
    try {
        const leaveRequests = await EmployeeLeave.find();
            //.select("-password")
           // .populate("Order");

        res.status(200).json({ success: true, leaveRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error,
          message: "Internal server error",
        });
    }
},

  /*getLeaveRequest: async (req, res) => {
    try {
      const leaveRequests = await EmployeeLeave.find().populate("EmpID");
  
      res.status(200).json({ success: true, leaveRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },*/
  

  getLeaveRequestById: async (req, res) => {
    try {
      const leaveRequestId = req.params.id;
      const leave = await EmployeeLeave.findById(leaveRequestId);

      if (!leave) {
        return res.status(404).json({
          success: false,
          message: "leaveRequest not found",
        });
      }

      res.status(200).json({ success: true, leave });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateLeaveRequest: async (req, res) => {
    try {
      const leaveRequestId = req.params.id;
      const leaveRequest = await leaveRequest.findById(leaveRequestId);

      if (!leaveRequest) {
        return res.status(404).json({
          success: false,
          message: "LeaveRequest not found",
        });
      }

      const updatedleaveRequest = await leaveRequest.findByIdAndUpdate(
        leaveRequestId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        leaveRequest: updatedleaveRequest,
        message: "leaveRequest updated successfully",
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

  deleteleaveRequest: async (req, res) => {
    try {
      const leaveRequestId = req.params.id;

      const leaveRequest = await leaveRequest.findById(leaveRequestId);

      if (!leaveRequest) {
        return res.status(404).json({
          success: false,
          message: "leaveRequest not found",
        });
      }

      const deletedLeaveRequest = await leaveRequest.findByIdAndDelete(
        leaveRequestId
      );

      res.status(200).json({
        success: true,
        leaveRequest: deletedLeaveRequest,
        message: "leaveRequest deleted successfully",
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

//   getLeaveRequestCount: async (req, res) => {
//     try {
//       const stockRequestCount = await StockRequest.find().countDocuments();

//       res.status(200).json({ success: true, stockRequestCount });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         error,
//         message: "Internal server error",
//       });
//     }
//   },

  leaveRequestForEmployee: async (req, res) => {
    try {
      const EmpID = req.EmpID;
      const leaveRequest = await leaveRequest.find({ EmpID });

      res.status(200).json({ success: true, leaveRequest });
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

module.exports = EmployeeLeaveController;