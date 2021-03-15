import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Skills from './skills'
import Listing from './listings'
import Contact from './contacts'
import './career.scss'

const info = {
    skills: {
        "Experienced": ["Python", "SQL", "Javascript", "x86 assembly", "bash", "HTML/CSS", "React", "Selenium", "Kali Linux", "Wireshark", "Git", "SCSS"],
        "Familiar": ["C/C++", "Java", "PHP", "Docker", "Kubernetes", "Flask", "Express", "AWS", "Jenkins"],
    },
    experience: [
        {
            bold: "VMware",
            none: " - Software Engineer Intern, VM Kernel I/O Team; Remote",
            dates: "May 2020 - August 2020",
            tasks: [
                "Designed and engineered a database/interface for an internal tool used to maintain driver test data",
                "Created several threaded automation scripts to allow for data processing and optimizations for queries",
                "Created API to run tests, have data posted automatically, and be queried in browser or via code",
                "Utilized Python and MySQL"
            ]
        },
        {
            bold: "UT Austin: Center for Media Engagement",
            none: " - Web Developer; Austin, Texas",
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
            bold: "Payne Employee Website (React/SCSS/Javascript)",
            none: "",
            dates: "December 2020",
            tasks: [
                "A web app for employees to pick out company uniforms",
                "Utilized React and Bootstrap to keep a mobile first approach when designing the layout",
                "Created admin panel for the merchandisers, allowing for easy editing and additions of new products",
                "Designed and constructed an SQL database to store products and orders",
                "Worked with node Express to create an API for the database for retrieving and adding new products"
            ]
        },
        {
            bold: "Bill Paying Software/Script (Python, SQL, Selenium)",
            none: "",
            dates: "Summer 2019",
            tasks: [
                "Script that stores billing statements from email account in an SQL database and once all bills for that month are in, request confirmation via text and pay bills",
                "Utilizes Gmail API to get billing statements",
                "Designed an SQL database to sort monthly bills",
                "Worked with Selenium to pay each individual bill via website"
            ]
        },
        {
            bold: "Multithreading Test Script (Python)",
            none: "",
            dates: "Spring 2019",
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
            <Container as={Row} noGutters fluid>
                <Contact/>
                <Skills skills={info.skills}/>
            </Container>
            <Container as={Row} className="education-info" noGutters>
                <h2 className="section-title-center">Education</h2>
                <Container className="content education-content">
                    <Container as={Row} noGutters fluid>
                        <Container as={Col} sm={8} fluid>
                            <Container className="content-item degree-name">Bachelor of Science in Computer Science</Container>
                            <Container className="content-item school-name"><i>University of Texas at Austin,</i> Austin, Texas</Container>
                        </Container>
                        <Container as={Col} sm={4} className="text-sm-right" fluid>
                            <Container className="content-item grad-date text-xs-right">December 2020</Container>
                            <Container className="content-item gpa-num text-xs-right">GPA: 3.58</Container>
                        </Container>
                    </Container>
                        <h4 className="section-sub-title">Coursework</h4>
                    <Container className="content-item education-coursework">Discrete Mathematics, Data Structures, Object Oriented Programming, Computer Architecture, Operating Systems, Virtualization, Algorithms, Cloud Computing, Compilers, Ethical Hacking, Symbolic Programming, Contemporary Issues in Computer Science, Intro to Security</Container>
                </Container>
            </Container>
            <Listing title="Experience" slug="experience" entries={info.experience}/>
            <Listing title="Projects" slug="project" entries={info.projects}/>
        </Container>
    )
}

export default Career;