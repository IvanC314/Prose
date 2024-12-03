const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'books', required: true },  
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true }  
}, {
  collection: 'bookReviews'  
});

module.exports = mongoose.models.bookReviews || mongoose.model("bookReviews", bookReviewSchema);
