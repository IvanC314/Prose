const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  desc: {
    type: String
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
},
{
    collection: 'review'
});

export default mongoose.models.Review || mongoose.model("reviews", reviewSchema);