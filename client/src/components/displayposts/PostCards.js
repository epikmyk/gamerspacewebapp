import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import './PostCards.css';

const PostCards = props => {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        setListOfPosts(props.listOfPosts);
    })

    const postCards = listOfPosts.map(post =>

        <div>
            <div className="post-username">
                <a href={"/profile/" + post.username}>
                    <FaUserCircle size={32} color={"#293E4A"}></FaUserCircle> {post.username}
                </a>
            </div>
            <div className="post-container">
                <a href="#">
                    <div className="post-text">
                        {post.post}
                    </div>
                    {post.image !== ' ' ?
                        <div className="post-image"><img src={post.image} width="360"></img></div>
                        : null}
                </a>
            </div>
            <div className="post-stats-container">
                <div className="num-of-comments">
                    <p><FaRegComment size={18} color={"#888888"}></FaRegComment> 0 Comments</p>
                </div>
                <div className="num-of-likes">
                    <p><FaRegHeart size={18} color={"#888888"}></FaRegHeart> 0 Likes</p>
                </div>
            </div>
            <hr className="post-seperator"></hr>
        </div>
    )

    return (
        <>
            {postCards}
        </>
    )
}

export default PostCards;