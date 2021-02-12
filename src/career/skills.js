import React from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

function Skills(props) {
    let types = {}
    let rows = {}

    //Need to figure out how to return this as a object
    const items = Object.entries(props.skills).map(([type, skill]) => (
        rows = {...types, [type]: skill.reduce(function(rows, key, index) {
            return (index % 6 == 0 ? rows.push([<Container as="li">{key}</Container>]) 
                : rows[rows.length-1].push(<Container as="li">{key}</Container>)) && rows;
            // return 
        }, [])})
    );

    let b = {}

    console.log(items)
    const sections = items.map(item => {
        // Object.entries(item).map(([key,values]) => {
            
        // })
        console.log(item)
        return (item)
            // return (<Container as={Col} className="${key}-skills" fluid>
            //             <h4 className="section-sub-title-center">{key}</h4>
            //             <Container as="ul" className="skill-list" fluid>
            //                 <Container as={Row} className="skills-table" fluid>
            //                     {/* <> */}
            //                         {values}
            //                         {/* {Object.values.map(value => (
            //                             <Container as={Col} className="col-primary">
            //                                 {value}
            //                             </Container>
            //                         ))} */}
            //                     {/* </> */}
            //                     <Container as={Col} className="col-primary">
            //                         <Container as="li">Git</Container>
            //                         <Container as="li">Python</Container>
            //                         <Container as="li">SQL</Container>
            //                         <Container as="li">Javascript</Container>
            //                         <Container as="li">bash</Container>
            //                         <Container as="li">x86-assembly</Container>
            //                     </Container>
            //                     <Container as={Col} className="col-remaining">
            //                         <Container as="li">HTML/CSS</Container>
            //                         <Container as="li">SCSS</Container>
            //                         <Container as="li">React</Container>
            //                         <Container as="li">Selenium</Container>
            //                         <Container as="li">Wireshark</Container>
            //                         <Container as="li">Kali Linux</Container>
            //                     </Container>
            //                 </Container>
            //             </Container>
            //         </Container>)
        
    })
    console.log(sections)
    
    return (
        <Container as={Col} lg={6} className="skills-info">
        <h2 className="section-title">Skills</h2>
        <Container as={Row} noGutters>
            {sections}
            {/* <Container as={Col} className="experienced-skills" fluid>
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
                </Container> */}
        </Container>
    </Container>
    );
}

export default Skills;