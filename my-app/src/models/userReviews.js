const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReviewSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true }  
}, {
  collection: 'userReviews'  
});


module.exports = mongoose.models.userReviews || mongoose.model("userReviews", userReviewSchema);
