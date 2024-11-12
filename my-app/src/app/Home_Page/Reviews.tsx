/* BODY THAT CONTAINS ALL THE REVIEW CARDS */

import './Reviews.css';
import ReviewCard from './ReviewCard';
import testHarry from '../images/testHarry.jpg';
import testAnimal from '../images/testAnimal.jpg';
import testAA from '../images/testAA.jpg';

const reviews = [
    {
        stars: '⭐⭐⭐⭐⭐',
        reviewTitle: 'Amazing Book!',
        reviewAuthor: 'John Doe',
        bookImage: testHarry.src,
        bookTitle: 'Harry Potter',
        bookAuthor: 'J.K. Rowling',
    },
    {
        stars: '⭐⭐⭐⭐',
        reviewTitle: 'Thought-provoking',
        reviewAuthor: 'Jane Smith',
        bookImage: testAnimal.src,
        bookTitle: 'Animal Farm',
        bookAuthor: 'George Orwell',
    },
    {
        stars: '⭐',
        reviewTitle: 'Absolute Dogwater',
        reviewAuthor: 'Jack Daniel',
        bookImage: testAA.src,
        bookTitle: 'Alcoholics Anonymous',
        bookAuthor: 'Bill W.',
    },
];

export default function Reviews() {
    return (
        <div className='review-center'>
            <div className='reviews-container'>
                {reviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        stars={review.stars}
                        reviewTitle={review.reviewTitle}
                        reviewAuthor={review.reviewAuthor}
                        bookImage={review.bookImage}
                        bookTitle={review.bookTitle}
                        bookAuthor={review.bookAuthor}
                    />
                ))}
            </div>
        </div>
    );
}
