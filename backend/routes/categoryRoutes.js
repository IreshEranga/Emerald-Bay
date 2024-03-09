const express = require("express");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware(["ADMIN"]), categoryController.createCategory);
router.get("/", authMiddleware(["ADMIN", "SUPPLIER"]), categoryController.getCategories);
router.get("/:id", authMiddleware(["ADMIN"]), categoryController.getCategoryById);
router.patch("/:id", authMiddleware(["ADMIN"]), categoryController.updateCategory);
router.delete("/:id", authMiddleware(["ADMIN"]), categoryController.deleteCategory);
router.get("/get/count", authMiddleware(["ADMIN"]), categoryController.getCategoryCount);

module.exports = router;
