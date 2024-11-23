/* INDIVIDUAL REVIEW CARDS THAT SHOW UP ON THE HOME SCREEN */
import './ReviewCard.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

interface ReviewCardProps {
    id: string; // Add the id prop
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

    const handleNavigate = () => {
        console.log("Navigating to review...");
        router.push(`/${id}`); // Navigate to the review page
    };

    return (
        <div className="review-container" onClick={handleNavigate}>
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
    );
}
