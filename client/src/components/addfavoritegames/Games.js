import React, { useState, useEffect } from 'react';
import './AddFavoriteGamesModal.css';
import GameCards from './GameCards';

const Games = props => {

    const [listOfGames, setListOfGames] = useState([]);

    const getGames = () => {
        fetch('https://api.rawg.io/api/games?key=09da1e9cbb9b49f5982d84dcd0cbcf55&search=' + props.searchTerm)
            .then(res => res.json())
            .then(res => setListOfGames(res.results))
            .catch(err => err)
    }

    useEffect(() => {
        getGames();
    }, [props.searchTerm])

    return (
        <>
            <GameCards listOfGames={listOfGames} onDone={props.onDone} onClose={props.onClose}/>
        </>
    )
}

export default Games;