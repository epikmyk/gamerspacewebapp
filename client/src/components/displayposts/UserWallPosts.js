import React, { useState, useEffect } from 'react';
import PostCards from './PostCards';

const UserWallPosts = props => {
    const [listOfUserWallPosts, setListOfUserWallPosts] = useState([]);
    const [username, setUsername] = useState('')

    const getUserWallPosts = () => {
        console.log(username);
        fetch('/api/posts/getRecentPostsToUser/' + username)
            .then(res => res.json())
            .then(res => setListOfUserWallPosts(res))
            .catch(err => err);
    }

    useEffect(() => {
        setUsername(props.username);
        getUserWallPosts();
    }, [username], [])

    return (
        <>
            <div className="posts">
                <PostCards listOfPosts={listOfUserWallPosts} />
            </div>
        </>
    )
}

export default UserWallPosts;