"use client";

import "./Login.css";
import { IM_Fell_English_SC } from "next/font/google";
import Button from "../Shared_Components/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

const titleFont = IM_Fell_English_SC({
  subsets: ["latin"],
  weight: ["400"],
  adjustFontFallback: false,
});

export default function Login() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();

  // Debug state changes in isLoggedIn
  useEffect(() => {
    console.log("isLoggedIn state changed:", isLoggedIn);
  }, [isLoggedIn]);

  const handleSignIn = () => {
    console.log("Sign In button clicked");
    login(); // Update global auth state
    console.log("Redirecting to Home_Page...");
    router.push("/Home_Page"); // Redirect to home page
  };

  return (
    <div className="login-container">
      <h1 className={`${titleFont.className} title-login`}>Prose</h1>
      <p className="text">LOG IN</p>
      <label htmlFor="username" className="textboxLabel">
        Username:
      </label>
      <input type="text" id="username" className="textbox" placeholder="Type..." />
      <label htmlFor="password" className="textboxLabel">
        Password:
      </label>
      <input type="password" id="password" className="textbox" placeholder="Type..." />
      <p className="text">Forgot your password?</p>
      <Button text="Sign In" onClick={handleSignIn} />
      <Button text="Create an Account" targetPage="/Register_Page" />
    </div>
  );
}
