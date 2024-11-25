import './MyReviewCard.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

interface ReviewCardProps {
    id: string;
    stars: string;
    reviewTitle: string;
    reviewAuthor: string;
    bookImage: string;
    bookTitle: string;
    bookAuthor: string;
    upvotes: number;
    downvotes: number;
}

export default function ReviewCard({ id, stars, reviewTitle, reviewAuthor, bookImage, bookTitle, bookAuthor, upvotes, downvotes }: ReviewCardProps) {
    const router = useRouter();

    const ViewReview = () => {
        console.log("Navigating to review...");
        router.push(`/${id}`);
    };

    const EditReview = () => {
        console.log("Navigating to review...");
        router.push(`/Write_Review_Page`);
    };

    return (
        <div className="review-card-container">
            <div onClick={ViewReview} className="review-container">
                <p className="stars">{stars}</p>
                <p className="review-title">{reviewTitle}</p>
                <p className="review-author">{reviewAuthor}</p>
                <div className="upvote-downvote-container">
                    <div className="vote-container">
                        <button className="upvote"><FaArrowUp /></button>
                        <p>{upvotes}</p>
                    </div>
                    <div className="vote-container">
                        <button className="downvote"><FaArrowDown /></button>
                        <p>{downvotes}</p>
                    </div>
                </div>
                <Image src={bookImage} className="book-image" alt={bookTitle} width={500} height={500} />
                <p className="book-title">{bookTitle}</p>
                <p className="book-author">{bookAuthor}</p>
            </div>
            <div className="button-container">
                <button className="edit-button" onClick={EditReview}>Edit</button>
                <button className="delete-button">Delete</button>
            </div>
        </div>
    );
}
