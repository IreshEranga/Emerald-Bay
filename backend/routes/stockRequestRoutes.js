const express = require("express");
const stockRequestController = require("../controllers/stockRequestController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware(["ADMIN"]),
  stockRequestController.createStockRequest
);
router.get(
  "/",
  authMiddleware(["ADMIN"]),
  stockRequestController.getStockRequests
);
router.get(
  "/:id",
  authMiddleware(["ADMIN"]),
  stockRequestController.getStockRequestById
);
router.patch(
  "/:id",
  authMiddleware(["ADMIN", "SUPPLIER"]),
  stockRequestController.updateStockRequest
);
router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  stockRequestController.deleteStockRequest
);
router.get(
  "/get/count",
  authMiddleware(["ADMIN"]),
  stockRequestController.getStockRequestCount
);
router.get(
  "/get/stockRequestForSupplier",
  authMiddleware(["SUPPLIER"]),
  stockRequestController.stockRequestForSupplier
);

module.exports = router;
