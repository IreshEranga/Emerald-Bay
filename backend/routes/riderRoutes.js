/*const router = require("express").Router();
const Rider = require("../models/Rider");

// Route to add a new rider
router.route("/add").post((req, res) => {
    const { employeeid, name, email, password,image, role, address, contact, rides } = req.body;

    const newRider = new Rider({
        employeeid,
        name,
        email,
        password,
        image,
        role,
        address,
        contact: Number(contact), // Convert contact to a number
        rides: Number(rides), // Convert rides to a number
    });

    newRider.save()
        .then(() => {
            res.json("Rider Added");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to add rider" });
        });
});

router.route("/count").get((req, res) => {
    Rider.countDocuments({}, (err, count) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to get rider count" });
        } else {
            res.json({ count });
        }
    });
});

module.exports = router;
*/


const express = require("express");
const deliveryRiderController = require("../controllers/deliveryRiderController");
const authMiddleware = require("../middleware/authMiddleware");
const Rider = require("../models/Rider");

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

module.exports = router;
