import React, { useState, useEffect } from 'react';
import './ChatHeader.css';

const ChatHeader = props => {

    const [user, setUser] = useState({})

    const getUserFromChat = () => {
        fetch('/api/chat/getUserFromChat/' + props.chatId)
            .then(res => res.json())
            .then(res => {
                setUser(res);
            })
            .catch(err => err)
    }

    useEffect(() => {
        getUserFromChat();
    }, [])

    return (
        <>
            {props.chatId !== undefined ?
                <div className="chat-header-container">
                    <div className="user-profile-pic">
                        <img src={user.profile_pic}></img>
                    </div>
                    <div className="chat-header-username">
                        {user.username}
                    </div>
                </div>
                : null}
        </>

    )
}

export default ChatHeader;