import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillEdit } from 'react-icons/ai'
import NavBar from '../common/NavBar';
import WritePost from '../home/WritePost';
import FavoriteGamesCards from '../profile/FavoriteGamesCards';
import UserContext from '../common/UserContext';
import AddFavoriteGamesModal from '../addfavoritegames/AddFavoriteGamesModal';
import UpdateProfilePicModal from './UpdateProfilePicModal';
import FriendsCards from '../displayfriends/FriendsCards';
import '../profile/Profile.css';

const Profile = props => {

    const [loggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({})
    const [username, setUsername] = useState("");
    const [showPosts, setShowPosts] = useState(true);
    const [showFriends, setShowFriends] = useState(false);
    const [showGamesModal, setShowGamesModal] = useState(false);
    const [showUpdateProfilePicModal, setShowUpdateProfilePicModal] = useState(false);
    const [friendStatus, setFriendStatus] = useState();
    const [friendCount, setFriendCount] = useState();
    const wallPostUrl = "/api/posts/getRecentPostsToUser/" + username;

    const handleGamesModalClose = () => {
        setShowGamesModal(false);
    }

    const handleUpdateProfilePicModalClose = () => {
        setShowUpdateProfilePicModal(false);
    }

    const handlePostClick = () => {
        setShowPosts(true);
        setShowFriends(false);
    }

    const handleFriendsClick = () => {
        setShowPosts(false);
        setShowFriends(true);
    }

    const getUsernameFromUrl = () => {
        let url = window.location.href;
        url = url.split('/');
        url = url.pop();

        return url;
    }

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

    const getFriendCount = () => {
        fetch('/api/friends/getUserFriends/' + user.user_id)
            .then(res => res.json())
            .then(res => setFriendCount(res.length))
            .catch(err => err)
    }

    const addFriend = () => {
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
        getFriendCount();
    }, [loggedInUser, friendStatus, showGamesModal, friendCount])

    return (
        <div>
            <div className='main-profile-root-container'>
                <NavBar username={loggedInUser.username} />
                <div className="main-profile-content-container">
                    <div className="profile-header-container">
                        <div className="profile-header-top-container">
                            {username === loggedInUser.username && loggedInUser.username !== undefined ?
                                <div>
                                    <div className="update-profile-pic-header-username">
                                        <a><img onClick={() => setShowUpdateProfilePicModal(true)} src={user.profile_pic}></img></a>
                                        {username}
                                    </div>
                                    <div className="update-profile-pic-button-container">
                                        <a onClick={() => setShowUpdateProfilePicModal(true)}><AiFillEdit size={18}></AiFillEdit></a>

                                        <UpdateProfilePicModal onClose={handleUpdateProfilePicModalClose} show={showUpdateProfilePicModal} />
                                        {showUpdateProfilePicModal ?
                                            <div>
                                                <UpdateProfilePicModal onClose={handleUpdateProfilePicModalClose} show={true} />
                                            </div>
                                            : null
                                        }
                                    </div>
                                </div>

                                : <div>
                                    <div className="profile-header-username">
                                        <a><img src={user.profile_pic}></img></a>
                                        {username}
                                    </div>
                                    {friendStatus !== 1 && friendStatus !== undefined ?
                                        <div>{friendStatus === 2 ?
                                            <div className="profile-header-add-friend">
                                                <Button className="add-friend-button" variant="primary" type="submit" onClick={e => addFriend(e)}>Add Friend</Button>
                                            </div>
                                            : <div>
                                                {friendStatus === 0 ?
                                                    <div className="profile-header-add-friend">
                                                        <Button className="cancel-request-button" variant="primary" type="submit" onClick={e => cancelFriendRequest(e)}>Cancel Request</Button>
                                                    </div>
                                                    : null}
                                            </div>} </div>
                                        : null}
                                </div>}
                        </div>
                        <div className="favorite-games-header-container">
                            <div className="favorite-games-header">Favorite Games</div>
                            {username === loggedInUser.username && loggedInUser.username !== undefined ?
                                <a className="add-games-button" onClick={() => setShowGamesModal(true)}>Add Games +</a>
                                : null}
                        </div>
                        {showGamesModal ?
                            <div>
                                <AddFavoriteGamesModal onClose={handleGamesModalClose} show={true} />
                            </div>
                            : null
                        }
                        <div className="favorite-games-slider-container">
                            <FavoriteGamesCards username={username} />
                        </div>
                        <div className="see-all-favorite-games">See All</div>
                        <div className="profile-header-seperator-container">
                            <hr className="profile-header-seperator"></hr>
                        </div>

                        {showPosts ?
                            <div className="bottom-header-container">
                                <div className="select-posts">
                                    <a style={{ textDecoration: "underline" }} onClick={handlePostClick}>Posts</a>
                                </div>
                                <div className="select-friends">
                                    <a style={{ textDecoration: "none" }} onClick={handleFriendsClick}>Friends <p className="friend-count">&nbsp;{friendCount}</p></a>
                                </div>
                            </div>
                            : <div className="bottom-header-container">
                                <div className="select-posts" >
                                    <a style={{ textDecoration: "none" }} onClick={handlePostClick}>Posts</a>
                                </div>
                                <div className="select-friends">
                                    <a style={{ textDecoration: "underline" }} onClick={handleFriendsClick}>Friends <p className="friend-count">&nbsp;{friendCount}</p></a>
                                </div>
                            </div>}
                    </div>
                    {showPosts ?
                        <div className="profile-feed">
                            <WritePost user={user} wallPostUrl={wallPostUrl} />
                        </div>
                        : <div className="profile-feed">
                            <FriendsCards user={user}/>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile;