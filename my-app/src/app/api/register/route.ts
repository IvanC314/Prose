import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs"; 
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { f_name, l_name, email, username, password, confirmPassword } = await request.json();

    if (!f_name || !l_name || !email || !username || !password || !confirmPassword) {
        return NextResponse.json(
            { error: "All fields are required." },
            { status: 400 }
        );
    }

    if (password !== confirmPassword) {
        return NextResponse.json(
            { error: "Passwords do not match." },
            { status: 400 }
        );
    }

    if (password.length < 6) {
        return NextResponse.json(
            { error: "Password must be at least 6 characters." },
            { status: 400 }
        );
    }

    try {
        await connectMongoDB();

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return NextResponse.json(
                { error: "Username or email already exists." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            f_name,
            l_name,
            email,
            username,
            password: hashedPassword, 
        });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while registering user:", error);
        return NextResponse.json(
            { error: "An error occurred while registering." },
            { status: 400 }
        );
    }
}
