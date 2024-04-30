require("dotenv").config();
const Rider = require("../models/Rider");
const User = require("../models/User");
//const Order = require("../models/Order");
const USER_ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");


const deliveryRiderController = {

    //get riders
  getRiders: async(req,res) => {
        try {
            const riders = await Rider.find({role:USER_ROLES.RIDER})
                .select("-password")
               // .populate("Order");

            res.status(200).json({ success: true, riders });
        } catch (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              error,
              message: "Internal server error",
            });
        }
    },
    
    //get rider by id
    getRiderById: async (req, res) => {
        try {
          const riderId = req.params.id;
    
          const rider = await Rider.findOne({
            _id: riderId,
            role: USER_ROLES.RIDER,
          }).select("-password");
    
          if (!rider) {
            return res.status(404).json({
              success: false,
              message: "Rider not found",
            });
          }
    
          res.status(200).json({ success: true, rider });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error,
            message: "Internal server error",
          });
        }
    },

    //update rider
    updateRider: async (req, res) => {
        try {
          const riderId = req.params.id;
          const rider = await Rider.findOne({
            _id: riderId,
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
    },

    //deleteRider
    deleteRider: async (req, res) => {
        try {
          const riderId = req.params.id;
    
          const rider = await Rider.findOne({
            _id: riderId,
            role: USER_ROLES.RIDER,
          });
    
          if (!rider) {
            return res.status(404).json({
              success: false,
              message: "Rider not found",
            });
          }
    
          const deletedRider = await Rider.findOneAndDelete({
            _id: riderId,
            role: USER_ROLES.RIDER,
          });
    
          res.status(200).json({
            success: true,
            supplier: deletedRider,
            message: "Rider deleted successfully",
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

    //get rider count
    getRiderCount: async (req, res) => {
        try {
          const riderCount = await Rider.find({
            role: USER_ROLES.RIDER,
          }).countDocuments();
    
          res.status(200).json({ success: true, riderCount });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error,
            message: "Internal server error",
          });
        }
      },


      getAvailableRiders: async (req, res) => {
        try {
          const availableRiders = await Rider.find({ status: "Available" }).select("-password");
          res.status(200).json({ success: true, availableRiders });
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

module.exports = deliveryRiderController;