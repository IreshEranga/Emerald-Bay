const router = require("express").Router();
const Cart = require("../models/Cart");


router.post("/add", async (req, res) => {
    try {
        const { itemId, name, quantity, price } = req.body;
        let existingCartItem = await Cart.findOne({ itemId });

        if (existingCartItem) {
            existingCartItem.quantity += parseInt(quantity);
            existingCartItem.price += parseFloat(price);
            await existingCartItem.save();
        } else {
            await Cart.create({
                itemId,
                name,
                quantity: parseInt(quantity),
                price: parseFloat(price)
            });
        }

        res.status(200).json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ success: false, message: "Failed to add item to cart" });
    }
});

router.get("/", async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json({ success: true, items: cartItems });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ success: false, message: "Failed to fetch cart items" });
    }
});

router.delete("/remove/:itemId", async (req, res) => {
    try {
        const { itemId } = req.params;
        await Cart.findOneAndDelete({ itemId });
        res.status(200).json({ success: true, message: "Item removed from cart successfully" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ success: false, message: "Failed to remove item from cart" });
    }
});

module.exports = router;