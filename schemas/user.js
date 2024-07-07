const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const useSchema = new Schema({
  name: String,
  mobile: String,
  email: String,
});

const User = new mongoose.model('User', useSchema);

module.exports = User;
