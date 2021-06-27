import React, { useState, useEffect } from 'react';
import './CommentCards.css'

const CommentCards = props => {

    const [listOfComments, setListOfComments] = useState(props.listOfComments);

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
                    {datePosted(comment.created)}
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