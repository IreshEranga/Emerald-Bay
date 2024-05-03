const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true
    },
    image: { 
      type: String 
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;