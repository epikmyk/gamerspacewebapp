import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, InputGroup, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import '../common/NavBar.css';
import { FaUserCircle, FaRegUserCircle, FaUserFriends, FaComment, FaRegComment, FaBell, FaRegBell, FaCog } from 'react-icons/fa';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { MdPeople, MdPeopleOutline } from 'react-icons/md';
import { HiCog, HiOutlineCog } from 'react-icons/hi'
import { FiSearch } from 'react-icons/fi'
import Logout from './Logout';

const NavBar = props => {

    const [url, setUrl] = useState('');
    const [user, setUser] = useState({})
    const [searchTerm, setSearchTerm] = useState("");
    const [friendRequestCount, setFriendRequestCount] = useState();

    const search = (e) => {
        e.preventDefault();
        window.location.assign("/search/" + searchTerm);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(e.target.value)
    }

    const getLoggedInUser = () => {
        fetch('/api/users/getLoggedInUser')
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => err)
    }

    const getFriendRequests = () => {
        fetch('/api/friends/getFriendRequests')
            .then(res => res.json())
            .then(res => {
                setFriendRequestCount(res.length);
                localStorage.setItem("notificationcount", res.length);
            })
            .catch(err => err);
    }

    const getCurrentDirectory = () => {
        let url = window.location.href;
        url = url.split('/');
        url = url.pop();

        return url;
    }

    useEffect(() => {
        if (!document.cookie.includes('cookieKey')) {
            window.location.assign('/');
        }
        setUrl(getCurrentDirectory());
        getFriendRequests();
        getLoggedInUser();
        if (localStorage.getItem("notificationcount")) {
            setFriendRequestCount(localStorage.getItem("notificationcount"))
        }
    }, [])

    return (
        <>
            <Navbar className="nav-bar" expand="lg" sticky="top" variant="dark">
                <Navbar.Brand className="nav-bar-brand"><a href="/home"><img src={"/images/navbar-gamerspace-logo.png"}></img> GamerSpace</a></Navbar.Brand>
                <Navbar.Toggle className="custom-toggler" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="nav-bar-collapse">
                    <Nav className="icons-container">
                        <Nav.Link title="home" href="/home">
                            <div className="icon-container">
                                {url == "home" ?
                                    <AiFillHome size={22}></AiFillHome>
                                    : <AiOutlineHome size={22}></AiOutlineHome>
                                }
                            </div>
                        </Nav.Link>
                        <Nav.Link title="friends "href="/friends">
                            <div className="icon-container">
                                {url == "friends" ?
                                    <MdPeople size={22}></MdPeople>
                                    : <MdPeopleOutline size={22}></MdPeopleOutline>
                                }
                            </div>
                        </Nav.Link>
                        <Nav.Link title="chat" href="/chat">
                            <div className="icon-container">
                                <FaRegComment size={22}></FaRegComment>
                            </div>
                        </Nav.Link>
                        <Nav.Link title="profile" href={"/profile/" + user.username}>
                            <div className="icon-container">
                                {window.location.href.includes(user.username) ?
                                    <FaUserCircle size={22}></FaUserCircle>
                                    : <FaRegUserCircle size={22}></FaRegUserCircle>
                                }
                            </div>
                        </Nav.Link>
                        <Nav.Link title="notifications" href="/notifications">
                            <div className="icon-container">
                                <div className="notification-icon-container">
                                    {url == "notifications" ?
                                        <FaBell size={22}></FaBell>
                                        : <FaRegBell size={22}></FaRegBell>
                                    }
                                    {friendRequestCount > 0 ?
                                        <div className='friend-request-count'>{friendRequestCount}</div>
                                        : null}
                                </div>
                            </div>
                        </Nav.Link>
                        <DropdownButton id="drop-down-settings-button" className="drop-down-settings-button dropdown-toggle" title={<HiOutlineCog title="settings" size={22}></HiOutlineCog>}>
                            <Logout />
                        </DropdownButton>
                    </Nav>
                    <Nav className="search">
                        <Form onSubmit={search}>
                            <InputGroup className="search-form-group">
                                <FormControl type="text" placeholder="Search Gamerspace" id="search-input" className="search-input" onChange={handleSearchChange}></FormControl>
                                <Button className="search-button" onClick={search}><FiSearch size={22}></FiSearch></Button>
                            </InputGroup>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar;