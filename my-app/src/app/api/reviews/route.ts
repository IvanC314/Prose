import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/reviews";
import Book from "@/models/books";
import User from "@/models/users";
import UserReview from "@/models/userReviews";
import BookReview from "@/models/bookReviews";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { title, rating, desc, book } = await request.json(); // Expecting book info in "book" key

    if (!title || !rating) {
        return NextResponse.json(
            { error: "Title and rating are required fields." },
            { status: 400 }
        );
    }

    if (rating < 1 || rating > 5) {
        return NextResponse.json(
            { error: "Rating must be a number between 1 and 5." },
            { status: 400 }
        );
    }

    try {
        await connectMongoDB();

        // SEARCH EXISTING BOOK ELSE CREATE NEW BOOK
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

        // CREATE REVIEW
        await Review.create({
            title,
            rating,
            desc,
            book: bookEntry ? bookEntry._id : null, 
        });

        return NextResponse.json({ message: "Review and book added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error while posting data:", error);
        return NextResponse.json(
            { error: "An error occurred while saving the data." },
            { status: 500 }
        );
    }
}


export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();

        const reviews = await Review.aggregate([
            // Step 1: Link the review to the user (via userReviews)
            {
                $lookup: {
                    from: "userReviews",  // Collection name for userReviews
                    localField: "_id",  // Review's ID
                    foreignField: "review_id",  // userReviews references the review ID
                    as: "userReview",
                },
            },
            // Flatten the userReview array to get a single element
            {
                $unwind: {
                    path: "$userReview",
                    preserveNullAndEmptyArrays: true,  // Keep reviews even if no userReview exists
                },
            },
            // Step 2: Join the user details (from users)
            {
                $lookup: {
                    from: "users",  // Collection name for users
                    localField: "userReview.user_id",  // userReviews has the user_id field
                    foreignField: "_id",  // Match user _id
                    as: "user",  // Resulting user details
                },
            },
            // Flatten the user array
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,  // Keep reviews even if no user exists
                },
            },
            // Step 3: Link review to book (via bookReviews)
            {
                $lookup: {
                    from: "bookReviews",  // Linking to the bookReviews table
                    localField: "_id",  // Review's ID
                    foreignField: "review_id",  // bookReviews references the review ID
                    as: "bookReview",
                },
            },
            // Flatten the bookReview array
            {
                $unwind: {
                    path: "$bookReview",
                    preserveNullAndEmptyArrays: true,  // Keep reviews even if no bookReview exists
                },
            },
            // Step 4: Join book details (from books)
            {
                $lookup: {
                    from: "books",  // Linking to the books table
                    localField: "bookReview.book_id",  // bookReviews has the book_id field
                    foreignField: "_id",  // Match book _id
                    as: "book",  // Resulting book details
                },
            },
            // Flatten the book array
            {
                $unwind: {
                    path: "$book",
                    preserveNullAndEmptyArrays: true,  // Keep reviews even if no book exists
                },
            },
            // Step 5: Project the relevant fields (flatten the arrays from lookups)
            {
                $project: {
                    _id: 1,
                    title: 1,  // The review title
                    rating: 1,  // The review rating
                    desc: 1,  // Review description
                    upvotes: 1,
                    downvotes: 1,
                    reviewAuthor: { $ifNull: ["$user.username", "Anonymous"] },  // User first name (author of review), default to 'Anonymous' if not found
                    bookTitle: { $ifNull: ["$book.title", "Unknown Title"] },  // Book title
                    bookAuthor: { $ifNull: ["$book.author", "Unknown Author"] },  // Book author
                    bookImage: { $ifNull: ["$book.img_url", ""] },  // Book image URL, fallback to empty string
                },
            },
        ]);

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews." }, { status: 500 });
    }
}
