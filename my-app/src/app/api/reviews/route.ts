// import connectMongoDB from "@/libs/mongodb";
// import Review from "@/models/review";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//     await connectMongoDB();
//     const reviews = await Review.find(); // Fetch all reviews
//     return NextResponse.json({ reviews });
// }

// export async function POST(request: NextRequest) {
//     const { title, rating, desc } = await request.json(); // Expecting fields defined in the schema
//     if (!title || !rating) {
//         return NextResponse.json(
//             { error: "Title and rating are required fields." },
//             { status: 400 }
//         );
//     }

//     // Validate rating value
//     if (rating < 1 || rating > 5) {
//         return NextResponse.json(
//             { error: "Rating must be a number between 1 and 5." },
//             { status: 400 }
//         );
//     }

//     await connectMongoDB();
//     await Review.create({ title, rating, desc }); 
//     return NextResponse.json({ message: "Review added successfully" }, { status: 201 });
// }

import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/review";
import Book from "@/models/book";
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
