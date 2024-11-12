/* CONSISTS OF DROPDOWN MENU, PROSE TITLE, LOGIN, REGISTER ON HOME PAGE */

import './HomeButton.css';
import Link from 'next/link';

export default function HomeButton() 
{
    return (
        <h1 className='home-button'><Link href='../'>Login</Link></h1>
    );
};