import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/reviews";
import Book from "@/models/books";
import User from "@/models/users";
import UserReview from "@/models/userReviews";
import BookReview from "@/models/bookReviews";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const excludedGenres = [
    "Fantasy", "Sci-Fi", "Mystery", "Non-Fiction", "Romance", "Young Adult", "Education"
  ]; 

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
      { $unwind: { path: "$book" } },
      {
        $match: {
          "book.genre": { $nin: excludedGenres },  
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
    return NextResponse.json({ error: "Failed to fetch reviews." }, { status: 400 });
  }
}
