require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../books');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing
//const uri = process.env.MONGODB_URI;

const books = [
  { 
    title: 'To Kill a Mockingbird', 
    author: 'Harper Lee', 
    genre: ['Fiction', 'Classic'], 
    desc: 'A novel about the serious issues of rape and racial inequality.', 
    img_url: 'https://m.media-amazon.com/images/I/71HZbA0WscL._SL1500_.jpg' 
  },
  { 
    title: '1984', 
    author: 'George Orwell', 
    genre: ['Dystopian', 'Science Fiction'], 
    desc: 'A novel that portrays a terrifying vision of a totalitarian future.', 
    img_url: 'https://m.media-amazon.com/images/I/61NAx5pd6XL.jpg' 
  },
  { 
    title: 'The Great Gatsby', 
    author: 'F. Scott Fitzgerald', 
    genre: ['Fiction', 'Classic'], 
    desc: 'A critique of the American Dream in the 1920s.', 
    img_url: 'https://m.media-amazon.com/images/I/61z0MrB6qOS._SL1500_.jpg' 
  },
  { 
    title: 'Pride and Prejudice', 
    author: 'Jane Austen', 
    genre: ['Romance', 'Classic'], 
    desc: 'A story about love and social standing.', 
    img_url: 'https://m.media-amazon.com/images/I/81a3sr-RgdL._SL1500_.jpg' 
  },
  { 
    title: 'Moby-Dick', 
    author: 'Herman Melville', 
    genre: ['Adventure', 'Classic'], 
    desc: 'A seafaring adventure of obsession and revenge.', 
    img_url: 'https://m.media-amazon.com/images/I/81+3Wl6KVNL._SL1500_.jpg' 
  },
];

async function insertBooks() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    // Clear the Book collection
    await Book.deleteMany({});
    console.log('Cleared Book collection');

    // Insert new books
    const result = await Book.insertMany(books);
    console.log('Books inserted:', result);
  } catch (err) {
    console.error('Error inserting books:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertBooks();
