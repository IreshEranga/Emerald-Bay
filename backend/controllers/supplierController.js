require("dotenv").config();
const User = require("../models/User");
const StockRequest = require("../models/StockRequest");
const USER_ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");

const supplierController = {
  getSuppliers: async (req, res) => {
    try {
      const suppliers = await User.find({ role: USER_ROLES.SUPPLIER })
        .select("-password")
        .populate("category", "name");

      res.status(200).json({ success: true, suppliers });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  getSupplierById: async (req, res) => {
    try {
      const supplierId = req.params.id;

      const supplier = await User.findOne({
        _id: supplierId,
        role: USER_ROLES.SUPPLIER,
      }).select("-password");

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      res.status(200).json({ success: true, supplier });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateSupplier: async (req, res) => {
    try {
      const supplierId = req.params.id;
      const supplier = await User.findOne({
        _id: supplierId,
        role: USER_ROLES.SUPPLIER,
      });

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      // if password is being updated, hash the new password
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedSupplier = await User.findOneAndUpdate(
        { _id: supplierId, role: USER_ROLES.SUPPLIER },
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        supplier: updatedSupplier,
        message: "Supplier updated successfully",
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

  deleteSupplier: async (req, res) => {
    try {
      const supplierId = req.params.id;

      const supplier = await User.findOne({
        _id: supplierId,
        role: USER_ROLES.SUPPLIER,
      });

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      // check if the supplier has any Stock Requests
      const stockRequests = await StockRequest.find({ supplier: supplierId });

      if (stockRequests.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "This supplier has stock requests. Please delete the stock requests first",
        });
      }

      const deletedSupplier = await User.findOneAndDelete({
        _id: supplierId,
        role: USER_ROLES.SUPPLIER,
      });

      res.status(200).json({
        success: true,
        supplier: deletedSupplier,
        message: "Supplier deleted successfully",
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

  getSupplierCount: async (req, res) => {
    try {
      const supplierCount = await User.find({
        role: USER_ROLES.SUPPLIER,
      }).countDocuments();

      res.status(200).json({ success: true, supplierCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateSupplierStock: async (req, res) => {
    try {
      const supplierId = req.userId;

      const supplier = await User.findOne({
        _id: supplierId,
        role: USER_ROLES.SUPPLIER,
      });

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      const { stock } = req.body;

      // update the available stock of the supplier
      await User.findOneAndUpdate(
        { _id: supplierId, role: USER_ROLES.SUPPLIER },
        { available_stock: stock }
      );

      res.status(200).json({
        success: true,
        message: "Supplier stock updated successfully",
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

  getAvailableStock: async (req, res) => {
    try {
      const supplierId = req.userId;

      const supplier = await User.findOne({
        _id: supplierId,
        role: USER_ROLES.SUPPLIER,
      });

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      res
        .status(200)
        .json({ success: true, availableStock: supplier.available_stock });
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

module.exports = supplierController;
