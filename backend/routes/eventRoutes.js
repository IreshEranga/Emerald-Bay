const router = require("express").Router();
const Event = require("../models/Event");
const sendEmail = require("../util/sendEmail");
const eventReservationsEmailTemplate = require("../util/email_templates/eventReservationsEmailTemplate");
const cron = require('node-cron');


// Function to generate reservation ID
const generateReservationId = async () => {
    try {
        const latestReservation = await Event.findOne().sort({createdAt: -1});
        if (!latestReservation) {
            return "E01";
        } else {
            const latestId = latestReservation.reservationId ? parseInt(latestReservation.reservationId.slice(1)) : 0;
            const newId = latestId + 1;
            return "E" + newId.toString().padStart(2, '0'); // Ensure two-digit padding
        }
    } catch (error) {
        console.error("Error generating Event reservation ID:", error);
        throw new Error("Error generating Event reservation ID");
    }
};

router.post("/create", async (req, res) => {
    try {
      const reservationId = await generateReservationId(); // Generate reservation ID
      const newEvent = new Event({ ...req.body, reservationId });
      await newEvent.save();
  
      // Send confirmation email to the customer
      const { name, email, date, startTime, endTime, guests } = req.body;
      const emailTemplate = eventReservationsEmailTemplate(name, reservationId, date, startTime, endTime, guests);
      sendEmail(email, "Event Reservation Confirmation", emailTemplate);
  
      res.json({ status: "Event Added", event: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating Event" });
    }
});

// Check event availability
router.post("/checkAvailability", async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;
        const existingReservation = await Event.findOne({
            date,
            $or: [
                {
                    $and: [
                        { startTime: { $lte: endTime } }, // Event starts before or at the same time as the requested end time
                        { endTime: { $gte: startTime } } // Event ends after or at the same time as the requested start time
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: startTime } }, // Event starts after or at the same time as the requested start time
                        { endTime: { $lte: endTime } } // Event ends before or at the same time as the requested end time
                    ]
                }
            ]
        });

        if (existingReservation) {
            res.json({ available: false });
        } else {
            res.json({ available: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error checking event availability" });
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

// Search events by reservation ID or name
router.get("/search", async (req, res) => {
    try {
      const query = req.query.query;
      const reservations = await Event.find({
        $or: [{ _id: query }, { name: { $regex: query, $options: "i" } }]
      });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error searching events" });
    }
});

// Route to get count of Events
router.get('/count', async (req, res) => {
    try {
      const count = await Event.countDocuments(); // Count the documents in the event collection
      res.json({ count });
    } catch (error) {
      console.error('Error fetching count:', error);
      res.status(500).json({ error: 'Error fetching count' });
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

// Schedule cron job to delete reservations older than 4 months
cron.schedule('* * * * *', async () => {
    try {
        const currentDate = new Date();
        const fourMonthsAgo = new Date();
        fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
        await Event.deleteMany({ date: { $lt: fourMonthsAgo } });
        console.log('Reservations older than 4 months deleted successfully.');
    } catch (error) {
        console.error('Error deleting old reservations:', error);
    }
});

module.exports = router;