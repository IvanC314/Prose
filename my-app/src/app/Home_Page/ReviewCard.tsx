/* INDIVIDUAL REVIEW CARDS THAT SHOW UP ON THE HOME SCREEN */

import './ReviewCard.css';
<<<<<<< HEAD
import Image from 'next/image';
=======
import testHarry from '../images/testHarry.jpg'
import testAnimal from '../images/testAnimal.jpg'
import testBook from '../images/book.jpg'
>>>>>>> parent of bf471f0 (Merge pull request #1 from IvanC314/development)

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
            <p  className='stars'>⭐⭐⭐⭐⭐</p>
            <p className='review-title'>Review title</p>
            <p className='review-author'>Review Author</p>
            <img src={testHarry.src}  className='book-image'></img>
            <p className='book-title'>Book Title</p>
            <p className='book-author'>Book Author</p>
        </div>
    );
<<<<<<< HEAD
}

/*            <img src={bookImage} className='book-image' alt={bookTitle} />
*/
=======
};

function ReviewCard2() 
{
    return (
        <div className='review-container'>
            <p  className='stars'>⭐⭐⭐⭐⭐</p>
            <p className='review-title'>Review title</p>
            <p className='review-author'>Review Author</p>
            <img src={testAnimal.src}  className='book-image'></img>
            <p className='book-title'>Book Title</p>
            <p className='book-author'>Book Author</p>
        </div>
    );
};

function ReviewCard3() 
{
    return (
        <div className='review-container'>
            <p  className='stars'>⭐⭐⭐⭐⭐</p>
            <p className='review-title'>Review title</p>
            <p className='review-author'>Review Author</p>
            <img src={testBook.src}  className='book-image'></img>
            <p className='book-title'>Book Title</p>
            <p className='book-author'>Book Author</p>
        </div>
    );
};

export { ReviewCard, ReviewCard2, ReviewCard3 };
>>>>>>> parent of bf471f0 (Merge pull request #1 from IvanC314/development)
