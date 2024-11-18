"use client"
import React, { useState } from 'react';
import './WriteReview.css';
import Button from '../Shared_Components/Button';

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log('Form Data Submitted:', formData); 
        setFormData({ 
            title: '',
            imageUrl: '', 
            author: '',
            reviewTitle: '',
            stars: '',
            review: '',
        });
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

