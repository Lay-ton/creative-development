import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Projects(props) {

    //Generates the job positions
    const projects = props.projects.map((project) =>
        <Container className="content project-content">
            <Container as={Row} noGutters fluid>
                <Container as={Col} xs={8} className="content-item place-position"><b>{project.name} ({project.tech})</b></Container>
                <Container as={Col} xs={4} className="content-item date-range">{project.date}</Container>
            </Container>
            <Container as="ul" className="content-item content-list project-list" fluid>
                <Container as={Row} className="project-table" fluid>
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
        <Container as={Row} className="project-info" noGutters>
            <h2 className="section-title">Projects</h2>
            {projects}
        </Container>
    )
}

export default Projects;