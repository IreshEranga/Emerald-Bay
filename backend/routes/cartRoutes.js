const router = require("express").Router();
const Cart = require("../models/Cart");

router.post("/add", async (req, res) => {
    try {
        const { itemId, name, quantity, price,totalAmount } = req.body;
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
                price: parseFloat(price),
                totalAmount:parseFloat(totalAmount),
            });
        }

        res.status(200).json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ success: false, message: "Failed to add item to cart" });
    }
});

router.put("/increase/:itemId", async (req, res) => {
    try {
        const { itemId } = req.params;
        const cartItem = await Cart.findOne({ itemId });
        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
            res.status(200).json({ success: true, message: "Item quantity increased successfully" });
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error increasing item quantity:", error);
        res.status(500).json({ success: false, message: "Failed to increase item quantity" });
    }
});

router.put("/decrease/:itemId", async (req, res) => {
    try {
        const { itemId } = req.params;
        const cartItem = await Cart.findOne({ itemId });
        if (cartItem) {
            if (cartItem.quantity > 0) {
                cartItem.quantity -= 1;
                await cartItem.save();
                res.status(200).json({ success: true, message: "Item quantity decreased successfully" });
            } else {
                res.status(400).json({ success: false, message: "Minimum quantity reached" });
            }
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error decreasing item quantity:", error);
        res.status(500).json({ success: false, message: "Failed to decrease item quantity" });
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