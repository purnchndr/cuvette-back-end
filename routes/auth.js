const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { authUser, register, login } = require('../controllers/auth');
const router = express.Router();

router.post('/register', register).post('/login', login);

module.exports = router;
