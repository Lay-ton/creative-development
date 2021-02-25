import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Listing(props) {

    //Generates the job positions
    const jobs = props.entries.map((entry) =>
        <Container className={`content ${props.slug}-content`}>
            <Container as={Row} noGutters fluid>
                <Container as={Col} xs={8} className="content-item place-position"><b>{entry.bold}</b>{entry.none}</Container>
                <Container as={Col} xs={4} className="content-item date-range">{entry.dates}</Container>
            </Container>
            <Container as="ul" className={`content-item content-list ${props.slug}-list`} fluid>
                <Container as={Row} className="${props.slug}-table" fluid>
                    <>
                    {entry.tasks.map((task) => {
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
        <Container as={Row} className={`${props.slug}-info`} noGutters>
            <h2 className="section-title">{props.title}</h2>
            {jobs}
        </Container>
    )
}

export default Listing;