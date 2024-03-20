require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const stockRequestRoutes = require("./routes/stockRequestRoutes");
const riderRoutes = require("./routes/riderRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stock-requests", stockRequestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/riders",riderRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to monodb database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
