import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../common/NavBar';
import UserContext from '../common/UserContext';
import UserCards from '../displayusers/UserCards';
import './SearchPage.css'


const SearchPage = props => {

    const [user, setUser] = useContext(UserContext);
    const [listOfUsers, setListOfUsers] = useState([]);

    const search = () => {
        let searchTerm = props.match.params.searchterm;
        fetch('/api/users/search/' + searchTerm)
            .then(res => res.json())
            .then(res => (setListOfUsers(res)))
            .catch(err => err);
    }

    useEffect(() => {
        search();
    }, [])

    return (
        <div>
            <div className='main-search-root-container'>
                <NavBar username={user.username} />
                <div className="main-search-root-content-container">
                    <div className="main-search-content-container">
                        <div><UserCards listOfUsers={listOfUsers} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;