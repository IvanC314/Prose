import './HomeHeader.css';
import Button from './Button';
import {IM_Fell_English_SC} from 'next/font/google';
import HomeButton from './HomeButton';

const titleFont = IM_Fell_English_SC({
    subsets: ['latin'],
    weight: ['400'],
    adjustFontFallback: false,
})

export default function HomeHeader() 
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
