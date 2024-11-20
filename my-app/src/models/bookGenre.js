const mongoose = require('mongoose');

const bookGenreSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  genre_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  }
});

module.exports = mongoose.model('BookGenre', bookGenreSchema);
