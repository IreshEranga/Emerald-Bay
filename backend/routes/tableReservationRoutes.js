const router = require("express").Router();
const TableReservation = require("../models/TableReservation");


// Check table availability
router.post("/checkAvailability", async (req, res) => {
    try {
        const { tableNo, date, time } = req.body;
        const existingReservation = await TableReservation.findOne({ tableNo, date, time });
        if (existingReservation) {
            res.json({ available: false });
        } else {
            res.json({ available: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error checking table availability" });
    }
});

// Create a table reservation
router.post("/create", async (req, res) => {
    try {
        const newTableReservation = new TableReservation(req.body);
        await newTableReservation.save();
        res.json({ status: "Table Reservation Added", tableReservation: newTableReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating table reservation" });
    }
});

// Get all table reservations
router.get("/", async (req, res) => {
    try {
        const tableReservations = await TableReservation.find();
        res.json(tableReservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving table reservations" });
    }
});

// Update a table reservation
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTableReservation = await TableReservation.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ status: "Table Reservation updated", tableReservation: updatedTableReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating table reservation" });
    }
});

// Delete a table reservation
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await TableReservation.findByIdAndDelete(id);
        res.json({ status: "Table Reservation deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting table reservation" });
    }
});

// Get a table reservation by ID
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const tableReservation = await TableReservation.findById(id);
        if (!tableReservation) {
            return res.status(404).json({ error: "Table reservation not found" });
        }
        res.json(tableReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving table reservation" });
    }
});

module.exports = router;