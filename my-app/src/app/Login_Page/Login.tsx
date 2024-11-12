/* MAIN LOGIN COMPONENT FOR LOGIN SCREEN */

import './Login.css';
import {IM_Fell_English_SC} from 'next/font/google';
import Button from '../Home_Page/Button';

const titleFont = IM_Fell_English_SC({
    subsets: ['latin'],
    weight: ['400'],
    adjustFontFallback: false,
})


export default function Login() 
{
    return (
        
        <div className='login-container'>
            <h1 className={`${titleFont.className} title-login`}>Prose</h1>
            <p className='text'>LOG IN</p>
            <label htmlFor="username" className="textboxLabel">Username:</label>
            <input type="text" id="username" className="textbox" placeholder="Type..." />
            <label htmlFor="password" className="textboxLabel">Password:</label>
            <input type="password" id="password" className="textbox" placeholder="Type..." />            
            <p className='text'>Forgot your password?</p>
            <Button text="Sign In" targetPage='../Auth_Home_Page'/>
            <Button text="Create an Account" targetPage='../Register_Page'/>
        </div>
    );
};
