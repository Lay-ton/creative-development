import React from "react";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card'

import Test from "../imgs/0000809_0000809-R1-006-1A.JPG";
import './tile.scss'


function Tile(props) {

    const images = require.context('../imgs', true);
    
    return (
        <Card border="dark" className={`tile-type-${props.type}`}>
            <Card.Img className="tile-image" variant="top" src={images(`./${props.image}.JPG`).default} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    <small className="text-muted">
                        {props.price}
                    </small>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Tile;