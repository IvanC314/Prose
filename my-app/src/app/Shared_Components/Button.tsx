"use client";
import { useRouter } from "next/navigation"; 
import './Button.css';

interface ButtonProps {
    text: string;
    targetPage?: string; 
    onClick?: () => void; 
}

export default function Button({ text, targetPage, onClick }: ButtonProps) {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent) => {
        console.log("Button clicked, executing onClick...");

        if (onClick) {
            onClick();
        }

       
        if (targetPage) {
            console.log("Navigating to:", targetPage);
            event.preventDefault(); 
            router.push(targetPage);  
        }
    };

    return (
        <button className="pink-button" onClick={handleClick}>
            {text}
        </button>
    );
}
