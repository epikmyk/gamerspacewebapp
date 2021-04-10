import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import NavBar from '../common/NavBar';
import '../chat/Chat.css'

const Chat = props => {
    return (
        <>
            <NavBar />
            <div className="chat-container">
                <div className="chat-content">
                    Hello
                </div>
                <div className="chat">
                    <Form className="chat-form">
                        <textarea className="chat-textarea" placeholder="Send a message..." maxLength="500"></textarea>
                    </Form>
                    {/*<Button className="send-message-button" size="sm">Chat</Button>*/}
                </div>
                
            </div>
        </>
    )

}

export default Chat;