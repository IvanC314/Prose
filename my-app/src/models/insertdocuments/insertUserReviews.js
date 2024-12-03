require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../users');
const Review = require('../reviews');
const UserReview = require('../userReviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; 

async function insertUserReviews() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    await UserReview.deleteMany({});
    console.log('Cleared userReviews collection');

    const users = await User.find();
    const reviews = await Review.find();

    console.log("Users:", users);
    console.log("Reviews:", reviews);

    if (users.length < 5 || reviews.length < 5) {
      throw new Error('Not enough users or reviews found. Ensure you have run insertUsers.js and insertReviews.js.');
    }

    const userReviews = users.map((user, index) => {
      if (!user || !user._id || !reviews[index] || !reviews[index]._id) {
        console.log("Skipping invalid user or review at index:", index);
        return null; 
      }
      return {
        user_id: user._id,
        review_id: reviews[index]._id,
      };
    }).filter(item => item !== null); 

    const result = await UserReview.insertMany(userReviews);
    console.log('UserReviews inserted:', result);
  } catch (err) {
    console.error('Error inserting user reviews:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertUserReviews();
