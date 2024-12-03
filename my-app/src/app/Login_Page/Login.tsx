"use client";

import { IM_Fell_English_SC } from "next/font/google";
import Button from "../Shared_Components/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import "./Login.css";

const titleFont = IM_Fell_English_SC({
    subsets: ["latin"],
    weight: ["400"],
    adjustFontFallback: false,
});

export default function Login() {
    const router = useRouter();
    const { isLoggedIn, user_id, login } = useAuth();  // Destructure isLoggedIn and user_id from context

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isLoggedIn && user_id) {
            alert("Logged in. Redirecting to home page.");
            router.push("/");
        }
    }, [isLoggedIn, user_id, router]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error || "Invalid login credentials.");
            return;
        }

        const { username: returnedUsername, user_id } = data;

        const result = await signIn("credentials", {
            redirect: false,
            username: returnedUsername,
            password,
        });

        if (result?.error) {
            setError("Login failed. Please try again.");
            return;
        }

        login(returnedUsername, user_id);
        router.push("/"); 
    };

    return (
        <div className="login-container">
            <h1 className={`${titleFont.className} title-login`}>Prose</h1>
            <p className="text">LOG IN</p>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSignIn}>

                <label htmlFor="username" className="textboxLabel">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    className="textbox"
                    placeholder="Type..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password" className="textboxLabel">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    className="textbox"
                    placeholder="Type..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="forgot-button">Forgot your password?</button>
                <div></div>
                <Button text="Sign In" />
            </form>

            <Button text="Create an Account" targetPage="/Register_Page" />
        </div>
    );
}
