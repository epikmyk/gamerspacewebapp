import React, { useState, useEffect } from 'react';
//import { Carousel } from 'react-bootstrap';
import { FaUserCircle, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import '../profile/FavoriteGamesCards.css';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FavoriteGamesCards = props => {

    const [listOfFavoriteGames, setListOfFavoriteGames] = useState([]);
    const [username, setUsername] = useState("");

    const getFavoriteGames = () => {
        fetch('/api/games/getFavoriteGames/' + username)
            .then(res => res.json())
            .then(res => setListOfFavoriteGames(res))
            .catch(err => err)
    }

    const getUsernameFromUrl = () => {
        let url = window.location.href;
        url = url.split('/');
        url = url.pop();

        return url;
    }

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      
    };

    useEffect(() => {
        setUsername(getUsernameFromUrl)
        getFavoriteGames();
    }, [username])

    const favoriteGamesCards = listOfFavoriteGames.map(game =>
        <div className="game-container">
            <div className="game-name">{game.name}</div>
            <div className="game-image">
                <img src={game.background_image}></img>
            </div>
        </div>
    )

    return (
        <>
            <Slider className="favorite-games-cards-slider" {...settings}>
                {favoriteGamesCards}
            </Slider>
        </>
    )
}

export default FavoriteGamesCards;
