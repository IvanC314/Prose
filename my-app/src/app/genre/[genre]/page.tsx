"use client";

import { useEffect, useState } from "react";
import styles from './GenrePage.module.css';
import Header from "../../Home_Page/Header";
import ReviewCard from "../../Home_Page/ReviewCard";

import "../../Home_Page/ReviewCard.css";
import "../../Home_Page/Header.css";

export default function GenrePage({ params }: { params: Promise<{ genre: string }> }) {
  const [genre, setGenre] = useState<string>('');
  const [reviews, setReviews] = useState<any[]>([]);
  const placeholderImage = "https://m.media-amazon.com/images/I/418BtHPOsNL._SY445_SX342_.jpg"; // Placeholder image

  const formatGenre = (genre: string) => {
    const exceptions = {
      'sci-fi': 'Sci-Fi',
      'non-fiction': 'Non-Fiction',
      'young adult': 'Young Adult'
    };

    return exceptions[genre.toLowerCase()] || genre.charAt(0).toUpperCase() + genre.slice(1);
  };

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;

      if (resolvedParams?.genre) {
        setGenre(formatGenre(resolvedParams.genre));
      } else {
        setGenre('All Genres');
      }
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/genre?genre=${genre}`);
        const data = await res.json();

        console.log("Fetched genre data:", data);
        if (data.reviews) {
          setReviews(data.reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    if (genre) {
      fetchReviews();
    }
  }, [genre]);

  console.log("Formatted genre:", genre);
  console.log("Reviews state:", reviews);

  return (
    <div className={styles.genrePageContainer}>
      <Header />

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 className={styles.genreTitle}>{genre} Reviews ({reviews.length})</h1>
        <p className={styles.genreDescription}>
          Book reviews in the "{genre}" category
        </p>
      </div>

      <div className="reviews-container">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id} // Pass unique key
            id={review._id} // Review ID for navigation
            stars={"⭐".repeat(review.rating)} // Convert rating to stars
            reviewTitle={review.title} // Title of the review
            reviewAuthor={review.reviewAuthor} // Author of the review
            bookImage={review.bookImage || placeholderImage} // Ensure a valid image
            bookTitle={review.bookTitle} // Book title
            bookAuthor={review.bookAuthor} // Book author
            upvotes={review.upvotes} // Upvotes
            downvotes={review.downvotes} // Downvotes
          />
        ))}
      </div>
    </div>
  );
}
