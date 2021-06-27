import React, { useState, useEffect } from 'react';
import DisplayDate from '../common/DisplayDate';
import './CommentCards.css'

const CommentCards = props => {

    const [listOfComments, setListOfComments] = useState(props.listOfComments);

    useEffect(() => {
        setListOfComments(props.listOfComments);
    }, [props.listOfComments])

    const commentCards = listOfComments.map(comment =>
        <div className="comment-card-container">
            <div className="post-username">
                <a href={"/profile/" + comment.username}>
                    <div className="profile-pic"> <img src={comment.profile_pic}></img></div>
                </a>
                <a href={"/profile/" + comment.username}>
                    <p className="post-username-text">{comment.username}</p>
                </a>
                <div className="post-date">
                    <p className="bullet">&#183;</p>
                    <DisplayDate created={comment.created}/>
                </div>
            </div>
            <div className="post-container">
                <div className="post-text">
                    {comment.comment}
                </div>
                {comment.image !== ' ' ?
                    <div className="post-image"><img src={comment.image} width="360"></img></div>
                    : null}
            </div>
        </div>
    )

    return (
        <>
            {commentCards}
        </>
    )
}

export default CommentCards;