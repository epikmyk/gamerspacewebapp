import React, { useState, useEffect } from 'react';
import './UserCards.css'

const UserCards = props => {
    const [listOfUsers, setListOfUsers] = useState(props.listOfUsers);

    useEffect(() => {
        setListOfUsers(props.listOfUsers);
    })

    const userCards = listOfUsers.map(user =>
        <div key={user.user_id}>
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