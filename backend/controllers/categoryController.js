const Category = require("../models/Category");
const User = require("../models/User");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;

      const newCategory = new Category({
        name,
        description,
      });

      const savedCategory = await newCategory.save();

      res.status(201).json({
        success: true,
        category: savedCategory,
        message: "Category created successfully",
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

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();

      res.status(200).json({ success: true, categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      res.status(200).json({ success: true, category });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        category: updatedCategory,
        message: "Category updated successfully",
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

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;

      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      // check if there are suppliers associated with this category
      const suppliers = await User.find({ category: categoryId });

      if (suppliers.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete category because it is associated with suppliers",
        });
      }

      const deletedCategory = await Category.findByIdAndDelete(categoryId);

      res.status(200).json({
        success: true,
        category: deletedCategory,
        message: "Category deleted successfully",
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

  getCategoryCount: async (req, res) => {
    try {
      const categoryCount = await Category.find().countDocuments();

      res.status(200).json({ success: true, categoryCount });
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

module.exports = categoryController;