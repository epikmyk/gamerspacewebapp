import React, { useState, useEffect, useContext } from 'react';
import PeopleCards from './PeopleCards';
import UserContext from '../common/UserContext';

const DisplaySearchResults = props => {

    const [loggedInUser] = useContext(UserContext);
    const [listOfUsers, setListOfUsers] = useState([]);

    const getSearchResults = () => {
        fetch('/api/users/search/' + props.searchTerm)
            .then(res => res.json())
            .then(res => {
                setListOfUsers(res);
            })
            .catch(err => err)
    }

    useEffect(() => {
        getSearchResults();
    }, [loggedInUser, props.searchTerm])

    return (
        <>
            <PeopleCards listOfPeople={listOfUsers}/>
        </>
    )
}

export default DisplaySearchResults;