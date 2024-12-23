"use client";
import React, { useState, useEffect } from "react";
import "./WriteReview.css";
import Button from "../Shared_Components/Button";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation"; 
import { monsieurClass } from "../styles/fontSwitcher"; 

interface BookSuggestion {
    title: string;
    author_name?: string[];
    isbn?: string[];
    key?: string;
}

export default function WriteReview() {
    const { user_id, isLoggedIn } = useAuth();  
    const router = useRouter(); 

    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        author: "",
        description: "",
        reviewTitle: "",
        stars: "",
        review: "",
    });

    const [suggestions, setSuggestions] = useState<BookSuggestion[]>([]);
    const { exquisiteToggle, toggleExquisiteMode } = useAuth(); 

    
    const fontClass = exquisiteToggle ? monsieurClass : '';

    
    useEffect(() => {
        if (!isLoggedIn || !user_id) {
            alert("You must be logged in to write a review. Redirecting to login page.");
            router.push("/Login_Page");
        }
    }, [isLoggedIn, user_id, router]);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        if (id === "title" && value.length > 2) {
            fetchBookSuggestions(value);
        } else if (id === "title" && value.length <= 2) {
            setSuggestions([]);
        }
    };

   
    const fetchBookSuggestions = async (searchTerm: string) => {
        try {
            const response = await fetch(
                `https://openlibrary.org/search.json?title=${searchTerm}`
            );
            const data = await response.json();
            setSuggestions(data.docs.slice(0, 5));
        } catch (error) {
            console.error("Error fetching book suggestions:", error);
        }
    };

    
    const fetchBookDescription = async (workKey: string | undefined) => {
        if (!workKey) return "No description available.";

        try {
            const response = await fetch(`https://openlibrary.org${workKey}.json`);
            const data = await response.json();
            return data.description?.value || "No description available.";
        } catch (error) {
            console.error("Error fetching book description:", error);
            return "Error fetching description.";
        }
    };

    
    const handleSuggestionClick = async (book: BookSuggestion) => {
        const description = await fetchBookDescription(book.key);

        setFormData((prevData) => ({
            ...prevData,
            title: book.title,
            author: book.author_name ? book.author_name.join(", ") : "Unknown",
            imageUrl: book.isbn
                ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`
                : "",
            description,
        }));
        setSuggestions([]);
    };

    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        const reviewData = {
            title: formData.reviewTitle,
            rating: parseInt(formData.stars, 10),
            desc: formData.review,
            user_id, 
            book: {
                title: formData.title,
                author: formData.author,
                genre: ["Example Genre"],
                desc: formData.description,
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
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log("Review and book posted successfully!");
                setFormData({
                    title: "",
                    imageUrl: "",
                    author: "",
                    description: "",
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
            <form
                className={`page-container ${fontClass}`} 
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
            >
                <div className="form-section left-section">
                    <label htmlFor="title" className={`textboxLabel ${fontClass}`}>
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className={`textboxReview ${fontClass}`} 
                        placeholder="Enter Book Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    {suggestions.length > 0 && (
                        <ul className="suggestions-dropdown">
                            {suggestions.map((book, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(book)}
                                    className='suggestion-item' 
                                >
                                    {book.title} -{" "}
                                    {book.author_name ? book.author_name.join(", ") : "Unknown"}
                                </li>
                            ))}
                        </ul>
                    )}

                    {formData.imageUrl && (
                        <div className="image-preview">
                            <img
                                src={formData.imageUrl}
                                alt="Book Cover"
                                className="preview-image"
                            />
                        </div>
                    )}

                    <label htmlFor="author" className={`textboxLabel ${fontClass}`}>
                        Author:
                    </label>
                    <input
                        type="text"
                        id="author"
                        className={`textboxReview ${fontClass}`} 
                        placeholder="Author will appear here..."
                        value={formData.author}
                        onChange={handleChange}
                    />

                    <label htmlFor="description" className={`textboxLabel ${fontClass}`}>
                        Book Description:
                    </label>
                    <textarea
                        id="description"
                        className={`textboxReview review-box ${fontClass}`} 
                        placeholder="Book description will appear here..."
                        value={formData.description}
                        readOnly
                    ></textarea>
                </div>

                <div className="form-section right-section">
                    <label htmlFor="reviewTitle" className={`textboxLabel ${fontClass}`}>
                        Review Title:
                    </label>
                    <input
                        type="text"
                        id="reviewTitle"
                        className={`textboxReview ${fontClass}`}
                        placeholder="Enter Review Title"
                        value={formData.reviewTitle}
                        onChange={handleChange}
                    />

                    <label htmlFor="stars" className={`textboxLabel ${fontClass}`}>
                        Stars:
                    </label>
                    <input
                        type="number"
                        id="stars"
                        className={`textboxReview ${fontClass}`}
                        placeholder="Stars..."
                        value={formData.stars}
                        onChange={handleChange}
                        max="5"
                        min="1"
                    />

                    <label htmlFor="review" className={`textboxLabel ${fontClass}`}>
                        Write Review:
                    </label>
                    <textarea
                        id="review"
                        className={`textboxReview review-box-user ${fontClass}`}
                        placeholder="Write your review here..."
                        value={formData.review}
                        onChange={handleChange}
                    ></textarea>

                    <Button text="Post Review" />
                </div>
            </form>
        </div>
    );
}
