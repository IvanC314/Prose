"use client";
import { useRouter } from "next/navigation"; 
import './Button.css';

interface ButtonProps {
    text: string;
    targetPage?: string;  // Optional targetPage since it's not always used
    onClick?: () => void;  // Add onClick prop to handle the click behavior
}

export default function Button({ text, targetPage, onClick }: ButtonProps) {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent) => {
        console.log("Button clicked, executing onClick...");

        if (onClick) {
            onClick();
        }

        // Only navigate if a targetPage is specified
        if (targetPage) {
            console.log("Navigating to:", targetPage);
            event.preventDefault(); // Prevent default behavior if we are not navigating
            router.push(targetPage);  // If targetPage is passed, navigate to it
        }
    };

    return (
        <button className="pink-button" onClick={handleClick}>
            {text}
        </button>
    );
}
