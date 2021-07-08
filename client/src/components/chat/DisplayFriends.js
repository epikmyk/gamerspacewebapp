import React, { useState, useEffect, useContext } from 'react';
import PeopleCards from './PeopleCards';
import UserContext from '../common/UserContext';

const DisplayFriends = props => {

    const [loggedInUser] = useContext(UserContext);
    const [listOfFriends, setListOfFriends] = useState([]);

    const getFriends = () => {
        fetch('/api/friends/getUserFriends/' + loggedInUser.user_id)
            .then(res => res.json())
            .then(res => {

                if (!localStorage.getItem("friends") && loggedInUser.user_id !== undefined) {
                    localStorage.setItem("friends", JSON.stringify(res));
                    setListOfFriends(res);
                }
                else if (localStorage.getItem("friends") && loggedInUser.user_id !== undefined){
                    let friends = JSON.parse(localStorage.getItem("friends"))
                    if (toString(res) !== toString(friends)) {
                        localStorage.setItem("friends", JSON.stringify(res));
                    }
                }
                if (localStorage.getItem("friends")) {
                    setListOfFriends(JSON.parse(localStorage.getItem("friends")))
                }

            })
            .catch(err => err)
    }

    useEffect(() => {

        if (localStorage.getItem("friends")) {
            setListOfFriends(JSON.parse(localStorage.getItem("friends")))
        }
        getFriends();

    }, [loggedInUser])

    return (
        <>
            <PeopleCards listOfPeople={listOfFriends} />
        </>
    )
}

export default DisplayFriends;