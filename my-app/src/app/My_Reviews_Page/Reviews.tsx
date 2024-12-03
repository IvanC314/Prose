import './Reviews.css';
import MyReviewCard from './MyReviewCard';
import { useEffect, useState } from 'react';
import { useAuth } from "@/app/AuthContext";

export default function Reviews() {
    const { user_id } = useAuth(); 
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/users/${user_id}`, {
                    cache: 'no-store',
                });
                const data = await res.json();

                const formattedReviews = data.reviews.map((review: any) => ({
                    id: review._id,
                    stars: "⭐".repeat(review.rating),
                    reviewTitle: review.title,
                    reviewAuthor: `${data.user.f_name} ${data.user.l_name}`,
                    bookImage: review.book.img_url,
                    bookTitle: review.book.title,
                    bookAuthor: review.book.author,
                    upvotes: review.upvotes,
                    downvotes: review.downvotes,
                }));

                setReviews(formattedReviews);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        fetchReviews();
    }, [user_id]); 

    const handleDelete = (id: string) => {
        
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
    };

    return (
        <div className='review-center'>
            <div className='reviews-container'>
            {reviews.map((review, index) => (
                    <MyReviewCard
                        id={review.id}
                        key={index}
                        stars={review.stars}
                        reviewTitle={review.reviewTitle}
                        reviewAuthor={review.reviewAuthor}
                        bookImage={review.bookImage}
                        bookTitle={review.bookTitle}
                        bookAuthor={review.bookAuthor}
                        upvotes={review.upvotes}
                        downvotes={review.downvotes}
                        handleDelete={handleDelete} 
                    />
                ))}
            </div>
        </div>
    );
}
