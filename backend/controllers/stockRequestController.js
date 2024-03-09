const StockRequest = require("../models/StockRequest");

const stockRequestController = {
  createStockRequest: async (req, res) => {
    try {
      const { supplier, quantity } = req.body;

      const newStockRequest = new StockRequest({
        supplier,
        quantity,
      });

      const savedStockRequest = await newStockRequest.save();

      res.status(201).json({
        success: true,
        stockRequest: savedStockRequest,
        message: "StockRequest created successfully",
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

  getStockRequests: async (req, res) => {
    try {
      const stockRequests = await StockRequest.find().populate("supplier");

      res.status(200).json({ success: true, stockRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  getStockRequestById: async (req, res) => {
    try {
      const stockRequestId = req.params.id;
      const stockRequest = await StockRequest.findById(stockRequestId);

      if (!stockRequest) {
        return res.status(404).json({
          success: false,
          message: "StockRequest not found",
        });
      }

      res.status(200).json({ success: true, stockRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateStockRequest: async (req, res) => {
    try {
      const stockRequestId = req.params.id;
      const stockRequest = await StockRequest.findById(stockRequestId);

      if (!stockRequest) {
        return res.status(404).json({
          success: false,
          message: "StockRequest not found",
        });
      }

      const updatedStockRequest = await StockRequest.findByIdAndUpdate(
        stockRequestId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        stockRequest: updatedStockRequest,
        message: "StockRequest updated successfully",
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

  deleteStockRequest: async (req, res) => {
    try {
      const stockRequestId = req.params.id;

      const stockRequest = await StockRequest.findById(stockRequestId);

      if (!stockRequest) {
        return res.status(404).json({
          success: false,
          message: "StockRequest not found",
        });
      }

      const deletedStockRequest = await StockRequest.findByIdAndDelete(
        stockRequestId
      );

      res.status(200).json({
        success: true,
        stockRequest: deletedStockRequest,
        message: "StockRequest deleted successfully",
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

  getStockRequestCount: async (req, res) => {
    try {
      const stockRequestCount = await StockRequest.find().countDocuments();

      res.status(200).json({ success: true, stockRequestCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  stockRequestForSupplier: async (req, res) => {
    try {
      const supplier = req.userId;
      const stockRequests = await StockRequest.find({ supplier });

      res.status(200).json({ success: true, stockRequests });
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

module.exports = stockRequestController;
