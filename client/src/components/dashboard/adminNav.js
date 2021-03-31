import React from 'react';
import Container from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'




function adminNav(props) {
    return (
        <Navbar>
            <Nav className="mr-auto">
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="/">Products</Nav.Link>
                <Nav.Link href="/">Orders</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default adminNav;