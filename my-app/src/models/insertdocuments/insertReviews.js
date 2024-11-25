require('dotenv').config();
const mongoose = require('mongoose');
const Review = require('../reviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing

const reviews = [
  { title: 'Omg!', rating: 5, desc: 'Absolutely loved it!', upvotes: 3051, downvotes: 27 },
  { title: 'Quite Good', rating: 4, desc: 'Good quality but a bit pricey.', upvotes: 1307, downvotes: 503 },
  { title: 'Its a book ig', rating: 3, desc: 'Average experience.', upvotes: 20, downvotes: 589 },
  { title: 'Written by a Child', rating: 2, desc: 'Expected more.', upvotes: 108, downvotes: 89 },
  { title: 'Tf did I read', rating: 1, desc: 'Would not recommend.', upvotes: 1050, downvotes: 1081 },];

async function insertReviews() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    // Clear the reviews collection
    await Review.deleteMany({});
    console.log('Cleared reviews collection');

    // Insert new reviews
    const result = await Review.insertMany(reviews);
    console.log('Reviews inserted:', result);
  } catch (err) {
    console.error('Error inserting reviews:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertReviews();
