import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Experience(props) {

    console.log(props.jobs)
    //Generates the job positions
    const jobs = props.jobs.map((job) =>
        <Container as={Row} className="experience-content">
            <Container as={Row}>
                <Container as={Col} className="experience_place-position"><b>{job.name}</b> - {job.position}; {job.location}</Container>
                <Container as={Col} className="experience_date-range">{job.dates}</Container>
            </Container>
            <Container as="ul" className="experience-list" fluid>
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
        <Container as={Row} noGutters>
            <h2 className="section-title">Experience</h2>
            {jobs}
        </Container>
    )
}

export default Experience;