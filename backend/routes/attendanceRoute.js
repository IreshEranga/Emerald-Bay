const router = require("express").Router();
const Attendance = require("../models/Attendance");
const sendEmail = require("../util/sendEmail");


// Function to generate Emp ID
const generateAttendanceId = async () => {
    try {
        const attendance = await Attendance.findOne().sort({createdAt: -1});
        if (!attendance) {
            return "T01";
        } else {
            const latestId = parseInt(attendance.EmpID.slice(1)); // Extract numeric part of the ID
            const newId = latestId + 1;
            return "T" + newId.toString().padStart(2, '0'); // Ensure two-digit padding
        }
    } catch (error) {
        console.error("Error generating reservation ID:", error);
        throw new Error("Error generating reservation ID");
    }
};



// Create a attendance
router.post("/create", async (req, res) => {
    try {
      const EmpID = await generateAttendanceId(); // Generate reservation ID
      const newAttendance = new Attendance({ ...req.body, EmpID });
      await newAttendance.save();
      const { name, email, date, time, role } = req.body;

      
      res.json({ status: "Attendance Added", attendance: newAttendance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating table reservation" });
    }
});

// Get all attendance
router.get("/", async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving attendance" });
    }
});

// Get count of all attendance
router.get('/count', async (req, res) => {
    try {
        const count = await Attendance.countDocuments(); // Count the documents in the Table Reservations collection
        res.json({ count });
    } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ error: 'Error fetching count' });
    }
});

// Search attendance by Emp ID or name
router.get("/search", async (req, res) => {
    try {
      const query = req.query.query;
      const attendance = await Attendance.find({
        $or: [{ _id: query }, { name: { $regex: query, $options: "i" } }]
      });
      res.json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error searching table reservations" });
    }
});


module.exports = router;