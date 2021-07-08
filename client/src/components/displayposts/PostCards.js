import React, { useState, useEffect, useContext } from 'react';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import UserContext from '../common/UserContext';
import DisplayDate from '../common/DisplayDate';
import './PostCards.css';

const PostCards = props => {
    const [listOfPosts, setListOfPosts] = useState(props.listOfPosts);
    const [loggedInUser] = useContext(UserContext);
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

    useEffect(() => {
        setListOfPosts(props.listOfPosts);
        props.listOfPosts.map(post => {
            setListOfLoadedLikeButtons(listOfLoadedLikeButtons => [...listOfLoadedLikeButtons, false])
        })
    }, [props.listOfPosts])

    const postCards = listOfPosts.map((post, index) =>

        <div key={index}>
            <div className="post-username">
                <a href={"/profile/" + post.username}>
                    <div className="profile-pic"> <img src={post.profile_pic}></img></div>
                </a>
                <a href={"/profile/" + post.username}>
                    <p className="post-username-text">{post.username}</p>
                </a>
                <div className="post-date">
                    <p className="bullet">&#183;</p>
                    <DisplayDate created={post.created} />
                </div>
            </div>
            <div className="post-container">
                <a href={"/post/" + post.post_id}>
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
                    <div className="comments-container">
                        <a href={"/post/" + post.post_id}>
                            <FaRegComment size={18} color={"#888888"}></FaRegComment>
                        </a>
                        <div className="comment-count">{post.comments}</div>
                        {post.comments === 1 ?
                            <div className="comment-text">Comment</div>
                            : <div className="comment-text">Comments</div>}
                    </div>
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