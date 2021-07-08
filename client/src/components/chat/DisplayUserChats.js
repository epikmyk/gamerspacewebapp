import React, { useState, useEffect, useContext } from 'react';
import PeopleCards from './PeopleCards';
import UserContext from '../common/UserContext';
import '../displayusers/UserCards.css'

const DisplayUserChats = props => {

    const [loggedInUser] = useContext(UserContext);
    const [listOfUsers, setListOfUsers] = useState([])
    const [chatActive, setChatActive] = useState(false)

    const getChats = () => {
        fetch('/api/chat/getChats')
            .then(res => res.json())
            .then(res => {
                setListOfUsers(res);
            })
            .catch(err => err)
    }

    const checkChatStatus = () => {

        if (props.initializeChat && chatActive === false) {
            const data = {
                active: 1,
                chat_id: props.chatId
            }
            fetch('/api/chat/updateChatStatus', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(data => {
                    getChats();
                })
                .catch((err) => {
                    console.log(err);
                })
                setChatActive(true)
        }
    }

    useEffect(() => {
        getChats();
        checkChatStatus();
    }, [loggedInUser, props.initializeChat, props.chatId])

    return (
        <>
            <PeopleCards listOfPeople={listOfUsers}/>
        </>
    )
}

export default DisplayUserChats;