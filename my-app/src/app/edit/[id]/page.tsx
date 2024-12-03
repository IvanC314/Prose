'use client';

import React, { useState, useEffect } from "react";
import EditReview from "./EditReview";
import { useAuth } from "../../AuthContext";
import { useRouter } from "next/navigation";

interface ReviewData {
    id: string;
    title: string;
    imageUrl: string;
    author: string;
    description: string;
    reviewTitle: string;
    reviewAuthor: string;
    stars: string;
    review: string;
    upvotes: number;
    downvotes: number;
}

export default function Page({ params }: { params: { id: string } }) {
    const [formData, setFormData] = useState<ReviewData | null>(null);
    const { isLoggedIn, username, user_id } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            console.log("User not logged in. Redirecting to login page...");
            router.push("/Login_Page");
            return;
        }

        const fetchUserReviews = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/users/${user_id}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch user reviews with status: ${res.status}`);
                }

                const data = await res.json();
                const userReviewIds = data.reviews.map((review: any) => review._id.toString());

                if (!userReviewIds.includes(params.id)) {
                    console.log("User is not the author of this review. Redirecting...");
                    router.push(`/${params.id}`);
                    return;
                }

                fetchReviewData();
            } catch (error) {
                console.error("Error fetching user reviews:", error);
                router.push(`/${params.id}`); // Redirect on error
            }
        };

        const fetchReviewData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/reviews/${params.id}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch review with status: ${res.status}`);
                }

                const data = await res.json();
                const reviewAuthor = data.item.reviewAuthor;

                // Prepare form data
                const reviewData = {
                    id: data.item._id,
                    title: data.book.title,
                    imageUrl: data.book.img_url || "",
                    author: data.book.author || "Unknown Author",
                    description: data.book.desc || "No description available.",
                    reviewTitle: data.item.title,
                    reviewAuthor: reviewAuthor, // Use fetched reviewAuthor
                    stars: data.item.rating,
                    review: data.item.desc,
                    upvotes: data.item.upvotes,
                    downvotes: data.item.downvotes,
                };

                setFormData(reviewData);
            } catch (error) {
                console.error("Error fetching review data:", error);
                router.push(`/${params.id}`); // Redirect on error
            }
        };

        fetchUserReviews();
    }, [isLoggedIn, user_id, params.id, router]);

    if (!formData) {
        return <div>Loading...</div>;
    }

    return <EditReview formData={formData} />;
}
