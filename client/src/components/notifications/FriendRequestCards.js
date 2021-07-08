import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../common/UserContext';
import './FriendRequestCards.css'

const FriendRequestCards = props => {
    const [listOfFriendRequests, setListOfFriendRequests] = useState(props.listOfFriendRequests);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const acceptFriendRequest = (user) => {
        const data = {
            user_id: loggedInUser.user_id,
            friend_id: user.user_id
        }
        fetch('/api/friends/acceptFriendRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                return fetch('/api/friends/getFriendRequests')
            })
            .then(res => res.json())
            .then(res => (setListOfFriendRequests(res)))
            .catch(err => err);
    }

    const declineFriendRequest = (user) => {
        fetch('/api/friends/declineFriendRequest/' + loggedInUser.user_id + '/' + user.user_id, {
            method: 'Delete',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                return fetch('/api/friends/getFriendRequests')
            })
            .then(res => res.json())
            .then(res => (setListOfFriendRequests(res)))
            .catch(err => err);
    }

    useEffect(() => {
        setListOfFriendRequests(props.listOfFriendRequests);
    }, [props.listOfFriendRequests])

    const friendRequestCards = listOfFriendRequests.map(user =>
        <div key={user.user_id}>
            <div className="friend-request-username">
                <a href={"/profile/" + user.username}>
                    <div className="friend-request-profile-pic"> <img src={user.profile_pic}></img></div>
                </a>
                <div className="friend-request-stats">
                    <a href={"/profile/" + user.username}>
                        <p className="user-username-text">{user.username}</p>
                    </a>
                </div>
                <div className="friend-request-buttons">
                    <Button className="accept-request-button" onClick={() => acceptFriendRequest(user)}>Accept</Button>
                    <Button className="decline-request-button" onClick={() => declineFriendRequest(user)}>Decline</Button>
                </div>
            </div>
            <hr className="friend-request-seperator"></hr>
        </div>
    )

    return (
        <>
            {friendRequestCards}
        </>
    )
}

export default FriendRequestCards;