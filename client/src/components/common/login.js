import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/auth';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        e.stopPropagation();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setLoading(false);
        } else {
            dispatch(login(username, password))
            .then(() => {
                props.history.push('/');
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
        }
    
        setValidated(true);
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <Container className="login__wrapper">
            <Card border="dark" className="login-body">
                <Card.Title className="login-title">Login</Card.Title>
                <Form noValidate validated={validated} onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label htmlFor="username" className="login-form-title">Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a username
                        </Form.Control.Feedback>
                    </Form.Group>
                        
                    <Form.Group>
                        <Form.Label htmlFor="password" className="login-form-title">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className="submit-btn__wrapper">
                        <Button type="submit" variant="info" disabled={loading} className="submit-btn">
                            {loading && (
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            )}
                            Login
                        </Button>
                    </Form.Group>

                    {message && (
                        <Form.Group>
                            <Alert variant="danger">{message}</Alert>
                        </Form.Group>
                    )}
                </Form>
            </Card>
        </Container>
    );
}

export default Login;