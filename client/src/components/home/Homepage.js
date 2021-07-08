import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../common/NavBar';
import UserContext from '../common/UserContext';
import WritePost from '../home/WritePost';
import AddFavoriteGamesModal from '../addfavoritegames/AddFavoriteGamesModal';
import Footer from '../common/Footer';
import GetStarted from './GetStarted';
import '../home/Homepage.css'

const Homepage = props => {

    const [user, setUser] = useContext(UserContext);
    const [numOfFavoriteGames, setNumOfFavoriteGames] = useState();
    const [showGamesModal, setShowGamesModal] = useState(true);
    const wallPostUrl = "/api/posts/getUserPostsAndFriendsPosts"

    const handleGamesModalClose = () => {
        setShowGamesModal(false);
    }

    const getLoggedInUser = () => {
        fetch('/api/users/getLoggedInUser')
            .then(res => res.json())
            .then(res => {
                setUser(res);
                return fetch('/api/games/getFavoriteGames/' + res.username)
            })
            .then(res => res.json())
            .then(res => setNumOfFavoriteGames(res.length))
            .catch(err => err)
    }

    useEffect(() => {
        getLoggedInUser();
    }, [numOfFavoriteGames])

    return (
        <div>
            <div className='main-homepage-root-container'>
                <NavBar username={user.username} />
                <div className="main-homepage-root-content-container">
                    <div className="main-homepage-content-container">
                        {numOfFavoriteGames === 0 ?
                            <div>
                                <AddFavoriteGamesModal show={true} onClose={handleGamesModalClose} />
                            </div>
                            : null}
                        <div className="homepage-feed">
                            <WritePost user={user} wallPostUrl={wallPostUrl} />
                            <GetStarted />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
