import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import '../common/Signup.css';

const Signup = props => {

    return (
        <>
            <div className="signup">
                <div className="signup-left">
                    <h1>Sign Up</h1>
                    <p className="slogan">Meet gamers who play the same games you play.</p>
                    <p className="get-started">Get Started now.</p>
                    <p className="logo"><img src={"images/gamerspace-logo.png"}></img> Gamerspace</p>
                </div>
                <div className="signup-right">
                    <Form className="signup-form" method="POST" action="api/users/register" enctype="application/x-www-form-urlencoded">
                        <Form.Group controlId="form-email" size="lg">
                            <Form.Control type="email" placeholder="Email" name="email" required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="form-username" size="lg">
                            <Form.Control type="text" placeholder="Username" name="username" required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="form-password" size="lg">
                            <Form.Control type="password" placeholder="Password" name="password" required></Form.Control>
                        </Form.Group>
                        <Button className="signup-button" variant="primary" type="submit">Sign Up</Button>
                    </Form>
                    <p className="sign-in">Already have an account? <a href="#">Sign In</a></p>
                </div>
            </div>
        </>
    )
}

export default Signup;