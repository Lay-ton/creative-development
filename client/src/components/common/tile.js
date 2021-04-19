import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import './tile.scss';

const tileLinks = {
    "photo" : "/photography/poster"
}


function Tile(props) {    
    const [data, setData] = useState(props.data);
    
    return (
        <Container as={Col} lg={4} className="tile_wrapper">
            <Card border="dark" className={`tile tile-type-${props.type}`}>
                <Link to={{
                    pathname: `${tileLinks[data.typeTable]}/${data.id}`,
                }}>
                <Card.Img className="tile-image" variant="top" src={`/imgs/${data.typeTable}/${data.image}/${data.image}.jpg`} />
                <Card.Body>
                    <Card.Title className="tile-title">{data.title}</Card.Title>
                </Card.Body>
                </Link>
            </Card>
        </Container>
    )
}

export default Tile;