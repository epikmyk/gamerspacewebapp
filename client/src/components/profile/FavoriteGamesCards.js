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
    const [favoriteGamesCount, setFavoriteGamesCount] = useState();
    const [sliderCount, setSliderCount] = useState(1);

    const getFavoriteGames = () => {
        fetch('/api/games/getFavoriteGames/' + username)
            .then(res => res.json())
            .then(res => {
                setListOfFavoriteGames(res);
                setFavoriteGamesCount(res.length);
            })
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
        slidesToShow: sliderCount,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    infinite: true,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            }
        ]
    };

    useEffect(() => {
        setUsername(getUsernameFromUrl)
        getFavoriteGames();
        if (favoriteGamesCount === 1) {
            setSliderCount(1);
        }
        else if (favoriteGamesCount === 2) {
            setSliderCount(2);
        }
        else {
            setSliderCount(3);
        }
    }, [username, sliderCount, favoriteGamesCount])

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
            <div>
                {favoriteGamesCount !== undefined ?
                    <Slider className="favorite-games-cards-slider" {...settings}>
                        {favoriteGamesCards}
                    </Slider>
                    : null}
            </div>
        </>
    )
}

export default FavoriteGamesCards;
