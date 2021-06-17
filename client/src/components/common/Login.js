import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../common/Login.css';

const Login = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (e) => {
        console.log("logging in")
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }
        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            (res.message !== "login successful") ? setErrorMessage(res.message) : window.location.href = "/"
        })
        .catch(err => err)
    }

    return (
        <>
            <div className="login">
                <div className="login-left">
                    <h1>Login</h1>
                    <p className="welcome">Welcome back.</p>
                    <p className="logo"><img src={"images/gamerspace-logo.png"}></img> Gamerspace</p>
                </div>
                <div className="login-right">
                    <div className="login-error-message">{errorMessage}</div>
                    <Form className="login-form" id="login-form">
                        <Form.Group controlId="form-username" size="lg">
                            <Form.Control type="text" placeholder="Username" name="username" onChange={(e) => {setUsername(e.target.value)}} required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="form-password" size="lg">
                            <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => {setPassword(e.target.value)}} required></Form.Control>
                        </Form.Group>
                        <Button className="login-button" onClick={login}>Log In</Button>
                    </Form>
                    <p className="sign-up">Don't have an account? <a href="/">Sign Up</a></p>
                </div>
            </div>
        </>
    )
}

export default Login;