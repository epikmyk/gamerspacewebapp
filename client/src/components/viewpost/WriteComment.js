import React, { useState, useEffect, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import UserContext from '../common/UserContext';
import CommentCards from './CommentCards';
import './ViewPost.css';
import './WriteComment.css';

const WriteComment = props => {

    const [image, setImage] = useState(" ");
    const [commentText, setCommentText] = useState("");
    const [loggedInUser] = useContext(UserContext);
    const [listOfComments, setListOfComments] = useState([]);

    let textAreaRef = React.createRef;

    const handleTextAreaChange = (e) => {
        e.style.height = "auto";
        e.style.height = e.scrollHeight + "px";
        checkForImage(e.value);
    }

    const checkForImage = (commentString) => {
        let checkString = commentString.match(/\.(gif|jpg|jpeg|tiff|png)/g) != null;

        if (checkString) {
            let commentWords = commentString.split("http");
            setCommentText(commentWords[0])
            setImage("http" + commentWords[commentWords.length - 1]);
        } else {
            setCommentText(commentString)
            setImage(" ")
        }
    }

    const removeImage = () => {
        setImage(" ");
        document.getElementById("post-text-area").value = commentText;
    }

    const submitComment = (e) => {
        const data = {
            comment: commentText,
            image: image,
            user_id: loggedInUser.user_id,
            post_id: props.postId
        }
        fetch('/api/comments/createComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                console.log(data);
                return fetch('/api/comments/getComments/' + props.postId)
            })
            .then(res => res.json())
            .then(res => setListOfComments(res))
            .catch((err) => {
                console.log(err);
            })

        document.getElementById("post-text-area").value = "";
        setImage(" ");
    }

    const getComments = () => {
        fetch('/api/comments/getComments/' + props.postId)
            .then(res => res.json())
            .then(res => setListOfComments(res))
            .catch(err => err);
    }

    useEffect(() => {
        getComments();
    }, [])

    return (
        <div>
            <div className="write-comment-container">
                <div className="write-post-top-container">
                    <div className="profile-pic"> <img src={loggedInUser.profile_pic}></img></div>
                    <Form className="write-post-form">
                        <Form.Group controlId="form-post" size="lg">
                            <textarea as="textarea"
                                ref={textAreaRef}
                                placeholder="Leave a comment."
                                name="post"
                                id="post-text-area"
                                onChange={(e) => handleTextAreaChange(e.target)}
                                required />
                        </Form.Group>
                    </Form>
                </div>
                {image != " " ?
                    <div className="post-image-container">
                        <Button className="remove-image-button" variant="primary" type="submit" onClick={removeImage}>X</Button>
                        <img className="write-post-image" src={image} width="90%"></img>
                    </div>
                    : null}

                <div className="write-post-bottom-container">
                    <Button className="comment-button" variant="primary" type="submit" onClick={e => submitComment(e)}>Reply</Button>
                </div>
            </div>
            <CommentCards listOfComments={listOfComments} />
        </div>
    )
}

export default WriteComment;