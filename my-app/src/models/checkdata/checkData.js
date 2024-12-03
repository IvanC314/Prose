require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');

console.log('Raw .env file content:');
console.log(fs.readFileSync('.env', 'utf8'));  

const uri = process.env.MONGODB_URI;
console.log(`MONGODB_URI: ${uri}`);  

if (!uri) {
    console.error('MONGODB_URI is not defined. Check your .env file.');
    process.exit(1);  
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function checkData() {
    try {
        await client.connect();
        const db = client.db();

        const userReviews = await db.collection('userReviews').find({}).toArray();
        const users = await db.collection('users').find({}).toArray();
        const bookReviews = await db.collection('bookReviews').find({}).toArray();
        const books = await db.collection('books').find({}).toArray();

        console.log('User Reviews:', userReviews);
        console.log('Users:', users);
        console.log('Book Reviews:', bookReviews);
        console.log('Books:', books);

        await client.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkData();
