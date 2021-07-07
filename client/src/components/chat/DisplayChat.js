import React, { useState, useEffect, useContext, useRef } from 'react';
import UserContext from '../common/UserContext';
import { io } from 'socket.io-client';
import './DisplayChat.css'

const DisplayChat = props => {

    const [listOfMessages, setListOfMessages] = useState([]);
    const [loggedInUser] = useContext(UserContext);
    const socket = useRef(null);
    let hostname = window.location.hostname;

    const getMessages = () => {
        fetch('/api/messages/getMessages/' + props.chatId)
            .then(res => res.json())
            .then(res => setListOfMessages(res))
            .catch(err => err)
    }

    useEffect(() => {
        getMessages();

        let chatId = props.chatId;
        let url;

        hostname == "localhost" ? url = "http://" + hostname + "/" : url = "wss://" + hostname + "/";
        console.log(url)

        socket.current = io(url, {
            path: '/api/socket.io/',
            transports: ['websocket']
        })

        socket.current.on('connect', () => {
            socket.current.emit("room", chatId);
        })
        socket.current.on('message', message => {
            setListOfMessages(listOfMessages => [...listOfMessages, message])
        });
    }, [])

    useEffect(() => {
        
    })

    const messageCards = listOfMessages.map(message =>
        <div className="message-card-container">
            {loggedInUser.username === message.username ?
                <div className="logged-in-message-container">
                    <div className="logged-in-user-message">
                        {message.message}
                    </div>
                    <div className="logged-in-message-profile-pic">
                        <img src={message.profile_pic}></img>
                    </div>
                </div>
                :
                <div>
                    {loggedInUser.username !== undefined ?
                        <div className="message-container">
                            <div className="message-profile-pic">
                                <img src={message.profile_pic}></img>
                            </div>
                            <div className="message-right-container">
                                <div className="message-username">
                                    {message.username}
                                </div>
                                <div className="message">
                                    {message.message}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>}
        </div>
    )

    return (
        <>
            <div className="chat-content">
                {messageCards}
            </div>
        </>
    )
}

export default DisplayChat;