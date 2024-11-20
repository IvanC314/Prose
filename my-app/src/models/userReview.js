const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  review_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  }
});

module.exports = mongoose.model('UserReview', userReviewSchema);
