import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../common/NavBar';
import UserContext from '../common/UserContext';
import FriendRequestCards from './FriendRequestCards';
import '../searchpage/SearchPage.css'
import './Notifications.css'


const Notifications = props => {

    const [user, setUser] = useContext(UserContext);
    const [listOfFriendRequests, setListOfFriendRequests] = useState([]);
    const [friendRequestCount, setFriendRequestCount] = useState();

    const getFriendRequests = () => {
        fetch('/api/friends/getFriendRequests')
            .then(res => res.json())
            .then(res => {
                setListOfFriendRequests(res);
                setFriendRequestCount(res.length);
            })
            .catch(err => err);
    }

    useEffect(() => {
        getFriendRequests();
    }, [])

    return (
        <div>
            <div className='main-notifications-root-container'>
                <NavBar username={user.username} />
                <div className="main-notifications-root-content-container">
                    {friendRequestCount === 0 ?
                        <div className="notifications-header">No new notifications</div>
                        : <div className="main-notifications-content-container">
                            <div><FriendRequestCards listOfFriendRequests={listOfFriendRequests} /></div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Notifications;