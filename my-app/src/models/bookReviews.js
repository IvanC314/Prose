const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'books', required: true },  // Corrected reference to books
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true }  // Corrected reference to reviews
}, {
  collection: 'bookReviews'  // Corrected collection name
});

module.exports = mongoose.models.bookReviews || mongoose.model("bookReviews", bookReviewSchema);
