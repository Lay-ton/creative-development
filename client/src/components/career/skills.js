import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Skills(props) {
    let types = {}

    // Breaks down the array of skills into the desired 6 per a col format
    // Note: Maybe come back here and clean this up to make it responsive
    let rows = Object.entries(props.skills).map(([type, skill]) => (
    skill.reduce(function (rows, key, index) { 
        return (index % 6 === 0 ? rows.push([<Container as="li">{key}</Container>]) 
                : rows[rows.length-1].push(<Container as="li">{key}</Container>)) && rows;
      }, [])));

    // Creates the dictionary with proper assortment
    Object.keys(props.skills).map((keyName, i) => (
        types[keyName] = rows[i]
    ))

    // Generates the skills section, taking each skill type and displaying it accordingly
    const sections = Object.entries(types).map(([keys, skills]) => 
        <Container as={Col} xl={6} className={`${keys.toLowerCase()}-skills skills`} fluid>
        <h4 className="section-sub-title-center">{keys}</h4>
        <Container as="ul" className="skill-list" fluid>
            <Container as={Row} className="skills-table" fluid>
                <>
                {skills.map((skill, index) => {
                    return (
                        <Container as={Col} className={"col-" + (index === 0 ? 'primary' : 'remaining')}>
                            {skill}
                        </Container>
                    );
                })}
                </>
            </Container>
        </Container>
    </Container>
    )
    
    return (
        <Container as={Col} xl={6} className="skills-info">
        <h2 className="section-title-center">Skills</h2>
        <Container as={Row} className="skills-wrapper" fluid noGutters>
            {sections}
        </Container>
    </Container>
    );
}

export default Skills;