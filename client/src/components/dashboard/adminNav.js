import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'



function adminNav(props) {
    const location = window.location.pathname.split('/')[1];

    return (
        <Container className="admin-nav" fluid>
            <Navbar variant="dark">
                <Nav className="mr-auto">
                    { location == "dashboard" ? (
                        <Nav.Link href="/">Main Site</Nav.Link>
                    ) : (
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    )}  
                    <Nav.Link href="/">Products</Nav.Link>
                    <Nav.Link href="/">Orders</Nav.Link>
                </Nav>
            </Navbar>
        </Container>
    )
}

export default adminNav;