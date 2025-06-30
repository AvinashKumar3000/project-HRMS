const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  image: {
    type: String, // URL or base64
    required: false,
  },

  tags: {
    type: [String], // e.g., ['fruits', 'fresh', 'organic']
    default: [],
  },

  offer: {
    type: String, // e.g., '10% off', 'Buy 1 Get 1'
    default: '',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on each update
ItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const ItemModel = mongoose.model('Item', ItemSchema);
module.exports = ItemModel;
