import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../common/NavBar';
import '../profile/Profile.css';
import { FaUserCircle } from 'react-icons/fa'
import { Button, Form, FormControl } from 'react-bootstrap';
import WritePost from '../home/WritePost';
import FavoriteGamesCards from '../profile/FavoriteGamesCards';
import UserContext from '../common/UserContext';
const Profile = props => {

    const [user, setUser] = useState({})
    const [username, setUsername] = useState("");
    const [showPosts, setShowPosts] = useState(true);
    const [showFriends, setShowFriends] = useState(false);
    const [loggedInUser] = useContext(UserContext);
    const [friendStatus, setFriendStatus] = useState();
    const wallPostUrl = "/api/posts/getRecentPostsToUser/" + username;

    const getUser = () => {
        fetch('/api/users/getUser/' + username)
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => err)
    }

    const getFriendStatus = () => {
        fetch('/api/friends/getFriendStatus/' + loggedInUser.username + '/' + username)
            .then(res => res.json())
            .then(res => { setFriendStatus(res.status) })
            .catch(err => err)
    }

    const getUsernameFromUrl = () => {
        let url = window.location.href;
        url = url.split('/');
        url = url.pop();

        return url;
    }

    const handlePostClick = () => {
        setShowPosts(true);
        setShowFriends(false);
    }

    const handleFriendsClick = () => {
        setShowPosts(false);
        setShowFriends(true);
    }

    const addFriend = () => {
        console.log("adding friend");
        console.log("user_id" + user.user_id)

        const data = {
            friend_id: user.user_id,
        }
        fetch('/api/friends/addFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                console.log(data);
                return fetch('/api/friends/getFriendStatus/' + loggedInUser.username + '/' + username)
            })
            .then(res => res.json())
            .then(res => setFriendStatus(res.status))
            .catch((err) => {
                console.log(err);
            })
    }

    const cancelFriendRequest = () => {
        console.log("adding friend");
        console.log("user_id" + user.user_id)

        fetch('/api/friends/declineFriendRequest/' + loggedInUser.user_id + '/' + user.user_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(data => {
                console.log(data);
                return fetch('/api/friends/getFriendStatus/' + loggedInUser.username + '/' + username)
            })
            .then(res => res.json())
            .then(res => setFriendStatus(res.status))
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        setUsername(getUsernameFromUrl)
        getUser();
        getFriendStatus();
    }, [loggedInUser, friendStatus])

    return (
        <div>
            <div className='main-profile-root-container'>
                <NavBar username={loggedInUser.username} />
                <div className="main-profile-content-container">
                    <div className="profile-header-container">
                        <div className="profile-header-top-container">
                            <div className="profile-header-username"><FaUserCircle size={65} color={"#293E4A"}></FaUserCircle> {username}</div>
                            {username === loggedInUser.username || loggedInUser.username === undefined ?
                                null
                                : <div>
                                    {friendStatus !== 1 && friendStatus !== undefined ?
                                        <div>{friendStatus === 2 ?
                                            <div className="profile-header-add-friend">
                                                <Button className="add-friend-button" variant="primary" type="submit" onClick={e => addFriend(e)}>Add Friend</Button>
                                            </div>
                                            : <div className="profile-header-add-friend">
                                                <Button className="cancel-request-button" variant="primary" type="submit" onClick={e => cancelFriendRequest(e)}>Cancel Request</Button>
                                            </div>} </div>
                                        : null}
                                </div>}
                        </div>
                        <div className="favorite-games-header">Favorite Games</div>
                        <div className="favorite-games-slider-container">
                            <FavoriteGamesCards username={username} />
                        </div>
                        <div className="see-all-favorite-games">See All</div>

                        {showPosts ?
                            <div className="bottom-header-container">
                                <div className="select-posts">
                                    <a href="#" style={{ textDecoration: "underline" }} onClick={handlePostClick}>Posts</a>
                                </div>
                                <div className="select-friends">
                                    <a href="#" style={{ textDecoration: "none" }} onClick={handleFriendsClick}>Friends <p className="friend-count">&nbsp;19</p></a>
                                </div>
                            </div>
                            : <div className="bottom-header-container">
                                <div className="select-posts" >
                                    <a href="#" style={{ textDecoration: "none" }} onClick={handlePostClick}>Posts</a>
                                </div>
                                <div className="select-friends">
                                    <a href="#" style={{ textDecoration: "underline" }} onClick={handleFriendsClick}>Friends <p className="friend-count">&nbsp;19</p></a>
                                </div>
                            </div>}
                    </div>
                    <div className="profile-feed">
                        <WritePost user={user} wallPostUrl={wallPostUrl} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;