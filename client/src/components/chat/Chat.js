import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { IoMdSend } from 'react-icons/io'
import NavBar from '../common/NavBar';
import DisplayFriends from './DisplayFriends';
import DisplaySearchResults from './DisplaySearchResults';
import DisplayUserChats from './DisplayUserChats';
import DisplayChat from './DisplayChat';
import ChatHeader from './ChatHeader';
import UserContext from '../common/UserContext';
import { io } from 'socket.io-client';
import '../chat/Chat.css'

const Chat = props => {

    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");
    const [initializeChat, setInitializeChat] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const socket = useRef(null);
    let hostname = window.location.hostname;

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        let chatId = props.match.params.chatId;
        let messageBody = {
            message: message,
            created: new Date(),
            user_id: loggedInUser.user_id,
            chat_id: chatId,
            username: loggedInUser.username,
            profile_pic: loggedInUser.profile_pic
        }
        socket.current.emit("sendMessage", chatId, messageBody);

        const data = {
            message: message,
            chat_id: props.match.params.chatId
        }
        fetch('/api/messages/createMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(data => console.log(data))
            .catch((err) => console.log(err))
    }
    
    
    useEffect(() => {
        let chatId = props.match.params.chatId;
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
    }, [])

    return (
        <>
            <div className="chat-container">
                <NavBar />
                <div className="chat-content-container">
                    <div className="chats">
                        <div className="chats-header">Chats</div>
                        <DisplayUserChats initializeChat={initializeChat} chatId={props.match.params.chatId} />
                    </div>
                    <div className="chat">
                        <div className="chat-name-header">
                            <ChatHeader chatId={props.match.params.chatId} />
                            <DisplayChat chatId={props.match.params.chatId}/>
                        </div>
                        <Form className="chat-form">
                            <FormControl type="text" placeholder="Send a message..." className="chat-input" onChange={handleMessageChange}></FormControl>
                            <a className="send-message-button" onClick={() => { sendMessage(); setInitializeChat(true) }}>
                                <IoMdSend color={"#293E4A"} size={40}></IoMdSend>
                            </a>
                        </Form>
                    </div>
                    <div className="people">
                        <div className="people-top">
                            <div className="people-header">People</div>
                            <div class="people-search">
                                <Form className="people-search-form">
                                    <FormControl type="text" placeholder="Search Users" className="people-search-input" onChange={handleSearchChange}></FormControl>
                                </Form>
                            </div>
                        </div>
                        <div className="people-container">
                            <div>
                                {searchTerm === "" ?
                                    <DisplayFriends />
                                    : <DisplaySearchResults searchTerm={searchTerm} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;