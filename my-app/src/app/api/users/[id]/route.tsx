import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users"; // Assuming this is the corrected path to your user model
import { NextResponse } from "next/server";

// export async function GET() {
//   const userId = "6744bf7009071684bf6f7cb9";
  
//   try {
//     await connectMongoDB();

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
//     }

//     const user = await User.findById(userId).select("email f_name l_name username"); // Fetch only required fields

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import Review from "@/models/reviews";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = "6744bf7009071684bf6f7cb9";

    await connectMongoDB();

    // Fetch all users
    const users = await User.find().select("email f_name l_name username");

    // Fetch all reviews and populate the book information
    const reviews = await Review.find()
      .populate({
        path: "book",
        select: "title author genre img_url"
      })
      .exec();

    // Combine user and review data
    const userReviewData = users.map((user) => ({
      user,
      reviews: reviews
        .filter((review) => String(review.user_id) === String(user._id)) // Match reviews with the user ID
        .map((review) => ({
          _id: review._id,
          title: review.title,
          rating: review.rating,
          desc: review.desc,
          upvotes: review.upvotes,
          downvotes: review.downvotes,
          book: review.book
            ? {
                title: review.book.title,
                author: review.book.author,
                genre: review.book.genre,
                img_url: review.book.img_url,
              }
            : null,
        })),
    }));

    return NextResponse.json(userReviewData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user and review data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
