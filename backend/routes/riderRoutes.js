


const express = require("express");
const deliveryRiderController = require("../controllers/deliveryRiderController");
const authMiddleware = require("../middleware/authMiddleware");
const Rider = require("../models/Rider");
const USER_ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");

const router = express.Router();
const sendEmail = require("../util/sendEmail");
const riderAssignEmailTemplate = require("../util/email_templates/riderAssignEmailTemplate");

//router.post("/add", authMiddleware(["ADMIN"]), deliveryRiderController.createRiders);
router.get("/", authMiddleware(["DELIVERYMANAGER"]), deliveryRiderController.getRiders);

router.get("/:id", authMiddleware(["DELIVERYMANAGER", "RIDER"]), deliveryRiderController.getRiderById);
router.patch(
  "/:id",
  authMiddleware(["DELIVERYMANAGER", "RIDER"]),
  deliveryRiderController.updateRider
);
router.delete(
  "/:id",
  authMiddleware(["DELIVERYMANAGER"]),
  deliveryRiderController.deleteRider
);
router.get(
  "/get/count",
  authMiddleware(["DELIVERYMANAGER"]),
  deliveryRiderController.getRiderCount
);

router.route("/get/available").get(async (req, res) => {
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
});

router.patch("/update/:id", async (req, res) => {
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
    if (req.body.status === "On Ride" && rider.status !== "On Ride") {
      try {
        await sendEmail(
          rider.email,
          `New Delivery Request`,`<p>Hi , ${rider.name} ,</p><p>Your are assigned to a new order. </p> <p>Please log in to the system and start your journey!</p><p>  Best Wishes from </p><p>Emerald Bay Restaurant</p>`,
          "Hello, your status has been updated to On Ride."
        );
        console.log(`Email sent to: ${rider.email}`);
        // Increment delivery count
      rider.rides = (rider.rides) + 1;
      await rider.save();
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Handle email sending error
      }
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

    // Check if the status is being updated to "On Ride"
    if (req.body.status === "On Ride" && rider.status !== "On Ride") {
      // Additional logic for sending email
      try {
        await sendEmail({
          to: rider.email, // Assuming you have the email property in your Rider model
          subject: "Your status has been updated to On Ride",
          text: "Hello, your status has been updated to On Ride.",
        });
        console.error(`Email send to email: ${rider.email}`);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Handle email sending error
      }
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
});
module.exports = router;
