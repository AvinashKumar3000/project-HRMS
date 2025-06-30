const express = require('express');
const itemRouter = express.Router();
const ItemModel = require('../models/ItemModel'); // Adjust path as per your project

// GET /all - Get all items
itemRouter.get('/all', async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST / - Add a new item
itemRouter.post('/', async (req, res) => {
  try {
    const newItem = new ItemModel(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add item', details: err.message });
  }
});

// DELETE /:id - Delete item by ID
itemRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await ItemModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// PUT /:id - Update item by ID
itemRouter.put('/:id', async (req, res) => {
  try {
    const updated = await ItemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update item', details: err.message });
  }
});

module.exports = itemRouter;
