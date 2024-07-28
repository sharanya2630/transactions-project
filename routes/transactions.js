const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');

// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Public
router.post('/', async (req, res) => {
  const { type, amount, description } = req.body;

  if (!type || !amount || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTransaction = new Transaction({
      type,
      amount,
      description
    });

    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
