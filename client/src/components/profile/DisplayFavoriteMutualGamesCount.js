import React, { useState, useEffect, useContext } from 'react';

const DisplayFavoriteMutualGamesCount = props => {

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
                <div>{favoriteMutualGamesCount + " Mutual Games"}</div>
                : null}
        </>
    )
}

export default DisplayFavoriteMutualGamesCount;