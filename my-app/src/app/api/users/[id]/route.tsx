
import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import Review from "@/models/reviews";
import UserReview from "@/models/userReviews";
import BookReview from "@/models/bookReviews";
import Book from "@/models/books";
import { NextRequest, NextResponse } from "next/server";
import { useAuth } from "@/app/AuthContext";
import bcrypt from "bcryptjs";


interface RouteParams {
    params: { id: string };
}

// RETURNS BOOK AND REVIEW DATA
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const userId = id;
    try {
        await connectMongoDB();

        // Validate the userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
        }

        // Fetch the user details
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch all userReviews that match the userId
        const userReviews = await UserReview.find({ user_id: userId }).select("review_id");

        if (!userReviews.length) {
            return NextResponse.json({
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    f_name: user.f_name,
                    l_name: user.l_name,
                },
                reviews: [],
            }, { status: 200 });
        }

        // Extract review IDs from userReviews
        const reviewIds = userReviews.map((ur) => ur.review_id);

        // Fetch bookReview documents to get book IDs for the review IDs
        const bookReviews = await BookReview.find({ review_id: { $in: reviewIds } }).select("book_id review_id");

        const bookIdMap = new Map(); // Map to associate review_id -> book_id
        bookReviews.forEach((br) => {
            bookIdMap.set(br.review_id.toString(), br.book_id);
        });

        // Fetch reviews for the extracted IDs
        const reviews = await Review.find({ _id: { $in: reviewIds } }).exec();

        // Fetch books for the extracted book IDs
        const bookIds = Array.from(bookIdMap.values());
        const books = await Book.find({ _id: { $in: bookIds } }).select("title author genre img_url").exec();

        const bookDataMap = new Map(); // Map to associate book_id -> book data
        books.forEach((book) => {
            bookDataMap.set(book._id.toString(), book);
        });

        // Construct the response object
        const userReviewData = {
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                f_name: user.f_name,
                l_name: user.l_name,
            },
            reviews: reviews.map((review) => {
                const bookId = bookIdMap.get(review._id.toString());
                const book = bookDataMap.get(bookId?.toString());

                return {
                    _id: review._id,
                    title: review.title,
                    rating: review.rating,
                    desc: review.desc,
                    upvotes: review.upvotes,
                    downvotes: review.downvotes,
                    book: book || null,
                };
            }),
        };

        return NextResponse.json(userReviewData, { status: 200 });
    } catch (error) {
        console.error("Error fetching user and review data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { currentPassword, newPassword } = await request.json();

    try {
        await connectMongoDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
        }

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "New password must be at least 6 characters long" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
