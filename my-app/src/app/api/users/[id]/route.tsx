import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users"; // Assuming this is the corrected path to your user model
import { NextResponse } from "next/server";

export async function GET() {
  const userId = "6744bf7009071684bf6f7cb9";
  
  try {
    await connectMongoDB();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
    }

    const user = await User.findById(userId).select("email f_name l_name"); // Fetch only required fields

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
