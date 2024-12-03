require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../books');
const Review = require('../reviews');
const BookReview = require('../bookReviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; 

async function insertBookReviews() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    
    await BookReview.deleteMany({});
    console.log('Cleared bookReviews collection');

    
    const books = await Book.find();
    const reviews = await Review.find();

   
    console.log("Books:", books);
    console.log("Reviews:", reviews);

    if (books.length < 5 || reviews.length < 5) {
      throw new Error('Not enough books or reviews found. Ensure you have run insertBooks.js and insertReviews.js.');
    }

    
    const bookReviews = books.map((book, index) => {
      const review = reviews[index];
      if (!review) {
        console.error(`Review not found for book ${book._id}`);
        return null; 
      }
      return {
        book_id: book._id,
        review_id: review._id,
      };
    }).filter((bookReview) => bookReview !== null);

    console.log("Book Reviews to be inserted:", bookReviews);

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
