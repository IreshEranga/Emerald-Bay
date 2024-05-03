const router = require("express").Router();
const VIPRoomReservation = require("../models/VIPRoomReservation");
const sendEmail = require("../util/sendEmail");
const createVIPRoomReservationEmailTemplate = require("../util/email_templates/createVIPRoomReservationEmailTemplate");
const updateVIPRoomReservationEmailTemplate = require("../util/email_templates/updateVIPRoomReservationEmailTemplate");
const cancelReservationEmailTemplate = require("../util/email_templates/cancelReservationEmailTemplate");
// const cron = require('node-cron');


// Function to generate reservation ID
const generateReservationId = async () => {
    try {
        const latestReservation = await VIPRoomReservation.findOne().sort({createdAt: -1});
        if (!latestReservation) {
            return "V01";
        } else {
            const latestId = latestReservation.reservationId ? parseInt(latestReservation.reservationId.slice(1)) : 0;
            const newId = latestId + 1;
            return "V" + newId.toString().padStart(2, '0'); // Ensure two-digit padding
        }
    } catch (error) {
        console.error("Error generating VIP room reservation ID:", error);
        throw new Error("Error generating VIP room reservation ID");
    }
};

// Check vip room availability
router.post("/checkAvailability", async (req, res) => {
    try {
        const { date, time, excludeReservationId } = req.body;
        const query = { date, time };
        if (excludeReservationId) {
            query._id = { $ne: excludeReservationId };
        }
        const existingReservation = await VIPRoomReservation.findOne(query);
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

// Create a VIP room reservation
router.post("/create", async (req, res) => {
    try {
      const reservationId = await generateReservationId(); // Generate reservation ID
      const newVIPRoomReservation = new VIPRoomReservation({ ...req.body, reservationId });
      await newVIPRoomReservation.save(); 

      // Send confirmation email to the customer
      const { name, email, date, time, guests } = req.body;
      const emailTemplate = createVIPRoomReservationEmailTemplate(name, reservationId, date, time, guests);
      sendEmail(email, "VIP Room Reservation Confirmation", emailTemplate);
  
      res.json({ status: "VIP Room Reservation Added", vipRoomReservation: newVIPRoomReservation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating VIP room reservation" });
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

// Route to get count of VIP room reservations
router.get('/count', async (req, res) => {
    try {
      const count = await VIPRoomReservation.countDocuments(); // Count the documents in the VIP Room Reservations collection
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

        // Send confirmation email to the customer
        const { name, email, date, time, guests, reservationId } = req.body;
        const emailTemplate = updateVIPRoomReservationEmailTemplate(name, reservationId, date, time, guests);
        sendEmail(email, "VIP Room Reservation Updated Confirmation", emailTemplate);

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
        const deletedReservation = await VIPRoomReservation.findByIdAndDelete(id);

        // Send cancellation email to the customer
        const { name, email, reservationId } = deletedReservation;
        const emailTemplate = cancelReservationEmailTemplate(name, reservationId);
        sendEmail(email, "VIP Room Reservation Cancellation", emailTemplate);

        res.json({ status: "VIP Room Reservation deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting vip room reservation" });
    }
});

// Schedule cron job to delete reservations older than 4 months
/*cron.schedule('* * * * *', async () => {
    try {
        const currentDate = new Date();
        const fourMonthsAgo = new Date();
        fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
        await VIPRoomReservation.deleteMany({ date: { $lt: fourMonthsAgo } });
        //console.log('Reservations older than 4 months deleted successfully.');
    } catch (error) {
        console.error('Error deleting old reservations:', error);
    }
});*/

module.exports = router;