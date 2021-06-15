import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import FavoriteGamesCards from '../profile/FavoriteGamesCards';
import './AddFavoriteGamesModal.css';

const GameCards = props => {

    const [listOfGames, setListOfGames] = useState(props.listOfGames);
    const [listOfFavoriteGames, setListOfFavoriteGames] = useState([]);
    const [listOfFavoriteGameNames, setListOfFavoriteGameNames] = useState([]);

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

        //check to see if game name is already in favorite games list
        if (listOfFavoriteGameNames.includes(game.name)) {

            //remove from favorite games list if favorite game list already contains game name
            const newListOfFavoriteGameNames = listOfFavoriteGameNames.filter((currentGameName) => currentGameName !== game.name);
            setListOfFavoriteGameNames(newListOfFavoriteGameNames);

            //remove from favorite games list if favorite game list already contains game
            const newListOfFavoriteGames = listOfFavoriteGames.filter((currentGame) => currentGame.name !== game.name);
            setListOfFavoriteGames(newListOfFavoriteGames);
        } else {
            setListOfFavoriteGameNames(listOfFavoriteGameNames => [...listOfFavoriteGameNames, game.name])
            setListOfFavoriteGames(listOfFavoriteGames => [...listOfFavoriteGames, game])
        }
    }

    const gameCards = listOfGames.map(game =>
        <div className="game-card-container">
            <div className="game-card-name">{game.name}</div>
            <a id={game.name} className="game-card-image" onClick={() => addGameToFavorites(game)}>
                {listOfFavoriteGameNames.includes(game.name) ?
                    <div className="select-overlay">
                        <p className="check-mark">&#10003;</p>
                    </div>
                    : null
                }
                <img src={game.background_image}></img>
            </a>
        </div>
    )

    const favoriteGameCards = listOfFavoriteGames.map(game =>
        <div className="game-card-container">
            <div className="game-card-name">{game.name}</div>
            <a id={game.name} className="game-card-image" onClick={() => addGameToFavorites(game)}>
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
                <div>
                    {favoriteGameCards}
                </div>
                <hr className="games-seperator"></hr>
                {gameCards}
            </div>
            <div className="done-button-container">
                <Button className="done-button" variant="primary" type="submit" onClick={() => { addGamesToFavorites(); props.onDone(); props.onClose(); }}>Done</Button>
            </div>
        </>
    )
}

export default GameCards;