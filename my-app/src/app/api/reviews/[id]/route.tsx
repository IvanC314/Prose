import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/reviews";  // Review model
import BookReview from "@/models/bookReviews";  // The linking model between books and reviews
import Book from "@/models/books";  // Book model
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface RouteParams {
    params: { id: string };
}

// RETURNS BOOK AND REVIEW DATA
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


// export async function PUT (request:NextRequest, {params}: RouteParams) {
//     const {id} = params;
//     const { title: title, description: description, image: image } = await request.json()
//     await connectMongoDB();
//     Item.findByIdAndUpdate (id, { title, description, image });
//     return NextResponse.json({ message: "Item updated" }, { status: 200 });
// }

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { upvotes, downvotes } = await request.json();

    await connectMongoDB();

    const updateFields: any = {};
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



export async function DELETE (request: NextRequest, {params}: RouteParams) { 
    const {id} = params;
    if (!mongoose. Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" },{ status: 400 });
    }
    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}

