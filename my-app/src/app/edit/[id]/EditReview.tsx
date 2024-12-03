import React, { useEffect, useState } from "react";
import HomeHeader from "../../Shared_Components/HomeHeader";
import Button from "../../Shared_Components/Button";
import "./EditReview.css";

interface ReviewData {
    id: string;
    title: string;
    imageUrl: string;
    author: string;
    description: string;
    reviewTitle: string;
    stars: string;
    review: string;
    upvotes: number;
    downvotes: number;
}

interface EditReviewProps {
    formData: ReviewData;
}

const EditReview = ({ formData }: EditReviewProps) => {
    const [form, setForm] = useState(formData);

    useEffect(() => {
        setForm(formData); 
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const dataSend = {
            reviewTitle: form.reviewTitle,
            stars: parseInt(form.stars, 10),  
            review: form.review
        };
    
        try {
            const res = await fetch(`http://localhost:3000/api/reviews/${form.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataSend),
            });
    
            if (!res.ok) {
                throw new Error("Failed to update review");
            }
    
            const data = await res.json();
            console.log("Review updated:", data);
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };
    
    

    return (
        <div>
            <div className="my-reviews-header">
                <div className="home-header">
                    <HomeHeader />
                </div>
                <div className="header-buttons">
                    <Button text="My Reviews" targetPage="../My_Reviews_Page" />
                    <Button text="Profile" targetPage="../Account_Page" />
                </div>
            </div>

            <div className="book-background">
                <form className="page-container" onSubmit={handleSubmit}  onKeyDown={handleKeyDown}>
                    <div className="form-section left-section">
                        <label htmlFor="title" className="textboxLabel">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="textboxReview"
                            placeholder="Enter Book Title"
                            defaultValue={formData.title}
                            readOnly
                        />

                        <div className="image-preview">
                            {formData.imageUrl && (
                                <img
                                    src={formData.imageUrl}
                                    alt="Book Cover"
                                    className="preview-image"
                                />
                            )}
                        </div>

                        <label htmlFor="author" className="textboxLabel">
                            Author:
                        </label>
                        <input
                            type="text"
                            id="author"
                            className="textboxReview"
                            placeholder="Author will appear here..."
                            defaultValue={formData.author}
                            readOnly
                        />

                        <label htmlFor="description" className="textboxLabel">
                            Book Description:
                        </label>
                        <textarea
                            id="description"
                            className="textboxReview review-box"
                            placeholder="Book description will appear here..."
                            defaultValue={formData.description}
                            readOnly
                        ></textarea>
                    </div>

                    <div className="form-section right-section">
                        <label htmlFor="reviewTitle" className="textboxLabel">
                            Review Title:
                        </label>
                        <input
                            type="text"
                            name="reviewTitle"
                            className="textboxReview"
                            placeholder="Enter Review Title"
                            value={form.reviewTitle}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="stars" className="textboxLabel">
                            Stars:
                        </label>
                        <input
                            type="number"
                            name="stars"
                            className="textboxReview"
                            placeholder="Stars..."
                            value={form.stars}
                            onChange={handleInputChange}
                            max={5}
                            min={1}
                        />

                        <label htmlFor="review" className="textboxLabel">
                            Write Review:
                        </label>
                        <textarea
                            name="review"
                            className="textboxReview review-box-user"
                            placeholder="Write your review here..."
                            value={form.review}
                            onChange={handleInputChange}
                        ></textarea>

                        <Button text="Save Edit"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReview;
