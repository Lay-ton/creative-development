import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import "./nav.scss";

function Navigation(props) {
  const { location } = window.location.pathname.split('/')[1];

  return (
    <Container className="site-nav" fluid>
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container className="justify-content-center">
                <Navbar.Brand href="/">Layton</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={"/" + location} className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/photography">Photos/Posters</Nav.Link>
                        <Nav.Link href="/career">Experience</Nav.Link>
                        <Nav.Link href="/workshop">Workshop</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </Container>
  );
}

export default Navigation;