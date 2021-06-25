import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FaUserCircle, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import UserContext from '../common/UserContext';
import './PostCards.css';

const PostCards = props => {
    const [listOfPosts, setListOfPosts] = useState(props.listOfPosts);
    const [loggedInUser] = useContext(UserContext);
    const [wallPostUrl, setWallPostUrl] = useState(props.wallPostUrl)
    const [listOfLikes, setListOfLikes] = useState([]);
    const [listOfLoadedLikeButtons, setListOfLoadedLikeButtons] = useState([]);

    const likePost = (post, index) => {

        listOfLoadedLikeButtons[index] = true;

        const data = {
            like_post: 0,
            user_id: loggedInUser.user_id,
            post_id: post.post_id
        }
        fetch('/api/likes/createLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                return fetch(props.wallPostUrl)
            })
            .then(res => res.json())
            .then(res => setListOfPosts(res))
            .catch(err => err);
    }

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

            if (diff.days > 1) {
                return month + " " + day;
            }
            else if (diff.days === 1) {
                return "yesterday"
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

    useEffect(() => {
        setListOfPosts(props.listOfPosts);
        props.listOfPosts.map(post => {
            setListOfLoadedLikeButtons(listOfLoadedLikeButtons => [...listOfLoadedLikeButtons, false])
        })
    }, [props.listOfPosts])

    const postCards = listOfPosts.map((post, index) =>

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
                    <div className="likes-container">
                        {post.like_post === 1 ?
                            <div>
                                {listOfLoadedLikeButtons[index] ?
                                    <a onClick={() => likePost(post, index)}><FaHeart className="red-heart" size={18} color={"#C41E3A"}></FaHeart></a>
                                    : <a onClick={() => likePost(post, index)}><FaHeart size={18} color={"#C41E3A"}></FaHeart></a>}
                            </div>

                            : <a onClick={() => likePost(post, index)}><FaRegHeart className="heart-outline" size={18} color={"#888888"}></FaRegHeart></a>}
                        <div className="like-count">{post.likes}</div>
                        {post.likes === 1 ?
                            <div className="like-text">like</div>
                            : <div className="like-text">likes</div>}</div>
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