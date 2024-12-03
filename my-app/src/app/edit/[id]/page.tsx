'use client';

import React, { useEffect, useState } from "react";
import EditReview from "./EditReview";

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

export default function Page({ params }: { params: { id: string } }) {
    const [formData, setFormData] = useState<ReviewData | null>(null);

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/reviews/${params.id}`, {
                    cache: 'no-store',
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch review with status: ${res.status}`);
                }

                const data = await res.json();

                
                const reviewData = {
                    id:data.item._id,
                    title: data.item.title,
                    imageUrl: data.book.img_url || '',
                    author: data.book.author || 'Unknown Author',
                    description: data.book.desc || 'No description available.',
                    reviewTitle: data.item.title,
                    stars: data.item.rating,
                    review: data.item.desc,
                    upvotes: data.item.upvotes,
                    downvotes: data.item.downvotes,
                };

                setFormData(reviewData);
            } catch (error) {
                console.error('Error fetching review data:', error);
            }
        };

        fetchReviewData();
    }, [params.id]); 

    if (!formData) {
        return <div>Loading...</div>;
    }

    return <EditReview formData={formData} />;
}
