import React, { useState, useEffect } from 'react';
import './AddFavoriteGamesModal.css';
import GameCards from './GameCards';

const Games = props => {

    const [listOfGames, setListOfGames] = useState([]);

    const getGames = () => {
        fetch('https://api.rawg.io/api/games?key=09da1e9cbb9b49f5982d84dcd0cbcf55')
            .then(res => res.json())
            .then(res => setListOfGames(res.results))
            .catch(err => err)
    }

    useEffect(() => {
        getGames();
    }, [])

    return (
        <>
            <GameCards listOfGames={listOfGames} onDone={props.onDone}/>
        </>
    )
}

export default Games;