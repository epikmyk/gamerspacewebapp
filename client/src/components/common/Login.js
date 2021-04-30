import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import NavBar from '../common/NavBar';
import '../common/Login.css';

const Login = props => {

    return (
        <>
            <NavBar />
            <div className="main-login">
                <div className="login">
                    <Form className="login-form" method="POST" action="api/users/login" enctype="application/x-www-form-urlencoded">
                        <Form.Text className="login-header">Log In</Form.Text>
                        <Form.Group controlId="form-username" size="lg">
                            <Form.Control type="text" placeholder="Username" name="username" required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="form-password" size="lg">
                            <Form.Control type="password" placeholder="Password" name="password" required></Form.Control>
                        </Form.Group>
                        <Button className="login-button" variant="primary" type="submit">Log In</Button>
                    </Form>
                </div>
            </div>
        </>
    )

}

export default Login;