require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../users');

const uri = 'mongodb+srv://Farian:1234@reviews.z5ehd.mongodb.net/prose'; // Hardcoded URI for testing

const users = [
  { email: 'alice@example.com', f_name: 'Alice', l_name: 'Smith', password: 'password123', username: 'smolBeanAlice' },
  { email: 'bob@example.com', f_name: 'Bob', l_name: 'Johnson', password: 'password123', username: 'BobsYourUncle42' },
  { email: 'carol@example.com', f_name: 'Carol', l_name: 'Williams', password: 'password123', username: 'CarolBaskinsFan99' },
  { email: 'dave@example.com', f_name: 'Dave', l_name: 'Brown', password: 'password123', username: 'DaveTheWave' },
  { email: 'eve@example.com', f_name: 'Eve', l_name: 'Jones', password: 'password123', username: 'EvilEve123' },
];

async function insertUsers() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

    // Insert new users only if their username does not already exist in the database
    for (const user of users) {
      const existingUser = await User.findOne({ username: user.username });
      
      if (existingUser) {
        console.log(`User with username ${user.username} already exists, skipping.`);
      } else {
        const newUser = new User(user);
        await newUser.save();
        console.log(`Inserted new user: ${user.username}`);
      }
    }
  } catch (err) {
    console.error('Error inserting users:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertUsers();
