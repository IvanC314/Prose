const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  review_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review',
    required: true
  }
});

module.exports = mongoose.model('userReviews', userReviewSchema);
