import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/reviews";  
import UserReview from "@/models/userReviews";
import BookReview from "@/models/bookReviews"; 
import Book from "@/models/books";  
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface RouteParams {
    params: { id: string };
}


export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    
    await connectMongoDB();

    const bookReview = await BookReview.findOne({ review_id: id });

    const review = await Item.findOne({ _id: id });

    const book = await Book.findOne({ _id: bookReview.book_id });

    console.log("review: " + review);
    console.log("book" + book);
    return NextResponse.json({ item: review, book }, { status: 200 });
}


export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { reviewTitle, stars, review, upvotes, downvotes } = await request.json();

    await connectMongoDB();

    const updateFields: any = {};

    
    if (reviewTitle) updateFields.title = reviewTitle;
    if (typeof stars === "number") updateFields.rating = stars;
    if (review) updateFields.desc = review;

    
    if (typeof upvotes === "number") updateFields.upvotes = upvotes;
    if (typeof downvotes === "number") updateFields.downvotes = downvotes;

    
    const updatedItem = await Item.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
    );

    if (!updatedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item updated", updatedItem }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();

    try {
        
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }

        
        const deletedUserReviews = await UserReview.deleteMany({ review_id: id });

        
        const deletedBookReviews = await BookReview.deleteMany({ review_id: id });

        
        return NextResponse.json(
            {
                message: "Review and associated references deleted",
                deletedItem,
                deletedReferences: {
                    userReviewsDeleted: deletedUserReviews.deletedCount,
                    bookReviewsDeleted: deletedBookReviews.deletedCount,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
