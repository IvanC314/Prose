const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: [String] // Array of genres for simplicity
  },
  desc: {
    type: String
  },
  img_url: {
    type: String
  }
});

module.exports = mongoose.model('Book', bookSchema);
