require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../users');
const Book = require('../books');
const Review = require('../reviews');
const UserReview = require('../userReviews');
const BookReview = require('../bookReviews');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose';

async function insertReviewIvan() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    const user = await User.findOne({ username: 'icao' });
    if (!user) {
      throw new Error('User with username "icao" not found');
    }
    console.log('User found:', user);

    const book = new Book({
      title: 'The Art of War',
      author: 'Sun Tzu',
      genre: ['Strategy', 'Philosophy'],
      desc: 'A classical Chinese text on military strategy and tactics.',
      img_url: 'https://m.media-amazon.com/images/I/51HwNMz3EuL._SL1500_.jpg',
    });
    await book.save();
    console.log('Book inserted:', book);

    const review = new Review({
      title: 'Strategic Masterpiece',
      rating: 5,
      desc: 'An exceptional guide on strategy and warfare. Timeless wisdom.',
      upvotes: 500,
      downvotes: 10,
    });
    await review.save();
    console.log('Review inserted:', review);

    const userReview = new UserReview({
      user_id: user._id,
      review_id: review._id,
    });
    await userReview.save();
    console.log('UserReview inserted:', userReview);

    const bookReview = new BookReview({
      book_id: book._id,
      review_id: review._id,
    });
    await bookReview.save();
    console.log('BookReview inserted:', bookReview);

  } catch (err) {
    console.error('Error inserting review for Ivan:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertReviewIvan();
