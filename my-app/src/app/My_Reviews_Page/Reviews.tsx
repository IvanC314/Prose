'use client';

import './Reviews.css';
import MyReviewCard from './MyReviewCard';
import { useEffect, useState } from 'react';

export default function Reviews() {
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                const data = await response.json();
                console.log(data);
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className='review-center'>
            <div className='reviews-container'>
                {reviews.map((review, index) => (
                    <MyReviewCard
                        id ={review._id}
                        key={index}
                        stars={"⭐".repeat(review.rating)}
                        reviewTitle={review.title}                        
                        reviewAuthor={review.reviewAuthor}
                        bookImage={review.bookImage}
                        bookTitle={review.bookTitle}
                        bookAuthor={review.bookAuthor}
                        upvotes={review.upvotes}
                        downvotes={review.downvotes}
                    />
                ))}
            </div>
        </div>
    );
}
