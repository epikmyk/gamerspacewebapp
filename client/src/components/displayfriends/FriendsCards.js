import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import UserContext from '../common/UserContext';
import '../displayusers/UserCards.css'

const FriendsCards = props => {
  
    const [loggedInUser] = useContext(UserContext);
    const [friendStatus, setFriendStatus] = useState();
    const [listOfFriends, setListOfFriends] = useState([]);
    const [user, setUser] = useState(props.user);

    const getFriends = () => {
        fetch('/api/friends/getUserFriends/' + props.user.user_id)
            .then(res => res.json())
            .then(res => {
                setListOfFriends(res);
            })
            .catch(err => err)
    }

    useEffect(() => {
        setUser(props.user);
        getFriends();
    }, [props.user])

    

    const userCards = listOfFriends.map(user =>
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

export default FriendsCards;