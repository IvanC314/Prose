// 'use client';

// import './Reviews.css';
// import MyReviewCard from './MyReviewCard';
// import { useEffect, useState } from 'react';

// export default function Reviews() {
//     const [reviews, setReviews] = useState<any[]>([]);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const response = await fetch('/api/reviews');
//                 const data = await response.json();
//                 console.log(data);
//                 setReviews(data);
//             } catch (error) {
//                 console.error("Failed to fetch reviews:", error);
//             }
//         };

//         fetchReviews();
//     }, []);

//     return (
//         <div className='review-center'>
//             <div className='reviews-container'>
//                 {reviews.map((review, index) => (
//                     <MyReviewCard
//                         id ={review._id}
//                         key={index}
//                         stars={"⭐".repeat(review.rating)}
//                         reviewTitle={review.title}                        
//                         reviewAuthor={review.reviewAuthor}
//                         bookImage={review.bookImage}
//                         bookTitle={review.bookTitle}
//                         bookAuthor={review.bookAuthor}
//                         upvotes={review.upvotes}
//                         downvotes={review.downvotes}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }


'use client';
import './Reviews.css';
import MyReviewCard from './MyReviewCard';
import { useEffect, useState } from 'react';
import { useAuth } from "@/app/AuthContext";

export default function Reviews() {
    const { user_id, isLoggedIn } = useAuth(); 
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${user_id}`);
                const data = await response.json();

                // Transform the data to match MyReviewCard props structure
                const formattedReviews = data.reviews.map((review: any) => ({
                    id: review._id,
                    stars: "⭐".repeat(review.rating),
                    reviewTitle: review.title,
                    reviewAuthor: `${data.user.f_name} ${data.user.l_name}`, // Assuming user info is consistent for all reviews
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
    }, []);

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
                    />
                ))}
            </div>
        </div>
    );
}
