import React, { useState, useEffect, useContext } from 'react';
import './DisplayMutualFavoriteGamesCount.css';

const DisplayMutualFavoriteGamesCount = props => {

    const [favoriteMutualGamesCount, setFavoriteMutualGamesCount] = useState();

    const getMutualFavoriteGamesCount = () => {
        fetch('/api/games/getMutualFavoriteGames/' + props.loggedInUser.user_id + '/' + props.user.user_id)
            .then(res => res.json())
            .then(res => {
                setFavoriteMutualGamesCount(res.length);
            })
            .catch(err => err)
    }

    useEffect(() => {
        getMutualFavoriteGamesCount();
    }, [props.loggedInUser, props.user])

    return (
        <>
            {favoriteMutualGamesCount !== undefined ?
                <div className="favorite-mutual-games-count-container">
                    {favoriteMutualGamesCount}
                    {favoriteMutualGamesCount !== 1 ?
                        <div className="mutual-game-text">Mutual Games</div>
                        : <div className="mutual-game-text">Mutual Game</div>}
                </div>
                : null}
        </>
    )
}

export default DisplayMutualFavoriteGamesCount;