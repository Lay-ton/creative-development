import React from "react";
import { Link } from 'react-router-dom'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card'

import './tile.scss'


function Tile({link, type, id, title, image_context, image, price}) {    
    return (
        <Card border="dark" className={`tile_wrapper tile-type-${type}`}>
            <Link to={{
                pathname: link,
                search: `?photo_id=${id}`
            }}>
            <Card.Img className="tile-image" variant="top" src={`/imgs/${image_context}/${image}/${image}.jpg`} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <small className="text-muted">
                        {price}
                    </small>
                </Card.Text>
            </Card.Body>
            </Link>
        </Card>
    )
}

export default Tile;