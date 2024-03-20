require("dotenv").config();
const Rider = require("../models/Rider");
//const Order = require("../models/Order");
const USER_ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");
const welcomeEmailTemplate = require("../util/email_templates/welcomeEmailTemplate");
const sendEmail = require("../util/sendEmail");

const deliveryRiderController = {

  createRiders: async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if required fields are provided
      if (!name || !email ) {
        return res.status(400).json({
          success: false,
          message: "Name and email are required fields",
        });
      }
  
      // Check if the rider with the provided email already exists
      const existingRider = await Rider.findOne({ email });
      if (existingRider) {
        return res.status(400).json({
          success: false,
          message: "Rider with this email already exists",
        });
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new rider object
      const newRider = new Rider({
        employeeid,
        name,
        email,
        password: hashedPassword,
        role: USER_ROLES.RIDER,
        address,
        contact,
        image, // Assuming you have defined USER_ROLES
        // Add other rider properties here if needed
      });
  
      // Save the new rider to the database
      const savedRider = await newRider.save();
      
      // Send welcome email to the supplier
      const emailTemplate = welcomeEmailTemplate(name, email, password);
      //
      sendEmail(email, "Welcome to Emerald Bay!", emailTemplate);

      res.status(201).json({
        success: true,
        rider: savedRider,
        message: "Rider created successfully",
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
    
          // check if the rider has any order Requests
         /* const stockRequests = await StockRequest.find({ supplier: supplierId });
    
          if (stockRequests.length > 0) {
            return res.status(400).json({
              success: false,
              message:
                "This supplier has stock requests. Please delete the stock requests first",
            });
          }*/
    
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
    
};

module.exports = deliveryRiderController;