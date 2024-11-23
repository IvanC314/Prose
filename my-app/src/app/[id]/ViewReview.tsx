// "use client"
// import React, { useState } from 'react';
// import './ViewReview.css';
// import Button from '../Shared_Components/Button';
// import book from '../images/OpenBook.png';

// export default function ViewReview() {
//     return (
//         <div className="view-page-wrapper">
//             <img src={book.src} alt="Book background" className="view-background-image" />
//             <div className="view-content">
//                 <form className="view-page-container">
//                     <div className="view-form-section view-left-section">
//                         <p>book title</p>
//                         <p>book image</p>
//                         <p>book author</p>
//                     </div>

//                     <div className="view-form-section view-right-section">
//                         <p>review title</p>
//                         <p>review stars</p>
//                         <p>review text</p>
//                         <Button text="Post Review" targetPage="../Auth_Home_Page"/>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

"use client";
import React from 'react';
import './ViewReview.css';
import Button from '../Shared_Components/Button';
import book from '../images/OpenBook.png';

interface ViewReviewProps {
    stars: string;
    reviewTitle: string;
    reviewText: string;
    bookImage: string;
    bookTitle: string;
    bookAuthor: string;
    bookDesc: string;
}

export default function ViewReview({
    stars,
    reviewTitle,
    reviewText,
    bookImage,
    bookTitle,
    bookAuthor,
    bookDesc,
}: ViewReviewProps) {
    return (
        <div className="view-page-wrapper">
            <img src={book.src} alt="Book background" className="view-background-image" />
            <div className="view-content">
                <form className="view-page-container">
                    <div className="view-form-section view-left-section">
                        <p><strong>Book:</strong> {bookTitle}</p>
                        <img src={bookImage} alt={bookTitle} className="view-book-image" />
                        <p><strong>Author:</strong> {bookAuthor}</p>
                        <p className='text-align-left'><strong>Description:</strong> {bookDesc}</p>

                    </div>

                    <div className="view-form-section view-right-section">
                        <p><strong> "{reviewTitle}"</strong></p>
                        <p><strong> {stars}</strong></p>
                        <p className='text-align-left'><strong>Review:</strong> {reviewText}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
