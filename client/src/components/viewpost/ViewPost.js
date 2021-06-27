import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../common/NavBar';
import UserContext from '../common/UserContext';
import PostCard from './PostCard';
import WriteComment from './WriteComment';

const ViewPost = props => {

    const [user] = useContext(UserContext);
    const [post, setPost] = useState({});

    const getPost = () => {
        let postId = window.location.href;
        postId = postId.split('/');
        postId = postId.pop();
        fetch('/api/posts/getPostById/' + postId)
            .then(res => res.json())
            .then(res => (setPost(res)))
            .catch(err => err);
    }

    useEffect(() => {
        getPost();
    }, [])

    return (
        <div>
            <div className='main-post-root-container'>
                <NavBar username={user.username} />
                <div className="main-post-root-content-container">
                    <div className="main-post-content-container">
                        <PostCard post={post} />
                    </div>
                </div>
                <div className="post-feed">
                    <WriteComment user={user} postId={props.match.params.postId}/>
                </div>
            </div>
        </div>
    )
}

export default ViewPost;