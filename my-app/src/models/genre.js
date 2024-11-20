const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true
  },
  menu_genre: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Genre', genreSchema);
