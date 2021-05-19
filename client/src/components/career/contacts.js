import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

import Profile from '../../imgs/profile.PNG'
import Github from '../../imgs/github-logo.svg'
import Linkedin from '../../imgs/LinkedIn_logo_In-Black.svg'

function Contact(props) {
    return (
        <Container as={Col} xl={6} className="contact-info">
            <h2 className="section-title-center">Contacts & Socials</h2>
            <Container as={Row} className="content contacts-content" noGutters>
                <Container as={Col} lg={3} xs={2} className="contacts-profile-wrapper" fluid>
                    <Image src={Profile} className="contacts-profile" roundedCircle/>
                </Container>
                <Container as={Col} lg={4} xs={6} className="contacts-social-wrapper" fluid>
                    <Container className="content-item full-name">Layton Seal</Container>
                    <Container className="content-item email">laytonseal@gmail.com</Container>
                    <Container as="a" href="https://www.linkedin.com/in/layton-seal/" className="social-link">
                        <Image src={Linkedin} className="social-logo"/>
                    </Container>
                    <Container as="a" href="https://github.com/Lay-ton" className="social-link">
                        <Image src={Github} className="social-logo" />
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}

export default Contact