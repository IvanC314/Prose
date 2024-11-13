/* CONSISTS OF DROPDOWN MENU, PROSE TITLE, LOGIN, REGISTER ON HOME PAGE */

import './WriteHeader.css';
/*import Button from '../Home_Page/Button';*/
import {IM_Fell_English_SC} from 'next/font/google';
import HomeButton from '../Shared_Components/HomeButton';

const titleFont = IM_Fell_English_SC({
    subsets: ['latin'],
    weight: ['400'],
    adjustFontFallback: false,
})

export default function WriteHeader() 
{
    return (
        <header >
            <div className='title-container'>
                <HomeButton/>
                <h1 className={`${titleFont.className} title`}>Prose</h1>
            </div>
        </header>
    );
};
