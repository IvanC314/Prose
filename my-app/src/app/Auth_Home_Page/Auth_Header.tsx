/* CONSISTS OF DROPDOWN MENU, PROSE TITLE, LOGIN, REGISTER ON HOME PAGE */

import './Auth_Header.css';
import Button from '../Shared_Components/Button';
import {IM_Fell_English_SC} from 'next/font/google';
import GenreButton from '../Home_Page/GenreButton';

const titleFont = IM_Fell_English_SC({
    subsets: ['latin'],
    weight: ['400'],
    adjustFontFallback: false,
})
 
export default function Auth_Header() 
{
    return (
        <header >
            <div className='title-container'>
                <GenreButton/>
                <h1 className={`${titleFont.className} title`}>Prose</h1>
            </div>

            <div>
                <Button text="Write Review" targetPage='../Write_Review_Page'/>
                <Button text="Logout" targetPage='../'/>
            </div>
        </header>
    );
};
