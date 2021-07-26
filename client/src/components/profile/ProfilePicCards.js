import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../addfavoritegames/AddFavoriteGamesModal.css';
import './UpdateProfilePicModal.css';
import UserContext from '../common/UserContext';

const ProfilePicCards = props => {

    const [listOfGames, setListOfGames] = useState(props.listOfGames);
    const [gameName, setGameName] = useState("");
    const [selectedGame, setSelectedGame] = useState();
    const [profilePic, setProfilePic] = useState(props.currentProfilePic);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const updateProfilePic = () => {

        const data = {
            profile_pic: profilePic
        }
        fetch('/api/users/updateProfilePic', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                console.log(data);
                return fetch('/api/users/getLoggedInUser')

            })
            .then(res => res.json())
            .then(res => setLoggedInUser(res))
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        setListOfGames(props.listOfGames)
    })

    const addGameToFavorites = (game) => {
        setSelectedGame(game);
        setGameName(game.name);
        setProfilePic(game.background_image);
    }

    const profilePicCards = listOfGames.map(game =>

        <>
            {game.background_image !== null ?
                <div className="profile-pic-card-container">
                    <a id={game.name} className="profile-game-card-image" onClick={() => addGameToFavorites(game)}>
                        {gameName === game.name ?
                            <div className="profile-pic-select-overlay">
                                <p className="profile-pic-check-mark">&#10003;</p>
                            </div>
                            : null
                        }
                        <img src={game.background_image}></img>
                    </a>
                </div>
                : null}
        </>

    )

    return (
        <>
            <div>
                <div className="selected-profile-pic">
                    {selectedGame !== undefined ?
                        <div>
                            <div className="update-profile-pic-modal-top">
                                <img src={profilePic}></img>
                            </div>
                            <div className="update-pic-button-container">
                                <Button className="update-pic-button" variant="primary" type="submit" onClick={() => { updateProfilePic(); props.onDone(); props.onClose(); }}>Save</Button>
                            </div>
                        </div>
                        : <div>
                            <div className="update-profile-pic-modal-top">
                                <img src={profilePic}></img>
                            </div>
                            <div className="update-pic-button-container">
                                <Button className="update-pic-button" variant="primary" type="submit" onClick={() => { updateProfilePic(); props.onDone(); props.onClose(); }}>Save</Button>
                            </div>
                        </div>
                    }
                    <hr className="games-seperator"></hr>
                </div>
                <div className="profile-pic-cards-container">
                    <div className="profile-pic-cards-inner-container">
                        {profilePicCards}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePicCards;