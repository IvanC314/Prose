const mongoose = require('mongoose');

const bookReviewSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  review_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  }
});

module.exports = mongoose.model('BookReview', bookReviewSchema);
