const router = require("express").Router();
const Event = require("../models/Event");


// Create a event
router.post("/create", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.json({ status: "Event Added", event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating an event" });
    }
});

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving events" });
    }
});

// Update an event
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ status: "Event updated", event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating Event" });
    }
});

// Delete an Event
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndDelete(id);
        res.json({ status: "Event deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting Event" });
    }
});

// Get an event by ID
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving Event" });
    }
});

module.exports = router;