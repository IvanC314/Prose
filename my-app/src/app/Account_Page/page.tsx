"use client"
import React, { useEffect, useState } from "react";
import HomeHeader from "../Shared_Components/HomeHeader";
import Account from "./Account";

export default function AccountPage() {
  const [user, setUser] = useState({
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
    firstName: "",
    lastName: "",
    email: "",
    username: ""
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:3000/api/users/id");
        if (response.ok) {
          const data = await response.json();
          setUser({
            ...user,
            firstName: data.f_name,
            lastName: data.l_name,
            email: data.email,
            username: data.username,
          });
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <HomeHeader />
      <Account
        profileImage={user.profileImage}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        username={user.username}
      />
    </div>
  );
}
