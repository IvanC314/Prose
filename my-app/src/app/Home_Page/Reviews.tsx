'use client';

import './Reviews.css';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';

interface ReviewsProps {
    reviewsData?: any[];
}

export default function Reviews({ reviewsData }: ReviewsProps) {
    const [reviews, setReviews] = useState<any[]>(reviewsData || []);

    useEffect(() => {
        if (!reviewsData) { 
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
        }
    }, [reviewsData]);

    return (
        <div className='review-center'>
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
