"use client";
import React, { useState } from "react";
import "./ViewReview.css";
import book from "../images/OpenBook2.png";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

interface ViewReviewProps {
    stars: string;
    reviewTitle: string;
    reviewText: string;
    bookImage: string;
    bookTitle: string;
    bookAuthor: string;
    bookDesc: string;
    upvotes: number;
    downvotes: number;
    reviewId: string;
}

export default function ViewReview({
    stars,
    reviewTitle,
    reviewText,
    bookImage,
    bookTitle,
    bookAuthor,
    bookDesc,
    upvotes,
    downvotes,
    reviewId,
}: ViewReviewProps) {
    const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
    const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);

    const handleVote = async (type: "upvote" | "downvote") => {
        const newValue =
            type === "upvote" ? currentUpvotes + 1 : currentDownvotes + 1;

        const endpoint = type === "upvote" ? "upvotes" : "downvotes";

        try {
            const res = await fetch(`/api/reviews/${reviewId}`, {
                method: "PUT",
                body: JSON.stringify({ [endpoint]: newValue }),
            });

            if (res.ok) {
                if (type === "upvote") setCurrentUpvotes(newValue);
                else setCurrentDownvotes(newValue);
            } else {
                console.error("Failed to update vote count.");
            }
        } catch (err) {
            console.error("Error updating vote count:", err);
        }
    };

    return (
        <div>
            <div className="view-voting-wrapper">
                <button
                    className="view-upvote-button"
                    onClick={() => handleVote("upvote")}
                >
                    <FaArrowUp className="upvote" />
                    {currentUpvotes}
                </button>

                <button
                    className="view-downvote-button"
                    onClick={() => handleVote("downvote")}
                >
                    <FaArrowDown className="downvote" />
                    {currentDownvotes}
                </button>
            </div>

            <div className="view-page-wrapper">
                <img
                    src={book.src}
                    alt="Book background"
                    className="view-background-image"
                />
                <div className="view-content">
                    <form className="view-page-container">
                        <div className="view-form-section view-left-section">
                            <p>
                                <strong>Book:</strong> {bookTitle}
                            </p>
                            <img
                                src={bookImage}
                                alt={bookTitle}
                                className="view-book-image"
                            />
                            <p>
                                <strong>Author:</strong> {bookAuthor}
                            </p>
                            <p className="text-align-left">
                                <strong>Description:</strong> {bookDesc}
                            </p>
                        </div>

                        <div className="view-form-section view-right-section">
                            <p>
                                <strong> "{reviewTitle}"</strong>
                            </p>
                            <p>
                                <strong> {stars}</strong>
                            </p>
                            <p className="text-align-left">
                                <strong>Review:</strong> {reviewText}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
