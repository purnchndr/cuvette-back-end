const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// const authUser = async (req, res, next) => {
//   try {
//     const jwtToken = req.header('auth-token');
//     const jwtData = jwt.verify(jwtToken, process.env.JWS_SECRET);
//     const user = await User.findById(jwtData._id);
//     res.user = user;
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: 'User already registered, please login' });
    const hash = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hash, mobile });
    await user.save();
    var token = jwt.sign({ _id: user._id }, process.env.JWS_SECRET);
    res
      .header('auth-token', token)
      .status(200)
      .json({ message: 'User Created succesfully' });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.password);
    if (!user)
      return res
        .status(404)
        .message({ message: 'Email or Password is incorrect' });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      const token = jwt.sign({ _id: user._id }, process.env.JWS_SECRET);
      return res
        .header('auth-token', token)
        .status(201)
        .json({ message: 'Login successful' });
    } else
      return res
        .status(404)
        .json({ message: 'Email or Password is incorrect' });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    let users = await User.find().select('-password -__v');

    res.status(200).json({
      message: 'Users fetched succesfully',
      data: users,
      result: users?.length || 0,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    let user = await User.findById(id).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({
      message: 'User fetched succesfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    let user = await User.findByIdAndDelete(id).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({
      message: 'User deleted succesfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;
    if (body.email)
      return res.status(400).json({ message: "Email can't be changed" });

    if (body.password) body.password = await bcrypt.hash(body.password, 10);
    let user = await User.findByIdAndUpdate(id, body);
    if (!user) return res.status(400).json({ message: 'user not found' });

    res.status(200).json({ message: 'User updated succesfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
