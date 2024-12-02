require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../books');
const Review = require('../reviews');
const BookReview = require('../bookReviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing

async function insertBookReviews() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    // Clear the bookReviews collection
    await BookReview.deleteMany({});
    console.log('Cleared bookReviews collection');

    // Fetch all books and reviews
    const books = await Book.find();
    const reviews = await Review.find();

    // Log the fetched data for debugging
    console.log("Books:", books);
    console.log("Reviews:", reviews);

    if (books.length < 5 || reviews.length < 5) {
      throw new Error('Not enough books or reviews found. Ensure you have run insertBooks.js and insertReviews.js.');
    }

    // Create associations
    const bookReviews = books.map((book, index) => {
      const review = reviews[index];
      if (!review) {
        console.error(`Review not found for book ${book._id}`);
        return null; // Skip if no review is available for this book
      }
      return {
        book_id: book._id,
        review_id: review._id,
      };
    }).filter((bookReview) => bookReview !== null); // Filter out any null values

    // Log the associations to be inserted for debugging
    console.log("Book Reviews to be inserted:", bookReviews);

    // Insert valid bookReviews
    if (bookReviews.length > 0) {
      const result = await BookReview.insertMany(bookReviews);
      console.log('BookReviews inserted:', result);
    } else {
      console.log('No valid book reviews to insert.');
    }
  } catch (err) {
    console.error('Error inserting book reviews:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertBookReviews();
