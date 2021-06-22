import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import UserContext from '../common/UserContext';
import './UserCards.css'

const UserCards = props => {
    const [listOfUsers, setListOfUsers] = useState(props.listOfUsers);
    const [loggedInUser] = useContext(UserContext);

    useEffect(() => {
        setListOfUsers(props.listOfUsers);
        console.log(listOfUsers)
    })

    const userCards = listOfUsers.map(user =>
        <div>
            <div className="user-username">
                <a href={"/profile/" + user.username}>
                    <div className="user-profile-pic"> <img src={user.profile_pic}></img></div>
                </a>
                <div className="user-stats">
                    <a href={"/profile/" + user.username}>
                        <p className="user-username-text">{user.username}</p>
                    </a>
                </div>
            </div>
            <hr className="user-seperator"></hr>
        </div>
    )

    return (
        <>
            {userCards}
        </>
    )
}

export default UserCards;