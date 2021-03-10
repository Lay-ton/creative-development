import React from "react";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import './tile.scss';


function Tile(props) {    
    return (
        <Container as={Col} lg={4} className="tile_wrapper">
            <Card border="dark" className={`tile tile-type-${props.type}`}>
                <Link to={{
                    pathname: props.link,
                    search: `?photo_id=${props.id}`
                }}>
                <Card.Img className="tile-image" variant="top" src={`/imgs/${props.image_context}/${props.image}/${props.image}.jpg`} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        <small className="text-muted">
                            {props.price}
                        </small>
                    </Card.Text>
                </Card.Body>
                </Link>
            </Card>
        </Container>
    )
}

export default Tile;