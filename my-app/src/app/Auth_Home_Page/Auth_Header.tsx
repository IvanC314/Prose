"use client";

import React, { useState } from 'react'; 
import './Auth_Header.css'; 
import Button from '../Shared_Components/Button'; 
import { IM_Fell_English_SC } from 'next/font/google'; 
import GenreButton from '../Home_Page/GenreButton';
import Link from 'next/link';

const titleFont = IM_Fell_English_SC({
  subsets: ['latin'],
  weight: ['400'],
  adjustFontFallback: false,
});

export default function Auth_Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  
  const genres = [
    'Fantasy',
    'Sci-Fi',
    'Mystery',
    'Non-Fiction',
    'Romance',
    'Young Adult',
    'Education',
    'Other',
  ];

  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      
      <div className="title-container">
        <div onClick={toggleDropdown}>
          <GenreButton /> 
        </div>
        <h1 className={`${titleFont.className} title`}>Prose</h1>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          {genres.map((genre, index) => (
            <Link href={`/genre/${genre}`} key={index}>
              <div className="dropdown-item">{genre}</div>
            </Link>
          ))}
        </div>
      )}

      <div>
        <Button text="Write Review" targetPage="../Write_Review_Page" />
        <Button text="Logout" targetPage="../" />
      </div>
    </header>
  );
}
