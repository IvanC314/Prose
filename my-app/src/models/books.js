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
    type: [String] 
  },
  desc: {
    type: String
  },
  img_url: {
    type: String
  }
}, {
  collection: 'books' 
});

module.exports = mongoose.models.books || mongoose.model("books", bookSchema);
