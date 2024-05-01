const router = require("express").Router();
const LoyaltyCustomers = require("../models/LoyaltyCustomers");
const Customer = require("../models/Customer");


// Add loyalty customer request
router.route("/add").post(async (req, res) => {
    // Extract data from the request body
    const { name, email, mobile, membershipType, status } = req.body;

    // Create a new LoyaltyCustomers object
    const newLoyaltyCustomer = new LoyaltyCustomers({
        name,
        email,
        mobile,
        status,
        membershipType
    });

    // Save the new loyalty customer to the database
    try {
        await newLoyaltyCustomer.save();
        res.json("Loyalty Customer requested.");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error requesting loyalty customer.");
    }
});

// Get all loyalty customers
router.route("/").get((req, res) => {
    LoyaltyCustomers.find()
        .then((loyaltyCustomers) => {
            res.json(loyaltyCustomers);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json("Error fetching loyalty customers.");
        });
});

// Accept loyalty customer request
router.route("/accept/:id").put(async (req, res) => {
    const { id } = req.params;

    try {
        // Update the loyalty customer status to 'VIP'
        await LoyaltyCustomers.findByIdAndUpdate(id, { status: 'Vip' });

        // Find the associated customer and update their status to 'VIP'
        const loyaltyCustomer = await LoyaltyCustomers.findById(id);
        if (loyaltyCustomer) {
            const customer = await Customer.findOneAndUpdate({ email: loyaltyCustomer.email }, { status: 'Vip' });
            if (!customer) {
                return res.status(404).json("Associated customer not found.");
            }
        } else {
            return res.status(404).json("Loyalty customer not found.");
        }

        res.json("Loyalty customer request accepted and customer status updated to 'Vip'.");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error accepting loyalty customer request.");
    }
});

// Reject loyalty customer request
router.route("/reject/:id").delete(async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the loyalty customer request
        await LoyaltyCustomers.findByIdAndDelete(id);
        res.json("Loyalty customer request rejected.");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error rejecting loyalty customer request.");
    }
});




module.exports = router;
