import React, { useState, useEffect } from 'react';
import './WritePost.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'

const WritePost = props => {

    const [scrollHeight, setScrollHeight] = useState(0)
    const [textAreaHeight, setTextAreaHeight] = useState(0)
    const [image, setImage] = useState(" ")
    const [listOfWords, setListOfWords] = useState([]);
    const [word, setWord] = useState("")

    let textAreaRef = React.createRef;


    const handleTextAreaChange = (e) => {

        setTextAreaHeight(300)
        e.style.height = "auto";
        e.style.height = e.scrollHeight + "px";

        checkForImage(e.value)
    }

    const checkForImage = (postString) => {
        let checkString = postString.match(/\.(gif|jpg|jpeg|tiff|png)/g) != null;

        console.log("STRING IS " + checkString)
        if (checkString) {
            let postWords = postString.split("http");
            let lastWord = "http" + postWords[postWords.length - 1];
            setImage(lastWord);
        } else {
            setImage(" ")
        }
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
                    <Button className="post-button" variant="primary" type="submit">Post</Button>
                </div>
            </div>
            <hr className="write-post-seperator"></hr>
        </div>
    )
}

export default WritePost;