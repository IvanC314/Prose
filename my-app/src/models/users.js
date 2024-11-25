const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  f_name: {
    type: String,
    required: true
  },
  l_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'users'  // Corrected collection name
});

module.exports = mongoose.model('users', userSchema); // Corrected model name
