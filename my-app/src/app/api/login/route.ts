import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password fields are required." },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 400 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 400 }
            );
        }

<<<<<<< Updated upstream
=======
        
>>>>>>> Stashed changes
        return NextResponse.json(
            { message: "Login successful.", username: user.username, user_id: user._id },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { error: "An error occurred during login." },
            { status: 400 }
        );
    }
}
