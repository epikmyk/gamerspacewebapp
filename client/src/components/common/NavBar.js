import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import '../common/NavBar.css';

const NavBar = props => {
    
    return (
        <>
            <Navbar className="nav-bar" expand="lg" >
                <Navbar.Brand className="nav-bar-brand" href="/">GamerSpace</Navbar.Brand>
            </Navbar>
        </>
    )

}

export default NavBar;