const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.post(
  "/",
  authMiddleware([USER_ROLES.INVENTORYMANAGER]),
  inventoryController.createInventory
);
router.get(
  "/",
  authMiddleware([USER_ROLES.INVENTORYMANAGER]),
  inventoryController.getInventories
);
router.get(
  "/get/count",
  authMiddleware([USER_ROLES.INVENTORYMANAGER]),
  inventoryController.getInventoryCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.INVENTORYMANAGER]),
  inventoryController.getInventoryById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.INVENTORYMANAGER]),
  inventoryController.updateInventory
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.INVENTORYMANAGER]),
  inventoryController.deleteInventory
);

module.exports = router;
