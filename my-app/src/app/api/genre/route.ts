import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import BookReview from "@/models/bookReviews";
import Review from "@/models/reviews";
import User from "@/models/users";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre'); 

    console.log("Received genre:", genre); 

    if (!genre) {
        return NextResponse.json({ error: "Genre is required." }, { status: 400 });
    }

    try {
        await connectMongoDB();

        
        console.log("Querying books in genre:", genre);
        const booksInGenre = await Book.find({ genre: { $in: [genre] } });

        
        console.log("Found books:", booksInGenre.length);

        
        if (booksInGenre.length === 0) {
            return NextResponse.json({ count: 0 });
        }

        const bookIds = booksInGenre.map(book => book._id);
        console.log("Querying bookReviews for bookIds:", bookIds);

        const bookReviews = await BookReview.find({ book_id: { $in: bookIds } });

        
        console.log("Found book reviews:", bookReviews.length);

        
        const reviewCount = await Review.countDocuments({
            _id: { $in: bookReviews.map(br => br.review_id) }
        });

        console.log("Review count for genre:", reviewCount);

        const reviews = await Review.aggregate([
            {
                $match: {
                    _id: { $in: bookReviews.map(br => br.review_id) }
                }
            },

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

        
        console.log("Reviews with user info and book titles:", reviews);

       
        return NextResponse.json({ count: reviewCount, reviews });
    } catch (error) {
        console.error("Error fetching genre review count:", error);
        return NextResponse.json({ error: "Failed to fetch review count." }, { status: 500 });
    }
}
