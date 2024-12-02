"use client";
import './WriteHeader.css';
import Button from '../Shared_Components/Button';
import { IM_Fell_English_SC } from 'next/font/google';
import HomeButton from '../Shared_Components/HomeButton';
import { monsieurClass } from "../styles/fontSwitcher"; 
import { useAuth } from "../AuthContext";
import gif from '../images/fire-writing.gif';


const titleFont = IM_Fell_English_SC({
    subsets: ['latin'],
    weight: ['400'],
    adjustFontFallback: false,
});

export default function WriteHeader() {
    const { exquisiteToggle, toggleExquisiteMode } = useAuth(); 
    const fontClass = exquisiteToggle ? monsieurClass : '';

    return (
        <header className='w-header'>
            <div className="w-title-container">
                <div className="left-section">
                    <HomeButton />
                    <h1 className={`${titleFont.className} w-title`}>Prose</h1>
                </div>
                <div className="button-container">
                    <button
                        className={`white-button`}
                        onClick={toggleExquisiteMode}
                    >
                        {exquisiteToggle ? "Disable Exquisite Writing Mode" : "Enable Exquisite Writing Mode"}
                    </button>
                    <Button text="My Reviews" targetPage="../My_Reviews_Page" />
                    <Button text="Profile" targetPage="../Account_Page" />
                </div>
            </div>

            {/* Conditional rendering of GIF in the background when exquisiteToggle is true */}
            {exquisiteToggle && (
                <div className="exquisite-gif">
                    <img src={gif.src} alt="Exquisite Mode" />
                </div>
            )}
        </header>
    );
}
