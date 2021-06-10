import React, { useState, useEffect } from 'react';
import './WritePost.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'
import HomeWallPosts from '../displayposts/HomeWallPosts';
var isPosted = false;

const WritePost = props => {

    const [image, setImage] = useState(" ");
    const [postText, setPostText] = useState("");
    const [user, setUser] = useState({});
    const [listOfHomeWallPosts, setListOfHomeWallPosts] = useState([]);

    let textAreaRef = React.createRef;

    const getHomeWallPosts = () => {
        fetch('/api/posts/getUserPostsAndFriendsPosts')
            .then(res => res.json())
            .then(res => setListOfHomeWallPosts(res))
            .catch(err => err);
    }

    useEffect(() => {
        setUser(props.user);
    })

    useEffect(() => {
        getHomeWallPosts();
    }, [])

    const handleTextAreaChange = (e) => {
        e.style.height = "auto";
        e.style.height = e.scrollHeight + "px";
        checkForImage(e.value)
    }

    const checkForImage = (postString) => {
        let checkString = postString.match(/\.(gif|jpg|jpeg|tiff|png)/g) != null;

        if (checkString) {
            let postWords = postString.split("http");
            setPostText(postWords[0])
            setImage("http" + postWords[postWords.length - 1]);
        } else {
            setPostText(postString)
            setImage(" ")
        }
    }

    const submitPost = (e) => {
        const data = {
            post: postText,
            image: image,
            user_receiver_id: user.user_id
        }
        fetch('/api/posts/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                console.log(data);
                return fetch('/api/posts/getUserPostsAndFriendsPosts')
            })
            .then(res => res.json())
            .then(res => setListOfHomeWallPosts(res))
            .catch((err) => {
                console.log(err);
            })

        document.getElementById("post-text-area").value = "";
    }

    return (
        <div>
            <div className="write-post-container">
                <div className="write-post-top-container">
                    <div className="profile-pic"> <FaUserCircle size={32} color={"#293E4A"}></FaUserCircle></div>
                    <Form className="write-post-form">
                        <Form.Group controlId="form-post" size="lg">
                            <textarea as="textarea"
                                ref={textAreaRef}
                                placeholder="Have something to say?"
                                name="post"
                                id="post-text-area"
                                onChange={(e) => handleTextAreaChange(e.target)}
                                required />
                        </Form.Group>
                    </Form>
                </div>
                <div className="post-image-container">
                    {image != " " ?
                        <img className="post-image" src={image} width="90%"></img>
                        : null}
                </div>
                <div className="write-post-bottom-container">
                    <Button className="post-button" variant="primary" type="submit" onClick={e => submitPost(e)}>Post</Button>
                </div>
            </div>
            <hr className="write-post-seperator"></hr>
            <div><HomeWallPosts listOfHomeWallPosts={listOfHomeWallPosts} /></div>
        </div>
    )
}

export default WritePost;