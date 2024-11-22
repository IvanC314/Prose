require('dotenv').config();
const mongoose = require('mongoose');
const Review = require('../reviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing

const reviews = [
  { title: 'Great Product!', rating: 5, desc: 'Absolutely loved it!' },
  { title: 'Not bad', rating: 4, desc: 'Good quality but a bit pricey.' },
  { title: 'Okay', rating: 3, desc: 'Average experience.' },
  { title: 'Disappointed', rating: 2, desc: 'Expected more.' },
  { title: 'Terrible', rating: 1, desc: 'Would not recommend.' },
];

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
