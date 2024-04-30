const express = require("express");
const router = express.Router();

router.post("/calculate-payment", (req, res) => {
    try {
        const { cartItems, deliveryOption, isLoyaltyCustomer } = req.body;

        let totalPayment = 0;
        cartItems.forEach(item => {
            totalPayment += item.price * item.quantity;
        });

        if (deliveryOption === "delivery") {
            totalPayment += 5; 
        }

        if (isLoyaltyCustomer) {
            totalPayment *= 0.95; 
        }

        res.status(200).json({ totalPayment });
    } catch (error) {
        console.error("Error calculating total payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
