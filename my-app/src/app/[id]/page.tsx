// import ViewHeader from "./ViewHeader";
// import ViewReview from "./ViewReview";

// export default function Home() {
//   return (
//     <div>
//         <ViewHeader/>
//         <ViewReview/>
//     </div>
//   );
// }
import React from 'react';
import ViewHeader from "./ViewHeader";
import ViewReview from "./ViewReview";

interface ReviewProps {
    review: {
        title: string;
        rating: number;
        text: string;
        bookImage: string;
        bookTitle: string;
        bookAuthor: string;
    };
}

const ReviewPage = async ({ params }: { params: { id: string } }) => {
    try {
        const res = await fetch(`http://localhost:3000/api/reviews/${params.id}`, {
            cache: 'no-store',
        });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch review with status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        // Add detailed logging
        console.log('Full response data:', JSON.stringify(data, null, 2));
        console.log('Review data:', data.item);
        console.log('Book data:', data.book);

        if (!data || !data.item || !data.book) {
            console.log('Missing data structure:', {
                hasData: !!data,
                hasItem: !!data?.item,
                hasBook: !!data?.book
            });
            return <div>Review or Book not found</div>;
        }
        
        const review = data.item;
        const book = data.book;

        return (
            <div>
                <ViewHeader />
                <ViewReview
                    reviewId={review._id}
                    stars={"⭐".repeat(review.rating)}
                    reviewTitle={review.title}
                    reviewText={review.desc}
                    bookImage={book.img_url || ""}
                    bookTitle={book.title || "Unknown Title"}
                    bookAuthor={book.author || "Unknown Author"}
                    bookDesc={book.desc || "No description"}
                    upvotes={review.upvotes}
                    downvotes={review.downvotes}
                />
            </div>
        );
    } catch (error) {
        console.error('Error fetching review data:', error);
        return <div>Error loading review</div>;
    }
};


export default ReviewPage;
