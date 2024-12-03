import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/reviews";
import Book from "@/models/books";
import User from "@/models/users";
import UserReview from "@/models/userReviews";
import BookReview from "@/models/bookReviews";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { title, rating, desc, book, user_id } = await request.json(); 

    if (!title || !rating || !user_id) {
        return NextResponse.json(
            { error: "Title, rating, and user ID are required fields." },
            { status: 400 }
        );
    }

    if (rating < 1 || rating > 5) {
        return NextResponse.json(
            { error: "Rating must be between 1 and 5." },
            { status: 400 }
        );
    }

    try {
        await connectMongoDB();

        
        let bookEntry;
        if (book && book.title && book.author) {
            bookEntry = await Book.findOne({
                title: book.title,
                author: book.author,
            });

            if (!bookEntry) {
                bookEntry = await Book.create({
                    title: book.title,
                    author: book.author,
                    genre: book.genre || [],
                    desc: book.desc || "",
                    img_url: book.img_url || "",
                });
            }
        }

        
        const review = await Review.create({
            title,
            rating,
            desc,
            book: bookEntry ? bookEntry._id : null,
        });

        
        await UserReview.create({
            user_id: user_id, 
            review_id: review._id,
        });

        
        await BookReview.create({
            book_id: bookEntry ? bookEntry._id : null,
            review_id: review._id,
        });

        return NextResponse.json({ message: "Review, book, and user-review added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error while posting data:", error);
        return NextResponse.json(
            { error: "An error occurred while saving the data." },
            { status: 400 }
        );
    }
}



export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();

        const reviews = await Review.aggregate([
            
            {
                $lookup: {
                    from: "userReviews",  
                    localField: "_id",  
                    foreignField: "review_id",  
                    as: "userReview",
                },
            },
            
            {
                $unwind: {
                    path: "$userReview",
                    preserveNullAndEmptyArrays: true,  
                },
            },
            
            {
                $lookup: {
                    from: "users",  
                    localField: "userReview.user_id",  
                    foreignField: "_id",  
                    as: "user",  
                },
            },
            
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true, 
                },
            },
            
            {
                $lookup: {
                    from: "bookReviews", 
                    localField: "_id",  
                    foreignField: "review_id",  
                    as: "bookReview",
                },
            },
            
            {
                $unwind: {
                    path: "$bookReview",
                    preserveNullAndEmptyArrays: true, 
                },
            },
            
            {
                $lookup: {
                    from: "books", 
                    localField: "bookReview.book_id",  
                    foreignField: "_id",  
                    as: "book",  
                },
            },
            
            {
                $unwind: {
                    path: "$book",
                    preserveNullAndEmptyArrays: true,  
                },
            },
            
            {
                $project: {
                    _id: 1,
                    title: 1,  
                    rating: 1,  
                    desc: 1,  
                    upvotes: 1,
                    downvotes: 1,
                    reviewAuthor: { $ifNull: ["$user.username", "Anonymous"] },  
                    bookTitle: { $ifNull: ["$book.title", "Unknown Title"] },  
                    bookAuthor: { $ifNull: ["$book.author", "Unknown Author"] },  
                    bookImage: { $ifNull: ["$book.img_url", ""] }, 
                },
            },
        ]);

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews." }, { status: 500 });
    }
}
