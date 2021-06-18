import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import './PostCards.css';

const PostCards = props => {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        setListOfPosts(props.listOfPosts);
    })

    const datePosted = created => {
        
        var milliSeconds = Date.parse(created);
        const since = milliSeconds;
        var elapsed = (new Date().getTime() - since) / 1000;
        const date = new Date(Math.floor(since));
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();

        if (elapsed >= 0) {
            const diff = {};

            diff.days = Math.floor(elapsed / 86400);
            diff.hours = Math.floor(elapsed / 3600 % 24);
            diff.minutes = Math.floor(elapsed / 60 % 60);
            diff.seconds = Math.floor(elapsed % 60);

            if (diff.days > 2) {
                return month + " " + day;
            }
            else if (diff.days === 2) {
                return "yesterday"
            }
            else if (diff.days === 1) {
                return diff.days + "d";
            }
            else if (diff.days < 1 && diff.hours >= 1) {
                return diff.hours + "h";
            }
            else if (diff.days < 1 && diff.hours < 1 && diff.minutes >= 1) {
                return diff.minutes + "m";
            }
            else {
                return "just now"
            }
        }
        else {
            return "just now";
        }
    }

    const postCards = listOfPosts.map(post =>

        <div>
            <div className="post-username">
                <a href={"/profile/" + post.username}>
                    <div className="profile-pic"> <img src={post.profile_pic}></img></div>
                </a>
                <a href={"/profile/" + post.username}>
                    <p className="post-username-text">{post.username}</p>
                </a>
                <div className="post-date">
                    <p className="bullet">&#183;</p>
                    {datePosted(post.created)}
                </div>
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