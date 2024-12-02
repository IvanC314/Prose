// Home_Screen/Reviews.tsx
'use client';

import './Reviews.css';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';

interface ReviewsProps {
    reviewsData?: any[]; // Optional prop to pass pre-filtered reviews
}

export default function Reviews({ reviewsData }: ReviewsProps) {
    const [reviews, setReviews] = useState<any[]>(reviewsData || []);

    useEffect(() => {
        if (!reviewsData) { // If reviewsData is not passed, fetch reviews
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
        }
    }, [reviewsData]);

    return (
        <div className='review-center'>
            {/* Only display Featured Reviews on the home page */}
            {!reviewsData && <h2 className="featured-reviews-header">Featured Reviews</h2>}
            <div className='reviews-container'>
                {reviews.map((review, index) => (
                    <ReviewCard
                        id={review._id}
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
