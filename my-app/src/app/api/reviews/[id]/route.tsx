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

export async function GET(request: NextRequest, { params }: RouteParams) {
    console.log("OOGA");
    const { id } = params;
    
    await connectMongoDB();

    // Find the bookReview document that links the review to a book
    const bookReview = await BookReview.findOne({ review_id: id });

    if (!bookReview) {
        console.log("bookreview" + bookReview);
        return null;
    }

    // Fetch the review using the review_id
    const review = await Item.findOne({ _id: id });

    if (!review) {
        console.log("review" + review);

    }

    // Fetch the book using the book_id from the bookReview document
    const book = await Book.findOne({ _id: bookReview.book_id });

    if (!book) {
        console.log("book" + book);
    }

    // Return the review and the populated book details
    console.log("review: " + review);
    console.log("book" + book);
    return NextResponse.json({ item: review, book }, { status: 200 });
}


export async function PUT (request:NextRequest, {params}: RouteParams) {
    const {id} = params;
    const { title: title, description: description, image: image } = await request.json()
    await connectMongoDB();
    Item.findByIdAndUpdate (id, { title, description, image });
    return NextResponse.json({ message: "Item updated" }, { status: 200 });
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

