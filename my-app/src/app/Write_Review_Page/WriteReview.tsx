"use client"
import React, { useState } from 'react';
import './WriteReview.css';
import Button from '../Shared_Components/Button';

import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/review";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export default function WriteReview() {
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        author: '',
        reviewTitle: '',
        stars: '',
        review: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // STOP SUBMITTING IF ENTER IS PRESSED
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
        }
    };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault(); 
    //     console.log('Form Data Submitted:', formData); 
    
    //     const dataToPost = {
    //         title: formData.title,
    //         rating: parseInt(formData.stars, 10), 
    //         desc: formData.review, 
    //         upvotes: 0,
    //         downvotes: 0, 
    //     };
    
    //     // Input validation
    //     if (!dataToPost.title || !dataToPost.rating || isNaN(dataToPost.rating)) {
    //         console.error("Title and a valid numeric rating are required.");
    //         return;
    //     }
    
    //     if (dataToPost.rating < 1 || dataToPost.rating > 5) {
    //         console.error("Rating must be between 1 and 5.");
    //         return;
    //     }
    
    //     try {
    //         // SEND REVIEW TO DATABASE
    //         const response = await fetch('/api/reviews', {
    //             method: 'POST',
    //             body: JSON.stringify(dataToPost),
    //         });
    
    //         // CLEAR FORMS AFTER SUBMISSION
    //         if (response.ok) {
    //             console.log('Review posted successfully!');
    //             setFormData({
    //                 title: '',
    //                 imageUrl: '',
    //                 author: '',
    //                 reviewTitle: '',
    //                 stars: '',
    //                 review: '',
    //             }); 
    //         } else {
    //             console.error('Failed to post review:', await response.json());
    //         }
    //     } catch (error) {
    //         console.error('Error while posting review:', error);
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    
        const reviewData = {
            title: formData.reviewTitle,
            rating: parseInt(formData.stars, 10),
            desc: formData.review,
            book: {
                title: formData.title,
                author: formData.author,
                genre: ["Example Genre"], 
                desc: formData.review, 
                img_url: formData.imageUrl,
            },
        };
    
        if (!reviewData.title || !reviewData.rating || isNaN(reviewData.rating)) {
            console.error("Review title and a valid numeric rating are required.");
            return;
        }
    
        if (reviewData.rating < 1 || reviewData.rating > 5) {
            console.error("Rating must be between 1 and 5.");
            return;
        }
    
        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                body: JSON.stringify(reviewData),
            });
    
            if (response.ok) {
                console.log("Review and book posted successfully!");
                setFormData({
                    title: "",
                    imageUrl: "",
                    author: "",
                    reviewTitle: "",
                    stars: "",
                    review: "",
                });
            } else {
                console.error("Failed to post review:", await response.json());
            }
        } catch (error) {
            console.error("Error while posting review:", error);
        }
    };
    
    

    return (
        <div className="book-background">
            <form className="page-container" onSubmit={handleSubmit} onKeyDown={handleKeyDown}
            >
                <div className="form-section left-section">
                    <label htmlFor="title" className="textboxLabel">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="textboxReview"
                        placeholder="Enter Book Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <label htmlFor="imageUrl" className="textboxLabel">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="textboxReview"
                        placeholder="Enter Image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />

                    <label htmlFor="author" className="textboxLabel">Author:</label>
                    <input
                        type="text"
                        id="author"
                        className="textboxReview"
                        placeholder="Enter Author Name"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-section right-section">
                    <label htmlFor="reviewTitle" className="textboxLabel">Review Title:</label>
                    <input
                        type="text"
                        id="reviewTitle"
                        className="textboxReview"
                        placeholder="Enter Review Title"
                        value={formData.reviewTitle}
                        onChange={handleChange}
                    />

                    <label htmlFor="stars" className="textboxLabel">Stars:</label>
                    <input
                        type="text"
                        id="stars"
                        className="textboxReview"
                        placeholder="Stars..."
                        value={formData.stars}
                        onChange={handleChange}
                    />

                    <label htmlFor="review" className="textboxLabel">Write Review:</label>
                    <textarea
                        id="review"
                        className="textboxReview review-box"
                        placeholder="Write your review here..."
                        value={formData.review}
                        onChange={handleChange}
                    ></textarea>

                    <Button text="Post Review" targetPage="../Auth_Home_Page"/>
                </div>
            </form>
        </div>
    );
}

