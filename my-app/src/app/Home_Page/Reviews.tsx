'use client';

import './Reviews.css';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';

export default function Reviews() {
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                const data = await response.json();
                console.log(data);  // Log the fetched data to check its structure
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className='review-center'>
            <h2 className="featured-reviews-header">Featured Reviews</h2>
            <div className='reviews-container'>
                {reviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        stars={"⭐".repeat(review.rating)}
                        reviewTitle={review.title}                        
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


/*
const reviews = [
    {
        stars: '⭐⭐⭐⭐⭐',
        reviewTitle: 'Amazing Book!',
        reviewAuthor: 'johndoe13',
        bookImage: testHarry.src,
        bookTitle: 'Harry Potter',
        bookAuthor: 'J.K. Rowling',
    },
    {
        stars: '⭐⭐⭐⭐',
        reviewTitle: 'Thought-provoking',
        reviewAuthor: 'janesmith101',
        bookImage: testAnimal.src,
        bookTitle: 'Animal Farm',
        bookAuthor: 'George Orwell',
    },
    {
        stars: '⭐',
        reviewTitle: 'Absolute Dog-water',
        reviewAuthor: 'thejackdaniel',
        bookImage: testAA.src,
        bookTitle: 'Alcoholics Anonymous',
        bookAuthor: 'Bill W.',
    },
];
*/
