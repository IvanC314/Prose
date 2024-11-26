"use client";

import "./Login.css";
import { IM_Fell_English_SC } from "next/font/google";
import Button from "../Shared_Components/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import { useState } from "react";

const titleFont = IM_Fell_English_SC({
  subsets: ["latin"],
  weight: ["400"],
  adjustFontFallback: false,
});

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

    // Assuming the API returns `username` and `user_id` after successful login
    const { username: returnedUsername, user_id } = data;

    login(returnedUsername, user_id); // Update auth context with username and user_id

    // Debugging log to print out username and user_id
    console.log("Login successful!");
    console.log("Username:", returnedUsername);
    console.log("User ID:", user_id);

    router.push("/Home_Page"); // Redirect to home page
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

        <p className="text">Forgot your password?</p>
        <Button text="Sign In" />
      </form>

      <Button text="Create an Account" targetPage="/Register_Page" />
    </div>
  );
}
