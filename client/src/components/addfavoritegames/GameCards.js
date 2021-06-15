import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './AddFavoriteGamesModal.css';

const GameCards = props => {

    const [listOfGames, setListOfGames] = useState([]);
    const [listOfFavoriteGames, setListOfFavoriteGames] = useState([]);

    const addGamesToFavorites = () => {
        console.log("adding games")

        listOfFavoriteGames.map(game => {
            const data = {
                slug: game.slug,
                name: game.name,
                image: game.background_image
            }
            fetch('/api/games/addGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(data => {
                    console.log(data);
                    
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }

    useEffect(() => {
        setListOfGames(props.listOfGames)
    })

    const addGameToFavorites = (selectedGame) => {
        var game = selectedGame;

        if (listOfFavoriteGames.includes(game)) {
            const newListOfFavoriteGames = listOfFavoriteGames.filter((currentGame) => currentGame.name !== game.name);
            setListOfFavoriteGames(newListOfFavoriteGames);
        } else {
            setListOfFavoriteGames(listOfFavoriteGames => [...listOfFavoriteGames, game])
        }
    }

    const gameCards = listOfGames.map(game =>
        <div className="game-card-container">
            <div className="game-card-name">{game.name}</div>
            <a id={game.name} className="game-card-image" href="#" onClick={() => addGameToFavorites(game)}>
                {listOfFavoriteGames.includes(game) ?
                    <div className="select-overlay">
                        <p className="check-mark">&#10003;</p>
                    </div>
                    : null
                }
                <img src={game.background_image}></img>
            </a>
        </div>
    )

    return (
        <>
            <div className="game-cards-container">
                {gameCards}
            </div>
            <div className="done-button-container">
                <Button className="done-button" variant="primary" type="submit" onClick={() => {addGamesToFavorites();  props.onDone()}}>Done</Button>
            </div>
        </>
    )
}

export default GameCards;