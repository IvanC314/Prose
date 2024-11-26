import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import BookReview from "@/models/bookReviews";
import Review from "@/models/reviews";
import User from "@/models/users";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Helper function to get the count of reviews for a given genre
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');  // Use searchParams to get the query parameter

    console.log("Received genre:", genre); // Log the genre received from the request

    if (!genre) {
        return NextResponse.json({ error: "Genre is required." }, { status: 400 });
    }

    try {
        await connectMongoDB();

        // Step 1: Find all books that belong to the specified genre
        console.log("Querying books in genre:", genre);
        const booksInGenre = await Book.find({ genre: { $in: [genre] } });

        // Log the number of books found
        console.log("Found books:", booksInGenre.length);

        // Step 2: If no books found for the genre, return 0 reviews
        if (booksInGenre.length === 0) {
            return NextResponse.json({ count: 0 });
        }

        // Step 3: Find reviews linked to these books via the bookReviews table
        const bookIds = booksInGenre.map(book => book._id);
        console.log("Querying bookReviews for bookIds:", bookIds);

        const bookReviews = await BookReview.find({ book_id: { $in: bookIds } });

        // Log the number of book reviews found
        console.log("Found book reviews:", bookReviews.length);

        // Step 4: Get the number of reviews for those books
        const reviewCount = await Review.countDocuments({
            _id: { $in: bookReviews.map(br => br.review_id) }
        });

        // Log the review count
        console.log("Review count for genre:", reviewCount);

        // Step 5: Fetch all review details including usernames and book titles
        const reviews = await Review.aggregate([
            {
                $match: {
                    _id: { $in: bookReviews.map(br => br.review_id) }
                }
            },
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
                    preserveNullAndEmptyArrays: true,
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
                    preserveNullAndEmptyArrays: true,
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
                    preserveNullAndEmptyArrays: true,
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
                    preserveNullAndEmptyArrays: true,
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
                    reviewAuthor: { $ifNull: ["$user.username", "Anonymous"] },  // User first name (author of review)
                    bookTitle: { $ifNull: ["$book.title", "Unknown Title"] },  // Book title
                    bookAuthor: { $ifNull: ["$book.author", "Unknown Author"] },  // Book author
                    bookImage: { $ifNull: ["$book.img_url", ""] },  // Book image URL, fallback to empty string
                },
            },
        ]);

        // Log the reviews data to inspect the details
        console.log("Reviews with user info and book titles:", reviews);

        // Return the count of reviews for the genre
        return NextResponse.json({ count: reviewCount, reviews });
    } catch (error) {
        console.error("Error fetching genre review count:", error);
        return NextResponse.json({ error: "Failed to fetch review count." }, { status: 500 });
    }
}
