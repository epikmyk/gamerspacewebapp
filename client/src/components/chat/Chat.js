import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { IoMdSend } from 'react-icons/io'
import NavBar from '../common/NavBar';
import DisplayFriends from './DisplayFriends';
import DisplaySearchResults from './DisplaySearchResults';
import '../chat/Chat.css'

const Chat = props => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
            <div className="chat-container">
                <NavBar />
                <div className="chat-content-container">
                    <div className="chats">
                        <div className="chats-header">Chats</div>
                    </div>
                    <div className="chat">
                        <div className="chat-name-header">
                        </div>
                        <Form className="chat-form">
                            <FormControl type="text" placeholder="Send a message..." className="chat-input"></FormControl>
                            <a className="send-message-button">
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