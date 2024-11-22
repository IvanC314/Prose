const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'books', required: true },  // Corrected reference to books
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true }  // Corrected reference to reviews
}, {
  collection: 'bookReviews'  // Corrected collection name
});

const BookReview = mongoose.model('bookReviews', bookReviewSchema); // Corrected model name

module.exports = BookReview;
