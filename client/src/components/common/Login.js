import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import NavBar from '../common/NavBar';
import '../common/Login.css';

const Login = props => {

    return (
        <>
            <div className="login">
                <div className="login-left">
                    <h1>Login</h1>
                    <p className="welcome">Welcome back.</p>
                    <p className="logo"><img src={"images/gamerspace-logo.png"}></img> Gamerspace</p>
                </div>
                <div className="login-right">
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
                    <p className="sign-up">Don't have an account? <a href="/">Sign Up</a></p>
                </div>
            </div>
        </>
    )

}

export default Login;