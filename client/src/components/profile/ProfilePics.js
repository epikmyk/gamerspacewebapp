import React, { useState, useEffect, useContext } from 'react';
import ProfilePicCards from './ProfilePicCards';
import UserContext from '../common/UserContext';

const ProfilePics = props => {

    const [listOfGames, setListOfGames] = useState([]);
    const [loggedInUser] = useContext(UserContext);

    const getGames = () => {
        fetch('https://api.rawg.io/api/games?key=09da1e9cbb9b49f5982d84dcd0cbcf55&page_size=25&search=' + props.searchTerm)
            .then(res => res.json())
            .then(res => setListOfGames(res.results))
            .catch(err => err)
    }

    useEffect(() => {
        getGames();
    }, [props.searchTerm])

    return (
        <>
            <ProfilePicCards currentProfilePic={loggedInUser.profile_pic} listOfGames={listOfGames} onDone={props.onDone} onClose={props.onClose}/>
        </>
    )
}

export default ProfilePics;