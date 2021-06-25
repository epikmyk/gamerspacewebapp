import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../common/NavBar';
import UserContext from '../common/UserContext';
import FriendsCards from '../displayfriends/FriendsCards';
import './Friends.css'

const Friends = props => {

    const [user, setUser] = useContext(UserContext);

    return (
        <div>
            <div className='main-friends-root-container'>
                <NavBar username={user.username} />
                <div className="main-friends-root-content-container">
                    <div className="main-friends-content-container">
                        <div><FriendsCards user={user}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends;