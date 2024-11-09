/* BODY THAT CONTAINS ALL THE REVIEW CARDS */

import './Reviews.css';
import {ReviewCard, ReviewCard2, ReviewCard3} from './ReviewCard';


export default function Reviews() 
{
    return (
        <div className='review-center'>
            <div className='reviews-container'>
                <ReviewCard/>
                <ReviewCard2/>
                <ReviewCard/>
                <ReviewCard3/>
                <ReviewCard2/>
                <ReviewCard/>
                <ReviewCard3/>
                <ReviewCard2/>
                <ReviewCard/>
                <ReviewCard3/>
                <ReviewCard2/>
                <ReviewCard/>
                <ReviewCard3/>
                <ReviewCard2/>
                <ReviewCard/>

            </div>
        </div>
    );
};
