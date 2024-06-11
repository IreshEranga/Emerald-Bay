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
const EmployeeLeaveRoutes = require("./routes/EmployeeLeaveRoutes");
const riderRoutes = require("./routes/riderRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const tableReservationRoutes = require("./routes/tableReservationRoutes");
const vipRoomReservationRoutes = require("./routes/vipRoomReservationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const itemRoutes = require("./routes/itemRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const LoyaltyCustomersRoutes = require("./routes/LoyaltyCustomersRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const faqRoutes = require("./routes/faqRoutes");
const attendanceRoutes = require("./routes/attendanceRoute");

// express app
const app = express();


const port = process.env.PORT || 4000;
// middleware
app.use(express.json());

// Parse JSON requests
app.use(bodyParser.json()); 

// cors
app.use(cors());

// Routes
app.use("/api/faqs", faqRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stock-requests", stockRequestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/riders",riderRoutes);
app.use("/api/leaves",EmployeeLeaveRoutes);




app.use("/api/employees",employeeRoutes);
app.use("/api/orders",orderRoutes);
app.use("/tableReservation",tableReservationRoutes);
app.use("/vipRoomReservation",vipRoomReservationRoutes);
app.use("/event",eventRoutes);
app.use("/item",itemRoutes);
app.use("/customer",customerRoutes);
app.use("/loyaltycustomers",LoyaltyCustomersRoutes);
app.use("/cart", cartRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/attendance", attendanceRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb database");
    // listen to port
    // app.listen(process.env.PORT, () => {
    //   console.log("listening for requests on port", process.env.PORT);
    // });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  });