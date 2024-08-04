const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
  try {
    const jwtToken = req.header('auth-token');
    const jwtData = jwt.verify(jwtToken, process.env.JWS_SECRET);
    const user = await User.findById(jwtData._id);
    res.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authUser };
