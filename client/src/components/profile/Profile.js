import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import '../profile/Profile.css';
import Feed from "../profile/Feed";
import { FaUserCircle } from 'react-icons/fa'
import WritePost from '../home/WritePost';
import FavoriteGamesCards from '../profile/FavoriteGamesCards';
import { Carousel } from 'react-bootstrap';

const Profile = props => {

    const [user, setUser] = useState({})
    const [username, setUsername] = useState("");
    const [showPosts, setShowPosts] = useState(true);
    const [showFriends, setShowFriends] = useState(false);
    const wallPostUrl = "/api/posts/getRecentPostsToUser/" + username;

    const getUser = () => {
        fetch('/api/users/getUser/' + username)
            .then(res => res.json())
            .then(res => setUser(res))
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

    useEffect(() => {
        setUsername(getUsernameFromUrl)
        getUser();
    }, [username])

    return (
        <div>
            <div className='main-profile-root-container'>
                <NavBar user={user} />
                <div className="main-profile-content-container">
                    <div className="profile-header-container">
                        <div className="profile-header-username"><FaUserCircle size={65} color={"#293E4A"}></FaUserCircle> {user.username}</div>
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