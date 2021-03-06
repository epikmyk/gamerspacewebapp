import React, { useState, useEffect } from 'react';
import Signup from '../common/Signup';
import '../startup/StartupPage.css'

const StartupPage = props => {

    useEffect(() => {
        if (document.cookie.includes('cookieKey')) {
            window.location.assign('/home');
        }
    })

    return (
        <div>
            {!document.cookie.includes('cookieKey') ?
                <div className='main'>
                    <div className="main-startup-page">
                        <div className="navbar">
                            <div className="title"><img src={"images/gamerspace-logo.png"}></img> Gamerspace</div>
                            <div className="navbar-sign-in"><a href="/login">Sign In</a></div>
                        </div>
                        <div className="about">
                            <Signup />
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default StartupPage;