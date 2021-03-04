import React from "react";
import { NavDropdown } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { withRouter } from "react-router";
import "./sidebar.scss";

function Sidebar(props) {
  const { location } = props;

  return (
    <Container className="site-nav" fluid>
        <Navbar bg="dark" variant="dark" expand="sm" className="flex-lg-column">
            <Navbar.Brand href="/">Layton</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav activeKey={location.pathname} className="mr-auto flex-lg-column">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/posters">Photos/Posters</Nav.Link>
              <Nav.Link href="/career">Experience</Nav.Link>
              <Nav.Link href="/workshop">Workshop</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
  );
}

export default Sidebar;