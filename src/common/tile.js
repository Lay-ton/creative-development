import React from "react";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card'

import './tile.scss'


function Tile(props) {

    const images = require.context(`../imgs/posters/${props.image}`, true);
    
    return (
        <Card border="dark" className={`tile-type-${props.type}`}>
            <Card.Img className="tile-image" variant="top" src={images(`./${props.image}.jpg`).default} />
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