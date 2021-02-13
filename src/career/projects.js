import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Projects(props) {

    //Generates the job positions
    const projects = props.projects.map((project) =>
        <Container as={Row} className="experience-content">
            <Container as={Row}>
                <Container as={Col} className="experience_place-position"><b>{project.name} ({project.tech})</b></Container>
                <Container as={Col} className="experience_date-range">{project.date}</Container>
            </Container>
            <Container as="ul" className="experience-list" fluid>
                <Container as={Row} className="experience-table" fluid>
                    <>
                    {project.tasks.map((task) => {
                        return (
                            <Container as="li">{task}</Container>
                        );
                    })}
                    </>
                </Container>
            </Container>
        </Container>
    )
    
    return (
        <Container as={Row} noGutters>
            <h2 className="section-title">Projects</h2>
            {projects}
        </Container>
    )
}

export default Projects;