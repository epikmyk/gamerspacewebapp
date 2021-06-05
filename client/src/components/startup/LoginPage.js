import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import Login from '../common/Login';
import '../startup/StartupPage.css'

const LoginPage = props => {

    return (
        <div>
            <div className='main'>
                <div className="main-homepage">
                    <div className="navbar">
                        <div className="title"><img src={"images/gamerspace-logo.png"}></img> Gamerspace</div>
                        <div className="navbar-sign-in"><a href="/">Sign Up</a></div>
                    </div>
                    <div className="about">
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;