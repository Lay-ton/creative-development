import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { withRouter } from "react-router";
import { history } from "../../helpers/history";
import { clearMessage } from '../../actions/message';
import { logout } from '../../actions/auth';

function Navigation(props) {
    const location = window.location.pathname.split('/')[1];
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
          dispatch(clearMessage()); // clear message when changing location
        });
      }, [dispatch]);

    const logOut = () => {
        dispatch(logout());
    }

    return (
        <Container className="site-nav" fluid>
            <Navbar bg="dark" variant="dark" expand="sm">
                <Container className="justify-content-center">
                    <Navbar.Brand href="/">Art</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav activeKey={"/" + location} className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/photography">Photos/Posters</Nav.Link>
                            <Nav.Link href="/career">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {currentUser ? (
                        <Nav>
                            <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                            <a href={window.location.pathname} className="nav-link" onClick={logOut}>
                                Logout
                            </a>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Sign up</Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </Container>
    );
}

export default withRouter(Navigation);