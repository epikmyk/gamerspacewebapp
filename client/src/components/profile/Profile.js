import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import '../profile/Profile.css';
import Feed from "../profile/Feed";

const Profile = props => {

    return (
        <div>
            <div className='main'>
                <NavBar />
                <div className="main-profile">
                    <div className="profile-feed">
                        <Feed />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;