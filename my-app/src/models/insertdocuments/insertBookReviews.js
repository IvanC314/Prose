require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../books');
const Review = require('../reviews');
const BookReview = require('../bookReviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing
//const uri = process.env.MONGODB_URI;

async function insertBookReviews() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    // Clear the BookReview collection
    await BookReview.deleteMany({});
    console.log('Cleared BookReview collection');

    // Fetch all books and reviews
    const books = await Book.find();
    const reviews = await Review.find();

    if (books.length < 5 || reviews.length < 5) {
      throw new Error('Not enough books or reviews found. Ensure you have run insertBooks.js and insertReviews.js.');
    }

    // Create associations
    const bookReviews = books.map((book, index) => ({
      book_id: book._id,
      review_id: reviews[index]._id,
    }));

    const result = await BookReview.insertMany(bookReviews);
    console.log('BookReviews inserted:', result);
  } catch (err) {
    console.error('Error inserting book reviews:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertBookReviews();
