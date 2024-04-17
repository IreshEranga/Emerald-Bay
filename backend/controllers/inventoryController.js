const Inventory = require("../models/Inventory");
const User = require("../models/User");
const { z } = require("zod");
const lowStockEmailTemplate = require("../util/email_templates/lowStockEmailTemplate");
const sendEmail = require("../util/sendEmail");
//
const addInventorySchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  supplier: z.string(),
  status: z.enum(["In Stock", "Low Stock", "Out of Stock"]),
});
//
const inventoryController = {
  createInventory: async (req, res) => {
    try {
      const { name, description, quantity, supplier, status } = req.body;

      // validate request body
      addInventorySchema.parse(req.body);

      const newInventory = new Inventory({
        name,
        description,
        quantity,
        supplier,
        status,
      });

      const savedInventory = await newInventory.save();

      const supplierUser = await User.findById(supplier);

      if (quantity < 5 || status === "Low Stock") {
        // Send welcome email to the supplier
        const emailTemplate = lowStockEmailTemplate(
          supplierUser.name,
          name,
          quantity
        );
        //
        sendEmail(supplierUser.email, "Low Stock Alert", emailTemplate);
      }

      res.status(201).json({
        success: true,
        inventory: savedInventory,
        message: "Item added to inventory successfully",
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

  getInventories: async (req, res) => {
    try {
      const inventories = await Inventory.find().populate(
        "supplier",
        "-password"
      );

      res.status(200).json({ success: true, inventories });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  getInventoryById: async (req, res) => {
    try {
      const inventoryId = req.params.id;
      const inventory = await Inventory.findById(inventoryId).populate(
        "supplier",
        "-password"
      );

      if (!inventory) {
        return res.status(404).json({
          success: false,
          message: "Inventory not found",
        });
      }

      res.status(200).json({ success: true, inventory });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  updateInventory: async (req, res) => {
    try {
      const inventoryId = req.params.id;
      const inventory = await Inventory.findById(inventoryId).populate(
        "supplier",
        "-password"
      );

      if (!inventory) {
        return res.status(404).json({
          success: false,
          message: "Inventory not found",
        });
      }

      const updatedInventory = await Inventory.findByIdAndUpdate(
        inventoryId,
        req.body,
        {
          new: true,
        }
      );
      
      // if quantity is less than 5 or status is Low Stock
      if (
        updatedInventory.quantity < 5 ||
        updatedInventory.status === "Low Stock"
      ) {
        // Send welcome email to the supplier
        const emailTemplate = lowStockEmailTemplate(
          inventory.supplier.name,
          updatedInventory.name,
          updatedInventory.quantity
        );
        //
        sendEmail(inventory.supplier.email, "Low Stock Alert", emailTemplate);
      }

      res.status(200).json({
        success: true,
        inventory: updatedInventory,
        message: "Inventory item updated successfully",
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

  deleteInventory: async (req, res) => {
    try {
      const inventoryId = req.params.id;

      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({
          success: false,
          message: "Inventory not found",
        });
      }

      const deletedInventory = await Inventory.findByIdAndDelete(inventoryId);

      res.status(200).json({
        success: true,
        inventory: deletedInventory,
        message: "Inventory deleted successfully",
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

  getInventoryCount: async (req, res) => {
    try {
      const inventoryCount = await Inventory.find().countDocuments();

      res.status(200).json({ success: true, inventoryCount });
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

module.exports = inventoryController;
