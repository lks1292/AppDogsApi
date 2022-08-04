import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/LandingPage.css'

export default function LandingPage(){
    return (
       
        <div className="landing-page">
        
           <div className="landing-page-text">

            <Link to='/home'>
                <button className='buttonHome'>Home</button>
            </Link>
            </div>    
        </div>
    )
}