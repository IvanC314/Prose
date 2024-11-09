/* INDIVIDUAL REVIEW CARDS THAT SHOW UP ON THE HOME SCREEN */

import './ReviewCard.css';
import testHarry from '../images/testHarry.jpg'
import testAnimal from '../images/testAnimal.jpg'
import testBook from '../images/book.jpg'


function ReviewCard() 
{
    return (
        <div className='review-container'>
            <p className='review-title'>Review title</p>
            <p className='review-author'>Review Author</p>
            <p  className='stars'>⭐⭐⭐⭐⭐</p>
            <img src={testHarry.src}  className='book-image'></img>
            <p className='book-title'>Book Title</p>
            <p className='book-author'>Book Author</p>
        </div>
    );
};

function ReviewCard2() 
{
    return (
        <div className='review-container'>
            <p className='review-title'>Review title</p>
            <p className='review-author'>Review Author</p>
            <p  className='stars'>⭐⭐⭐⭐⭐</p>
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
            <p className='review-title'>Review title</p>
            <p className='review-author'>Review Author</p>
            <p  className='stars'>⭐⭐⭐⭐⭐</p>
            <img src={testBook.src}  className='book-image'></img>
            <p className='book-title'>Book Title</p>
            <p className='book-author'>Book Author</p>
        </div>
    );
};

export { ReviewCard, ReviewCard2, ReviewCard3 };
