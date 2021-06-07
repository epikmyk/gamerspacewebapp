import React, { useState, useEffect } from 'react';
import PostCards from './PostCards';

const HomeWallPosts = props => {
    const [listOfHomeWallPosts, setListOfHomeWallPosts] = useState([]);

    const getHomeWallPosts = () => {
        fetch('/api/posts/getUserPostsAndFriendsPosts')
            .then(res => res.json())
            .then(res => setListOfHomeWallPosts(res))
            .catch(err => err);
    }

    useEffect(() => {
        getHomeWallPosts();
    }, [])

    return (
        <>
            <div className="posts">
                <PostCards listOfPosts={listOfHomeWallPosts} />
            </div>
        </>
    )
}

export default HomeWallPosts;