require('dotenv').config(); // Ensure .env config is loaded
const mongoose = require('mongoose'); // Import mongoose
const User = require('../users');
const Review = require('../reviews');
const UserReview = require('../userReviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing

async function insertUserReviews() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    // Clear the userReviews collection
    await UserReview.deleteMany({});
    console.log('Cleared userReviews collection');

    // Fetch all users and reviews
    const users = await User.find();
    const reviews = await Review.find();

    // Log the fetched data for debugging
    console.log("Users:", users);
    console.log("Reviews:", reviews);

    if (users.length < 5 || reviews.length < 5) {
      throw new Error('Not enough users or reviews found. Ensure you have run insertUsers.js and insertReviews.js.');
    }

    // Create associations
    const userReviews = users.map((user, index) => {
      const review = reviews[index];
      if (!review) {
        console.error(`Review not found for user ${user._id}`);
        return null; // Skip if no review is available for this user
      }
      return {
        user_id: user._id,
        review_id: review._id,
      };
    }).filter((userReview) => userReview !== null); // Filter out any null values

    // Insert valid userReviews
    const result = await UserReview.insertMany(userReviews);
    console.log('UserReviews inserted:', result);
  } catch (err) {
    console.error('Error inserting user reviews:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertUserReviews();
