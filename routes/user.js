const express = require('express');
const router = express.Router();

const { authUser } = require('../auth/auth');
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/user');

router
  .get('/', authUser, getUsers)
  .post('/register', registerUser)
  .post('/login', loginUser)
  .get('/:id', authUser, getUser)
  .patch('/:id', authUser, updateUser)
  .delete('/:id', authUser, deleteUser);

module.exports = router;
