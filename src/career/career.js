import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import Github from '../imgs/github-logo.svg'
import Linkedin from '../imgs/LinkedIn_logo_In-Black.svg'
import './career.scss'

function Career() {
    return (
        <Container className="career-body page">
            <Container as={Row} fluid>
                <Container as={Col} lg={6} className="contact-info">
                    <h2 className="section-title">Contacts & Socials</h2>
                    <Container className="contacts-content">
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
                {/* For the skills section comeback and write a component for these lists */}
                <Container as={Col} lg={6} className="skills-info">
                    <h2 className="section-title">Skills</h2>
                    <Container as={Row} noGutters>
                        <Container as={Col} className="experienced-skills" fluid>
                            <h4 className="section-sub-title-center">Experienced</h4>
                            <Container as="ul" className="skill-list" fluid>
                                <Container as={Row} className="skills-table" fluid>
                                    <Container as={Col} className="col-primary">
                                        <Container as="li">Git</Container>
                                        <Container as="li">Python</Container>
                                        <Container as="li">SQL</Container>
                                        <Container as="li">Javascript</Container>
                                        <Container as="li">bash</Container>
                                        <Container as="li">x86-assembly</Container>
                                    </Container>
                                    <Container as={Col} className="col-remaining">
                                        <Container as="li">HTML/CSS</Container>
                                        <Container as="li">SCSS</Container>
                                        <Container as="li">React</Container>
                                        <Container as="li">Selenium</Container>
                                        <Container as="li">Wireshark</Container>
                                        <Container as="li">Kali Linux</Container>
                                    </Container>
                                </Container>
                            </Container>
                        </Container>
                        <Container as={Col} className="familiar-skills" fluid>
                            <h4 className="section-sub-title-center">Familiar</h4>
                            <Container as="ul" className="skill-list" fluid>
                                <Container as={Row} className="skills-table" fluid>
                                    <Container as={Col} className="col-primary">
                                        <Container as="li">C/C++</Container>
                                        <Container as="li">Java</Container>
                                        <Container as="li">PHP</Container>
                                        <Container as="li">Docker</Container>
                                        <Container as="li">Kubernetes</Container>
                                        <Container as="li">Flask</Container>
                                    </Container>
                                    <Container as={Col} className="col-remaining">
                                        <Container as="li">Express</Container>
                                        <Container as="li">AWS</Container>
                                        <Container as="li">Jenkins</Container>
                                    </Container>
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Container>
            <Container as={Row} className="education-info">
                <h2 className="section-title">Education</h2>
                <Container className="education-content">
                    <Container as={Row} fluid>
                        <Container as={Col} className="content-item degree-name">Bachelor of Science in Computer Science</Container>
                        <Container as={Col} className="content-item grad-date">December 2020</Container>
                    </Container>
                    <Container as={Row} fluid>
                        <Container as={Col} className="content-item school-name"><i>University of Texas at Austin,</i> Austin, Texas</Container>
                        <Container as={Col} className="content-item gpa-num">GPA: 3.58</Container>
                    </Container>
                     {/* Need to add a header for course work right here */}
                     <h4 className="section-sub-title">Coursework</h4>
                    <Container className="content-item coursework">Discrete Mathematics, Data Structures, Object Oriented Programming, Computer Architecture, Operating Systems, Virtualization, Algorithms, Cloud Computing, Compilers, Ethical Hacking, Symbolic Programming, Contemporary Issues in Computer Science, Intro to Security</Container>
                </Container>
            </Container>
            <Container as={Row}>
                <h2 className="section-title">Projects</h2>
            </Container>
        </Container>
    )
}

export default Career;