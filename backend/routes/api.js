const express = require('express');
const router = express.Router();

// Sample data route
router.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

// POST route for creating users (placeholder)
router.post('/users', (req, res) => {
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email
  };
  res.status(201).json(newUser);
});

module.exports = router;