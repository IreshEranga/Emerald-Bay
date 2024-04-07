const router = require("express").Router();
const VIPRoomReservation = require("../models/VIPRoomReservation");


// Check vip room availability
router.post("/checkAvailability", async (req, res) => {
    try {
        const { date, time } = req.body;
        const existingReservation = await VIPRoomReservation.findOne({ date, time });
        if (existingReservation) {
            res.json({ available: false });
        } else {
            res.json({ available: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error checking vip room availability" });
    }
});

// Create a vip room reservation
router.post("/create", async (req, res) => {
    try {
        const newVIPRoomReservation = new VIPRoomReservation(req.body);
        await newVIPRoomReservation.save();
        res.json({ status: "VIP Room Reservation Added", vipRoomReservation: newVIPRoomReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating vip room reservation" });
    }
});

// Get all vip room reservations
router.get("/", async (req, res) => {
    try {
        const vipRoomReservations = await VIPRoomReservation.find();
        res.json(vipRoomReservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving vip room reservations" });
    }
});

// Search table reservations by reservation ID or name
router.get("/search", async (req, res) => {
    try {
      const query = req.query.query;
      const reservations = await TableReservation.find({
        $or: [{ _id: query }, { name: { $regex: query, $options: "i" } }]
      });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error searching table reservations" });
    }
});

// Route to get count of VIP room reservations
router.get('/count', async (req, res) => {
    try {
      const count = await VIPRoomReservation.countDocuments(); // Count the documents in the VIPRoomReservation collection
      res.json({ count });
    } catch (error) {
      console.error('Error fetching count:', error);
      res.status(500).json({ error: 'Error fetching count' });
    }
});

// Search vip room reservations by reservation ID or name
router.get("/search", async (req, res) => {
    try {
      const query = req.query.query;
      const reservations = await VIPRoomReservation.find({
        $or: [{ _id: query }, { name: { $regex: query, $options: "i" } }]
      });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error searching vip room reservations" });
    }
});

// Update a vip room reservation
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedVIPRoomReservation = await VIPRoomReservation.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ status: "VIP Room Reservation updated", vipRoomReservation: updatedVIPRoomReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating vip room reservation" });
    }
});

// Delete a vip room reservation
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await VIPRoomReservation.findByIdAndDelete(id);
        res.json({ status: "VIP Room Reservation deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting vip room reservation" });
    }
});


module.exports = router;