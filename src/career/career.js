import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

import Skills from './skills'
import Profile from '../imgs/IMG_3378.png'
import Github from '../imgs/github-logo.svg'
import Linkedin from '../imgs/LinkedIn_logo_In-Black.svg'
import './career.scss'

const info = {
    skills: {
        "Experienced": ["Python", "SQL", "Javascript", "x86 assembly", "bash", "HTML/CSS", "React", "Selenium", "Kali Linux", "Wireshark", "Git", "SCSS"],
        "Familiar": ["C/C++", "Java", "PHP", "Docker", "Kubernetes", "Flask", "Express", "AWS", "Jenkins"],
    },
    experience: [
        {
            name: "VMware",
            position: "Software Engineer Intern, VM Kernel I/O Team",
            location: "Remote",
            dates: "May 2020 - August 2020",
            tasks: [
                "Designed and engineered a database/interface for an internal tool used to maintain driver test data",
                "Created several threaded automation scripts to allow for data processing and optimizations for queries",
                "Created API to run tests, have data posted automatically, and be queried in browser or via code",
                "Utilized Python and MySQL"
            ]
        },
        {
            name: "UT Austin: Center for Media Engagement",
            position: "Web Developer",
            location: "Austin, Texas",
            dates: "June 2019 - December 2020",
            tasks: [
                "Help journalism research by developing web-based experiments",
                "Design, implement, and maintain the new website redesign",
                "Work with PHP, Laravel, WordPress, Sass, SQL, Javascript, and Git"
            ]
        }
    ],
    projects: [
        {
            name: "Payne Employee Website",
            tech: "React/SCSS/Javascript",
            type: "Personal Project",
            date: "December 2020",
            tasks: [
                "A web app for employees to pick out company uniforms",
                "Utilized React and Bootstrap to keep a mobile first approach when designing the layout",
                "Created admin panel for the merchandisers, allowing for easy editing and additions of new products",
                "Designed and constructed an SQL database to store products and orders",
                "Worked with node Express to create an API for the database for retrieving and adding new products"
            ]
        },
        {
            name: "Bill Paying Software/Script",
            tech: "Python, SQL, Selenium",
            type: "Personal Project",
            date: "Summer 2019",
            tasks: [
                "Script that stores billing statements from email account in an SQL database and once all bills for that month are in, request confirmation via text and pay bills",
                "Utilizes Gmail API to get billing statements",
                "Designed an SQL database to sort monthly bills",
                "Worked with Selenium to pay each individual bill via website"
            ]
        },
        {
            name: "Multithreading Test Script",
            tech: "Python",
            type: "Personal Project",
            date: "Spring 2019",
            tasks: [
                "A python script that finds four Computer Science lab computer with the lowest load, then concurrently ssh's onto them and runs the designated number of tests for my Operating Systems course",
                "Scraped a university website to find machines using BeautifulSoup",
                "Applied the concept of threading to ssh and run tests concurrently",
                "Utilized bash to create and display results to a file"
            ]
        }
    ]
}

function Career(props) {
    return (
        <Container className="career-body page">
            <Container as={Row}>
                <Container as={Col} lg={6} className="contact-info">
                    <h2 className="section-title">Contacts & Socials</h2>
                    <Container as={Row} className="content contacts-content">
                        {/* Add a profile picture that sit to the left of all the content */}
                        <Container as={Col} xs={1} fluid>
                            <Image src={Profile} className="contacts-profile" roundedCircle/>
                        </Container>
                        <Container as={Col} xs={4} fluid>
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
                <Skills skills={info.skills}/>
            </Container>
            <Container as={Row} className="education-info" noGutters>
                <h2 className="section-title">Education</h2>
                <Container className="content education-content">
                    <Container as={Row} noGutters fluid>
                        <Container as={Col} className="content-item degree-name">Bachelor of Science in Computer Science</Container>
                        <Container as={Col} className="content-item grad-date">December 2020</Container>
                    </Container>
                    <Container as={Row} noGutters fluid>
                        <Container as={Col} className="content-item school-name"><i>University of Texas at Austin,</i> Austin, Texas</Container>
                        <Container as={Col} className="content-item gpa-num">GPA: 3.58</Container>
                    </Container>
                     {/* Need to add a header for course work right here */}
                     <h4 className="section-sub-title">Coursework</h4>
                    <Container className="content-item coursework">Discrete Mathematics, Data Structures, Object Oriented Programming, Computer Architecture, Operating Systems, Virtualization, Algorithms, Cloud Computing, Compilers, Ethical Hacking, Symbolic Programming, Contemporary Issues in Computer Science, Intro to Security</Container>
                </Container>
            </Container>
            <Container as={Row} noGutters>
                <h2 className="section-title">Experience</h2>
            </Container>
            <Container as={Row} noGutters>
                <h2 className="section-title">Projects</h2>
            </Container>
        </Container>
    )
}

export default Career;