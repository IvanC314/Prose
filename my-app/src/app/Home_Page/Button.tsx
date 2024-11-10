/* REGISTER BUTTON TO GO TO REGISTER PAGE */
"use client"
import { useRouter } from 'next/navigation'; 
import './Button.css';

interface ButtonProps {
    text: string;
    targetPage: string;
}

export default function Button({text, targetPage}: ButtonProps) 
{
    const router = useRouter();

    const handleClick = () => {
        router.push(targetPage); 
    };

    return (
        <button className="pink-button" onClick={handleClick}>
            {text}
        </button>
    );
};
