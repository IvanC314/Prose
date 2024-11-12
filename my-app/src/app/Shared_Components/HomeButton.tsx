import './HomeButton.css';
import { IoMdHome } from "react-icons/io";
import Link from 'next/link';

export default function GenreButton() 
{
    return (
        <Link href='../Auth_Home_Page'><IoMdHome className='home-button'/></Link>
    );
};
