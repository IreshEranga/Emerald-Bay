require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const USER_ROLES = require("../constants/roles");
const welcomeEmailTemplate = require("../util/email_templates/welcomeEmailTemplate");
const sendEmail = require("../util/sendEmail");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          // expiresIn: "1h",
        }
      );

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
        message: "Logged in successfully",
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

  supplierSignup: async (req, res) => {
    try {
      const { image, name, address, contact, email, category } = req.body;
      const role = USER_ROLES.SUPPLIER;

      const existingSupplier = await User.findOne({ email });
      if (existingSupplier) {
        return res.status(409).json({
          success: false,
          message: "Supplier already exists",
        });
      }

      // auto-generate password with 8 characters
      const password = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newSupplier = new User({
        image,
        name,
        address,
        contact,
        email,
        password: hashedPassword,
        role,
        category,
      });
      await newSupplier.save();

      // Send welcome email to the supplier
      const emailTemplate = welcomeEmailTemplate(name, email, password);
      //
      sendEmail(email, "Welcome to Emerald Bay!", emailTemplate);

      res.status(201).json({
        success: true,
        user: {
          _id: newSupplier._id,
          name: newSupplier.name,
          email: newSupplier.email,
          role: newSupplier.role,
        },
        message: "Supplier created successfully",
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
};

module.exports = authController;
