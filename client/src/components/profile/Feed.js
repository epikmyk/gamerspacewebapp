import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import '../profile/Feed.css';
import Post from "../profile/Post";

const Feed = props => {

    return (
        <div>
            <div className="main-feed">
                <Post />
            </div>
        </div>

    )
}

export default Feed;