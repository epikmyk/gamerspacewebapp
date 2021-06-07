import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown, InputGroup } from 'react-bootstrap';
import '../common/NavBar.css';
import { FaUserCircle, FaRegUserCircle, FaUserFriends, FaComment, FaRegComment, FaBell, FaRegBell, FaCog } from 'react-icons/fa';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { MdPeople, MdPeopleOutline } from 'react-icons/md';
import { HiCog, HiOutlineCog } from 'react-icons/hi'


const NavBar = props => {

    const [url, setUrl] = useState('');
    const search = e => {
        console.log("seraching")
    }

    const getCurrentDirectory = () => {
        let url = window.location.href;
        url = url.split('/');
        url = url.pop();

        return url;
    }

    useEffect(() => {
        setUrl(getCurrentDirectory());
    })

    return (
        <>
            <Navbar className="nav-bar" expand="lg" >
                <Navbar.Brand className="nav-bar-brand" href="/home"><img src={"images/navbar-gamerspace-logo.png"}></img> GamerSpace</Navbar.Brand>
                <Navbar.Toggle aria-controla="basic-navbar-nav" />
                <Navbar.Collapse id="nav-bar-collapse">
                    <Nav className="icons-container">
                        <Nav.Link href="/home">
                            <div className="icon-container">
                                {url == "home" ?
                                    <AiFillHome size={22}></AiFillHome>
                                    : <AiOutlineHome size={22}></AiOutlineHome>
                                }
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/">
                            <div className="icon-container">
                                <MdPeopleOutline size={22}></MdPeopleOutline>
                            </div>
                        </Nav.Link>

                        <Nav.Link href="/chat">
                            <div className="icon-container">
                                <FaRegComment size={22}></FaRegComment>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/profile">
                            <div className="icon-container">
                                {url == "profile" ?
                                    <FaUserCircle size={22}></FaUserCircle>
                                    : <FaRegUserCircle size={22}></FaRegUserCircle>
                                }
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/">
                            <div className="icon-container">
                                <FaRegBell size={22}></FaRegBell>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/">
                            <div className="icon-container">
                                <HiOutlineCog size={22}></HiOutlineCog>
                            </div>
                        </Nav.Link>
                    </Nav>
                    <Nav className="search">
                        <Form inline className="search-form">
                            <InputGroup>
                                <FormControl type="text" placeholder="Search Gamerspace" className="search-input"></FormControl>
                            </InputGroup>
                        </Form>
                    </Nav>
                </Navbar.Collapse>


            </Navbar>
        </>
    )

}

export default NavBar;