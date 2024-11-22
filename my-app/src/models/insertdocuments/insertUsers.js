require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../users');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing

const users = [
  { email: 'alice@example.com', f_name: 'Alice', l_name: 'Smith', password: 'password123' },
  { email: 'bob@example.com', f_name: 'Bob', l_name: 'Johnson', password: 'password123' },
  { email: 'carol@example.com', f_name: 'Carol', l_name: 'Williams', password: 'password123' },
  { email: 'dave@example.com', f_name: 'Dave', l_name: 'Brown', password: 'password123' },
  { email: 'eve@example.com', f_name: 'Eve', l_name: 'Jones', password: 'password123' },
];

async function insertUsers() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    // Clear the users collection
    await User.deleteMany({});
    console.log('Cleared users collection');

    // Insert new users
    const result = await User.insertMany(users);
    console.log('Users inserted:', result);
  } catch (err) {
    console.error('Error inserting users:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertUsers();
