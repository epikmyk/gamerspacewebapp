import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import '../common/Signup.css';

const Signup = props => {

    return (
        <>
            <div className="signup">
                <Form className="signup-form" method="POST" action="api/users/register" enctype="application/x-www-form-urlencoded">
                    <Form.Text className="create-an-account">Create An Account</Form.Text>
                    <Form.Group controlId="form-email" size="lg">
                        <Form.Control type="email" placeholder="Email" name="email" required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-username" size="lg">
                        <Form.Control type="text" placeholder="Username" name="username" required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-password" size="lg">
                        <Form.Control type="password" placeholder="Password" name="password" required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-confirm-password" size="lg">
                        <Form.Control type="password" placeholder="Confirm Password" name="confirm-password" required></Form.Control>
                    </Form.Group>
                    <Button className="signup-button" variant="primary" type="submit">Sign Up</Button>
                </Form>
            </div>
        </>
    )

}

export default Signup;