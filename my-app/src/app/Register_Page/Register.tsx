import './Register.css';
import {IM_Fell_English_SC} from 'next/font/google';
import Button from '../Shared_Components/Button';

const titleFont = IM_Fell_English_SC({
    subsets: ['latin'],
    weight: ['400'],
    adjustFontFallback: false,
})


export default function Register() 
{
    return (
        
        <div className='register-container'>
            <h1 className={`${titleFont.className} title-register`}>Prose</h1>
            <p className='text-register'>Register</p>

            <div className='name-container'>
                <label htmlFor="username" className="textboxLabel">First Name</label>
                <label htmlFor="username" className="textboxLabel">Last Name</label>

                <input type="text" id="username" className="textbox" placeholder="Type..." />
                <input type="text" id="username" className="textbox" placeholder="Type..." />

            </div>

            <label htmlFor="email" className="textboxLabel">Email Address</label>
            <input type="email" id="email" className="textbox" placeholder="Type..." />

            <label htmlFor="username" className="textboxLabel">Username</label>
            <input type="text" id="username" className="textbox" placeholder="Type..." />

            <label htmlFor="password" className="textboxLabel">Password</label>
            <input type="password" id="password" className="textbox" placeholder="Type..." />  

            <label htmlFor="password" className="textboxLabel">Confirm Password</label>
            <input type="password" id="password" className="textbox" placeholder="Type..." />   
                
            <Button text="Create an Account" targetPage='../Auth_Home_Page'/>
        </div>
    );
};

