import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Tile from './tiles';

function Tiles(props) {
    const { location } = props;
    const [offset, setOffset] = useState(0);
    const [photos, setPhotos] = useState([]);
    const api_url = "/" + location.pathname.split('/')[1];
    const limit = 9;
    
    useEffect(() => {
        fetch(`${api_url}?offset=${offset}&limit=${limit}`).then(response => 
            response.json().then(data => {
                setPhotos(data.photos);
            })
        );
    }, [])
    console.log(photos)

    return (
        <Container>
            <h1>{api_url}</h1>
            <Button onClick={() => { setOffset(offset+limit) }}>
                Continue our work here!
            </Button>
        </Container>
    );
}

export default Tiles;