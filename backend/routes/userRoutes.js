const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware(["ADMIN","DELIVERYMANAGER"]), userController.getAllUsers);
router.post("/loginCustomerAffairsManager", userController.loginCustomerAffairsManager);

module.exports = router;
