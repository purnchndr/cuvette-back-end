const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const user = User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User already exists' });
});
