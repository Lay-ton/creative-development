import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'

import './poster.scss';

const prices = {
    "14x11": "$11.00",
    "12x12": "$13.00",
    "18x12": "$14.00",
    "20x8": "$14.00",
    "20x16": "$18.00",
    "30x20": "$25.00",
    "36x24": "$30.00",
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
    desc: "A few miles into our hike towards Gunsight Pass in Glacier National Park, Montana. This shot is directed towards the mountain that sits behind the Twin Lakes.",
    price_range: "$10-$25"
}

function Poster(props) {
    const [size, setSize] = useState("14x11")
    const [poster, setPoster] = useState([])
    const query = props.location.search;

    useEffect(() => {
        fetch(`/photography${query}`).then(response => 
            response.json().then(data => {
                setPoster(data.data[0]);
            })
        );
    }, [])

    console.log(poster)
    const images = Object.values(sizes).map((dim) =>
        <Tab.Pane className="poster-img__wrapper" eventKey={dim}>
            <Image className={`poster-img img-dim_${dim}`} src={`/imgs/posters/${poster.image_name}/${poster.image_name}_${dim}.jpg`} />
        </Tab.Pane>
    )

    const options = Object.entries(sizes).map(([key, dim]) =>
        <Nav.Item as={Col} lg={4}>
            <Nav.Link eventKey={dim} onClick={() => setSize(dim)}>{key}</Nav.Link>
        </Nav.Item>
    )

    return (
        <Container className="poster-body page">
            <h2 className="section-title">{poster.title}</h2>
            <Tab.Container id="left-tabs-example" defaultActiveKey={"14x11"}>
                <Container as={Row} noGutters>
                    <Tab.Content className="" as={Col} lg={7}>
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
            <Container as={Row}>
                {poster.description}
            </Container>            
        </Container>
    );
}

export default Poster;