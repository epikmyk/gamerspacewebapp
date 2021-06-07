import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import '../home/Homepage.css'
import '../displayposts/HomeWallPosts'
import HomeWallPosts from '../displayposts/HomeWallPosts';

const Homepage = props => {

    return (
        <div>
            <div className='main-homepage-root-container'>
                <NavBar />
                <div className="main-homepage-content-container">
                    <div className="homepage-feed">
                        <HomeWallPosts />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
