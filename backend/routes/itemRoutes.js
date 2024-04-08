const router = require('express').Router();
const Item = require('../models/Item');


// Function to generate item ID
const generateItemId = async () => {
  try {
    const latestItem = await Item.findOne().sort({ createdAt: -1 });
    if (!latestItem) {
      return '01';
    } else {
      const latestId = parseInt(latestItem.itemId.slice(1)); // Extract numeric part of the ID
      const newId = latestId + 1;
      return newId.toString().padStart(2, '0'); // Ensure two-digit padding
    }
  } catch (error) {
    console.error('Error generating Item ID:', error);
    throw new Error('Error generating Item ID');
  }
};

// Create a new Item
router.post('/create', async (req, res) => {
  try {
    const itemId = await generateItemId(); // Generate Item ID
    const newItem = new Item({ ...req.body, itemId });
    await newItem.save();
    res.json({ status: 'Item Added', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating Item' });
  }
});

// Get all Items or filtered by category
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const items = await Item.find(query);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving Items' });
  }
});

router.get('/get/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const items = await Item.find({ category });
        res.json({ success: true, items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error retrieving items by category' });
    }
});

/*router.route("/get/beverages").get(async (req, res) => {
    try {
      const beveragesItems = await Menu_Item.find({ category: "Beverages" }).select("-password");
      res.status(200).json({ success: true, beveragesItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
});

router.route("/get/rices").get(async (req, res) => {
    try {
      const ricesItems = await Menu_Item.find({ category: "Rices" }).select("-password");
      res.status(200).json({ success: true, ricesItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
});

router.route("/get/desserts").get(async (req, res) => {
    try {
      const dessertsItems = await Menu_Item.find({ category: "Desserts" }).select("-password");
      res.status(200).json({ success: true, dessertsItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
});

router.route("/get/sidedishes").get(async (req, res) => {
    try {
      const sidedishesItems = await Menu_Item.find({ category: "Side Dishes" }).select("-password");
      res.status(200).json({ success: true, sidedishesItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
});

router.route("/get/soups").get(async (req, res) => {
    try {
      const soupsItems = await Menu_Item.find({ category: "Soups" }).select("-password");
      res.status(200).json({ success: true, soupsItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
});

router.route("/get/salads").get(async (req, res) => {
    try {
      const saladsItems = await Menu_Item.find({ category: "salads" }).select("-password");
      res.status(200).json({ success: true, saladsItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
});*/

// Update an Item
router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ status: 'Item updated', item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating Item' });
  }
});

// Delete an Item
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Item.findByIdAndDelete(id);
    res.json({ status: 'Item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting Item' });
  }
});

module.exports = router;