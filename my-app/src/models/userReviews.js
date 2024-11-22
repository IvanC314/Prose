const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReviewSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  // Corrected reference to users
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true }  // Corrected reference to reviews
}, {
  collection: 'userReviews'  // Corrected collection name
});

const UserReview = mongoose.model('userReviews', userReviewSchema); // Corrected model name

module.exports = UserReview;
