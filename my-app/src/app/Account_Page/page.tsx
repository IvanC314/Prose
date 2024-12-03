"use client"
import React, { useEffect, useState } from "react";
import HomeHeader from "../Shared_Components/HomeHeader";
import Account from "./Account";
import { useAuth } from "@/app/AuthContext";

export default function AccountPage() {
    const { user_id, isLoggedIn } = useAuth(); 
    const [user, setUser] = useState({
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    });

    async function fetchUser(user_id: string) {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${user_id}`);
            if (response.ok) {
                const data = await response.json();
                const userData = data.user;
                setUser({
                    profileImage: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
                    firstName: userData.f_name,
                    lastName: userData.l_name,
                    email: userData.email,
                    username: userData.username,
                });
            } else {
                console.error("Failed to fetch user:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        if (isLoggedIn && user_id) {
            fetchUser(user_id); 
        }
    }, [isLoggedIn, user_id]);  

    return (
        <div>
            <HomeHeader />
            <Account
                userId={user_id}
                profileImage={user.profileImage}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                username={user.username}
            />
        </div>
    );
}
