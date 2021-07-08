import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../common/UserContext';
import '../displayusers/UserCards.css';
import './PeopleCards.css';

const PeopleCards = props => {

    const [listOfPeople, setListOfPeople] = useState(props.listOfPeople);
    const [loggedInUser] = useContext(UserContext);

    const openChat = (user) => {
        console.log("opening room")
        console.log("user1: " + loggedInUser.user_id)
        console.log("user2: " + user.user_id);

        const data = {
            user1_id: loggedInUser.user_id,
            user2_id: user.user_id
        }
        fetch('/api/chat/createChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.message && res.message == "Chat exists") {
                    getChat(user)
                }
                else {
                    window.location.replace("/chat/" + res.chat_id)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getChat = (user) => {
        fetch('/api/chat/getChat/' + loggedInUser.user_id + '/' + user.user_id)
            .then(res => res.json())
            .then(res => {
                window.location.replace("/chat/" + res.chat_id)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        setListOfPeople(props.listOfPeople)
    })

    const userCards = listOfPeople.map(user =>
       
            <div key={user.user_id} className="chat-user-username">
                <a onClick={() => openChat(user)}>
                    <div className="user-profile-pic"> <img src={user.profile_pic}></img></div>
                </a>
                <div className="user-stats">
                    <a onClick={() => openChat(user)}>
                        <p className="user-username-text">{user.username}</p>
                    </a>
                </div>
            </div>
        
    )

    return (
        <>
            {userCards}
        </>
    )
}

export default PeopleCards;