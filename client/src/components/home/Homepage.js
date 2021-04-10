import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import Signup from '../common/Signup';
import '../home/Homepage.css'

const Homepage = props => {

    return (
        <div>
            <div className='main'>
                <NavBar />
                <div className="main-homepage">
                    <div className='about'>
                        <div>
                            Find and make new friends who play the same games you play.
                        </div>
                    </div>
                    <Signup />
                </div>
            </div>
        </div>
    )
}

export default Homepage;