const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const useSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model('User', useSchema);

module.exports = User;
