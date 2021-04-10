import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import NavBar from '../common/NavBar';
import '../profile/Post.css'

const Post = props => {

    return (
        <div>
            <div className="main-post">
                <div class="post-content">
                    I like to eat food because it tastes good bitch.
                    </div>
                <Form className="post-form">
                    <textarea className="post-textarea" autoComplete="off" type="text" placeholder="Write a comment..." maxLength="500" rows="1"></textarea>
                </Form>
            </div>
        </div>
    )
}

export default Post;