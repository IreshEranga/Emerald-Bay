const express = require("express");
const supplierController = require("../controllers/supplierController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.get("/", authMiddleware(["ADMIN", USER_ROLES.INVENTORYMANAGER]), supplierController.getSuppliers);
router.patch(
  "/stock",
  authMiddleware(["SUPPLIER"]),
  supplierController.updateSupplierStock
);
router.get(
  "/stock",
  authMiddleware(["SUPPLIER"]),
  supplierController.getAvailableStock
);
router.get("/:id", authMiddleware(["ADMIN", "SUPPLIER"]), supplierController.getSupplierById);
router.patch(
  "/:id",
  authMiddleware(["ADMIN", "SUPPLIER"]),
  supplierController.updateSupplier
);
router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  supplierController.deleteSupplier
);
router.get(
  "/get/count",
  authMiddleware(["ADMIN"]),
  supplierController.getSupplierCount
);

module.exports = router;
