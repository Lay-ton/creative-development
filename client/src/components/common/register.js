import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';

import { register } from '../../actions/auth';

// Username input is valid as long as its 4-20 characters
const validUsername = (value) => {
    const regex = /[A-Za-z\d]{4,20}$/g;
    let found = value.match(regex);
    if (found !== null && found[0]) {
        return true;
    }
    return false;
};


const validEmail = (value) => {
    if (isEmail(value)) {
        return true;
    }
    return false;
};

// If password is minimum 8 characters long, has at least one uppercase letter, one 
// lowercase, and special character it is deemed valid
const validPassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/g;
    let found = value.match(regex);
    if (found !== null && found[0]) {
        return true;
    }
    return false;
};

function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [succesful, setSuccessful] = useState(false);
    const [validated, setValidated] = useState({
        vusername: false,
        vemail: false,
        vpassword: false,
    });

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
        e.stopPropagation();

        const form = e.currentTarget;
        if (form.checkValidity() === false || !validUsername(username)
        || !validEmail(email) || !validPassword(password)) {
            setSuccessful(false);
        } else {
            dispatch(register(username, email, password))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
        }
    
        setValidated({
            vusername: !validUsername(username),
            vemail: !validEmail(email),
            vpassword: !validPassword(password)
        });
    }

    return (
        <Container className="register__wrapper">
            <Card border="dark" className="register-body">
                <Card.Title className="register-title">Sign Up</Card.Title>
                <Form noValidate onSubmit={handleRegister}>
                    {!succesful && (
                        <Container>
                            <Form.Group>
                                <Form.Label htmlFor="username" className="register-form-title">Username</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={onChangeUsername}
                                    isInvalid={validated.vusername}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Username must 4 to 20 characters and can only be letters and numbers.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="email" className="register-form-title">Email</Form.Label>
                                <Form.Control 
                                    type="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    onChange={onChangeEmail}
                                    isInvalid={validated.vemail}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="password" className="register-form-title">Password</Form.Label>
                                <Form.Control 
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={onChangePassword}
                                    isInvalid={validated.vpassword}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password must be 8 to 40 characters and contain at least one uppercase letter, 
                                    one lowercase letter, one number, and one special character.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="submit-btn__wrapper">
                                <Button type="submit" variant="info" className="submit-btn">Sign Up</Button>
                            </Form.Group>
                        </Container>
                    )}

                    {message && (
                        <Form.Group>
                            <Alert variant="successful">{message}</Alert>
                        </Form.Group>
                    )}
                    

                </Form>
            </Card>
        </Container>
    );
}

export default Register;