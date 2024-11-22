import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/reviews";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";


interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, {params }: RouteParams){
    const {id} = params;
    await connectMongoDB();
    const item = await Item.findOne({ _id: id });
    return NextResponse.json({ item }, { status: 200 });
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