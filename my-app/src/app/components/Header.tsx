/* CONSISTS OF DROPDOWN MENU, PROSE TITLE, LOGIN, REGISTER ON HOME PAGE */

import './Header.css';
import Login from './Login';
import Register from './Register';
import {IM_Fell_English_SC} from 'next/font/google';
import GenreButton from './GenreButton';

const titleFont = IM_Fell_English_SC({
    subsets: ['latin'],
    weight: ['400'],
    adjustFontFallback: false,
})

export default function Header() 
{
    return (
        <header >
            <div className='title-container'>
                <GenreButton/>
                <h1 className={`${titleFont.className} title`}>Prose</h1>
            </div>

            <div>
                <Login/>
                <Register/>
            </div>
        </header>
    );
};
