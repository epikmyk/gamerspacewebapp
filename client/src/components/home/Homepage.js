import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import '../home/Homepage.css'
import '../displayposts/HomeWallPosts'
import HomeWallPosts from '../displayposts/HomeWallPosts';
import WritePost from '../home/WritePost';


const Homepage = props => {

    const [user, setUser] = useState({})
    const wallPostUrl = "/api/posts/getUserPostsAndFriendsPosts"

    const getLoggedInUser = () => {
        fetch('/api/users/getLoggedInUser')
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => err)
    }

    useEffect(() => {
        getLoggedInUser();
    }, [])

    return (
        <div>
            <div className='main-homepage-root-container'>
                <NavBar />
                <div className="main-homepage-content-container">
                    <div className="homepage-feed">
                        <WritePost user={user} wallPostUrl={wallPostUrl}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
