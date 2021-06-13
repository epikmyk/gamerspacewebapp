import React, { useState, useEffect } from 'react';
import './WritePost.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'
import HomeWallPosts from '../displayposts/HomeWallPosts';

const WritePost = props => {

    const [image, setImage] = useState(" ");
    const [postText, setPostText] = useState("");
    const [user, setUser] = useState({});
    const [listOfWallPosts, setListOfWallPosts] = useState([]);
    const [wallPostUrl, setWallPostUrl] = useState("");

    let textAreaRef = React.createRef;

    const getWallPosts = () => {
        fetch(wallPostUrl)
            .then(res => res.json())
            .then(res => setListOfWallPosts(res))
            .catch(err => err);
    }

    useEffect(() => {
        setUser(props.user);
        setWallPostUrl(props.wallPostUrl);
        console.log(wallPostUrl)
    })

    useEffect(() => {
        getWallPosts();
    }, [wallPostUrl, user])

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

    const removeImage = () => {
        setImage(" ");
        console.log(document.getElementById("post-text-area").value = postText)
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
                return fetch(wallPostUrl)
            })
            .then(res => res.json())
            .then(res => setListOfWallPosts(res))
            .catch((err) => {
                console.log(err);
            })

        document.getElementById("post-text-area").value = "";
        setImage(" ");
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

                {image != " " ?
                    <div className="post-image-container">
                        <Button className="remove-image-button" variant="primary" type="submit" onClick={removeImage}>X</Button>
                        <img className="write-post-image" src={image} width="90%"></img>
                    </div>
                    : null}

                <div className="write-post-bottom-container">
                    <Button className="post-button" variant="primary" type="submit" onClick={e => submitPost(e)}>Post</Button>
                </div>
            </div>
            <hr className="write-post-seperator"></hr>
            <div><HomeWallPosts listOfHomeWallPosts={listOfWallPosts} /></div>
        </div>
    )
}

export default WritePost;