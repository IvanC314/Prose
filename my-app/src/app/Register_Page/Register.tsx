"use client";

import './Register.css';
import { IM_Fell_English_SC } from 'next/font/google';
import Button from '../Shared_Components/Button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const titleFont = IM_Fell_English_SC({
  subsets: ['latin'],
  weight: ['400'],
  adjustFontFallback: false,
});

export default function Register() {
  const { data: session, status } = useSession();
  const [f_name, setFName] = useState('');
  const [l_name, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const router = useRouter(); 

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (session) {
      setNotification("User already logged in. Redirecting to home page...");
      const delayRedirect = setTimeout(() => {
        router.push('/');
      }, 1500); 

      return () => clearTimeout(delayRedirect);
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ f_name, l_name, email, username, password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
        alert("Registered. Redirecting to login page");
        router.push('/');
    }
  };

  return (
    <div className="register-container">
      <div className="title-container">
        <h1 className={`${titleFont.className} title-register`}>Prose</h1>
      </div>
      <p className="text-register">Register</p>

      {error && <p className="error">{error}</p>}
      {notification && <p className="notification">{notification}</p>}

      <form onSubmit={handleSubmit}>
        <div className="name-container">
          <label htmlFor="f_name" className="textboxLabel">First Name</label>
          <input
            type="text"
            id="f_name"
            className="textbox"
            placeholder="First Name"
            value={f_name}
            onChange={(e) => setFName(e.target.value)}
          />

          <label htmlFor="l_name" className="textboxLabel">Last Name</label>
          <input
            type="text"
            id="l_name"
            className="textbox"
            placeholder="Last Name"
            value={l_name}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>

        <label htmlFor="email" className="textboxLabel">Email Address</label>
        <input
          type="email"
          id="email"
          className="textbox"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username" className="textboxLabel">Username</label>
        <input
          type="text"
          id="username"
          className="textbox"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="textboxLabel">Password</label>
        <input
          type="password"
          id="password"
          className="textbox"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword" className="textboxLabel">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="textbox"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button text="Create an Account" />
      </form>
    </div>
  );
}
