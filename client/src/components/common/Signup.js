import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import '../common/Signup.css';

const Signup = props => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameExistsMessage, setUsernameExistsMessage] = useState("");
    const [emailExistsMessage, setEmailExistsMessage] = useState("");

    const validateEmail = () => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    }

    const validateUsername = () => {
        if (username.length > 3) {
            return true;
        }
        else {
            return false;
        }
    }

    const validatePassword = () => {
        if (password.length > 3) {
            return true;
        }
        else {
            return false;
        }
    }

    const checkUsername = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.value,
        }
        fetch('/api/users/checkUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                (res.message === "Username already taken." ? setUsernameExistsMessage(res.message) : setUsernameExistsMessage(""))
            })
            .catch(err => err)
    }

    const checkEmail = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.value,
        }
        fetch('/api/users/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                (res.message === "Email already taken." ? setEmailExistsMessage(res.message) : setEmailExistsMessage(""))
            })
            .catch(err => err)
    }

    const signUp = (e) => {
        e.preventDefault();
        if (usernameExistsMessage === "" && emailExistsMessage === "" && validateEmail() && validateUsername() && validatePassword()) {
            const data = {
                username: username,
                email: email,
                password: password
            }
            fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.message === "User registration successful") {
                        return fetch('/api/users/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        })
                    }
                    window.location.href = "/"
                })
                .then(res => res.json())
                .then(res => {
                    (res.message !== "login successful") ? setErrorMessage(res.message) : window.location.href = "/"
                })
                .catch(err => err)
        }
        else {
            console.log("data not valid")
        }
    }

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
                    <Form className="signup-form">
                        <Form.Group controlId="form-email" size="lg">
                            <div className="email-exists">{emailExistsMessage}</div>
                            <Form.Control className="email-form-control" type="email" placeholder="Email" name="email" onChange={(e) => { setEmail(e.target.value); checkEmail(e) }} required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="form-username" size="lg">
                            <div className="username-exists">{usernameExistsMessage}</div>
                            <Form.Control className="username-form-control" type="text" placeholder="Username" name="username" onChange={(e) => { setUsername(e.target.value); checkUsername(e) }} required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="form-password" size="lg">
                            <Form.Control className="password-form-control" type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} required></Form.Control>
                        </Form.Group>
                        <Button className="signup-button" type="submit" onClick={signUp}>Sign Up</Button>
                    </Form>
                    <p className="sign-in">Already have an account? <a href="/login">Sign In</a></p>
                </div>
            </div>
        </>
    )
}

export default Signup;