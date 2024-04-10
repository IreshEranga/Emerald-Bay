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
const employeeRoutes = require("./routes/employeeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const tableReservationRoutes = require("./routes/tableReservationRoutes");
const vipRoomReservationRoutes = require("./routes/vipRoomReservationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const itemRoutes = require("./routes/itemRoutes");
const studentRoutes = require("./routes/studentRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// Parse JSON requests
app.use(bodyParser.json()); 

// cors
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stock-requests", stockRequestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/riders",riderRoutes);



 app.use("/employee",employeeRoutes);
 app.use("/api/orders",orderRoutes);
 app.use("/tableReservation",tableReservationRoutes);
app.use("/vipRoomReservation",vipRoomReservationRoutes);
app.use("/event",eventRoutes);
app.use("/item",itemRoutes);
app.use("/student",studentRoutes);

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