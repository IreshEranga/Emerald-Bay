


const express = require("express");
const deliveryRiderController = require("../controllers/deliveryRiderController");
const authMiddleware = require("../middleware/authMiddleware");
const Rider = require("../models/Rider");
const USER_ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");

const router = express.Router();

//router.post("/add", authMiddleware(["ADMIN"]), deliveryRiderController.createRiders);
router.get("/", authMiddleware(["ADMIN"]), deliveryRiderController.getRiders);
/*router.patch(
  "/stock",
  authMiddleware(["SUPPLIER"]),
  supplierController.updateSupplierStock
);
router.get(
  "/stock",
  authMiddleware(["SUPPLIER"]),
  supplierController.getAvailableStock
);*/
router.get("/:id", authMiddleware(["ADMIN", "RIDER"]), deliveryRiderController.getRiderById);
router.patch(
  "/:id",
  authMiddleware(["ADMIN", "RIDER"]),
  deliveryRiderController.updateRider
);
router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  deliveryRiderController.deleteRider
);
router.get(
  "/get/count",
  authMiddleware(["ADMIN"]),
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

module.exports = router;
