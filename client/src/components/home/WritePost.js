import React, { useState, useEffect, useContext } from 'react';
import './WritePost.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'
import HomeWallPosts from '../displayposts/HomeWallPosts';
import UserContext from '../common/UserContext';

const WritePost = props => {

    const [image, setImage] = useState(" ");
    const [postText, setPostText] = useState("");
    const [user, setUser] = useState({});
    const [loggedInUser] = useContext(UserContext)
    const [listOfWallPosts, setListOfWallPosts] = useState([]);
    const [wallPostUrl, setWallPostUrl] = useState("");
    const [friendStatus, setFriendStatus] = useState();
    const [url, setUrl] = useState("");

    let textAreaRef = React.createRef;

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

    const getUrl = () => {
        let url = window.location.href;
        url = url.split('/');
        url = url.pop();

        return url;
    }

    const getWallPosts = () => {
        fetch(wallPostUrl)
            .then(res => res.json())
            .then(res => setListOfWallPosts(res))
            .catch(err => err);
    }

    const getFriendStatus = () => {
        fetch('/api/friends/getFriendStatus/' + loggedInUser.username + '/' + user.username)
            .then(res => res.json())
            .then(res => { setFriendStatus(res.status) })
            .catch(err => err)
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

    useEffect(() => {
        setUser(props.user);
        setWallPostUrl(props.wallPostUrl);
        setUrl(getUrl);
        console.log(wallPostUrl)
    })

    useEffect(() => {
        getWallPosts();
        getFriendStatus();
    }, [wallPostUrl, user])

    return (
        <div>
            {loggedInUser.username === url || url === "home" || friendStatus === 1 ?
                <div className="write-post-container">
                    <div className="write-post-top-container">
                        <div className="profile-pic"> <img src={loggedInUser.profile_pic}></img></div>
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
                    <hr className="write-post-seperator"></hr>
                </div>
                : null}

            <div><HomeWallPosts wallPostUrl={wallPostUrl} listOfHomeWallPosts={listOfWallPosts} /></div>
        </div>
    )
}

export default WritePost;