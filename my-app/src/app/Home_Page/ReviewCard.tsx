/* INDIVIDUAL REVIEW CARDS THAT SHOW UP ON THE HOME SCREEN */

import './ReviewCard.css';

interface ReviewCardProps {
    stars: string;
    reviewTitle: string;
    reviewAuthor: string;
    bookImage: string;
    bookTitle: string;
    bookAuthor: string;
}

export default function ReviewCard({ stars, reviewTitle, reviewAuthor, bookImage, bookTitle, bookAuthor }: ReviewCardProps) {
    return (
        <div className='review-container'>
            <p className='stars'>{stars}</p>
            <p className='review-title'>{reviewTitle}</p>
            <p className='review-author'>{reviewAuthor}</p>
            <img src={bookImage} className='book-image' alt={bookTitle} />
            <p className='book-title'>{bookTitle}</p>
            <p className='book-author'>{bookAuthor}</p>
        </div>
    );
}