import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'

import Test from '../imgs/0000809_0000809-R1-006-1A.JPG';
import './poster.scss';

const prices = {
    "14\"X11\"": "$11.00",
    "12\"X12\"": "$13.00",
    "18\"X12\"": "$14.00",
    "20\"X8\"": "$14.00",
    "20\"X16\"": "$18.00",
    "30\"X20\"": "$25.00",
    "36\"X24\"": "$30.00",
}

const sizes = {
    "14\"X11\"": "14x11",
    "12\"X12\"": "12x12",
    "18\"X12\"": "18x12",
    "20\"X8\"": "20x8",
    "20\"X16\"": "20x16",
    "30\"X20\"": "30x20",
    "36\"X24\"": "36x24",
}

const poster = {
    image: "0000809_0000809-R1-006-1A",
    title: "Between Reynolds Mt. and Fusillade Mt.",
    summary: "A few miles into our hike towards Gunsight Pass in Glacier National Park, Montana. This shot is directed towards the mountain that sits behind the Twin Lakes.",
    price_range: "$10-$25"
}

function Poster(props) {
    const imgs = require.context('../imgs', true);
    const [size, setSize] = useState("11\"X14\"")

    const images = Object.keys(sizes).map((dim) =>
        <Tab.Pane eventKey={dim}>
            <Image src={imgs(`./${poster.image}.JPG`).default} />
        </Tab.Pane>
    )

    const options = Object.keys(sizes).map((dim) =>
        <Nav.Item as={Col} lg={4}>
            <Nav.Link eventKey={dim} onClick={() => setSize(dim)}>{dim}</Nav.Link>
        </Nav.Item>
    )

    return (
        <Container className="poster-body page">
            <h2 className="section-title">{poster.title}</h2>
            <Tab.Container id="left-tabs-example" defaultActiveKey={"11\"X14\""}>
                <Container as={Row} noGutters>
                    <Tab.Content as={Col} lg={7}>
                        {images}
                    </Tab.Content>
                    <Container as={Col} lg={5}>
                        <Nav variant="pills" className="flex-column">
                            <Container as={Row}>
                                {options}
                            </Container>
                        </Nav>
                        <Container>
                            {prices[size]}
                        </Container>
                    </Container>
                </Container>
            </Tab.Container>            
        </Container>
    );
}

export default Poster;