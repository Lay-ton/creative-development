import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Experience(props) {

    //Generates the job positions
    const jobs = props.jobs.map((job) =>
        <Container className="content experience-content">
            <Container as={Row} noGutters fluid>
                <Container as={Col} xs={8} className="content-item place-position"><b>{job.name}</b> - {job.position}; {job.location}</Container>
                <Container as={Col} xs={4} className="content-item date-range">{job.dates}</Container>
            </Container>
            <Container as="ul" className="content-item content-list experience-list" fluid>
                <Container as={Row} className="experience-table" fluid>
                    <>
                    {job.tasks.map((task) => {
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
        <Container as={Row} className="experience-info" noGutters>
            <h2 className="section-title">Experience</h2>
            {jobs}
        </Container>
    )
}

export default Experience;