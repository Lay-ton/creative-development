import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import Slider from '../common/slider';

import Tile from '../common/tile';
import './photography.scss';

function Photography(props) {
    let rows = [];
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        fetch("/photography?time=new&limit=3").then(response => 
            response.json().then(data => {
                setPhotos(data.photos);
            })
        );
    }, [])

    console.log(photos)
    const tiles = photos.map((photo) => {
        return (
            <Tile link="/photography/poster" type="thumbnail" id={photo.photo_id} image_context="posters" image={photo.image_name} title={photo.title} />
        )
    })
    
    // const items = photos.reduce(function (rows, photo, index) { 
    //     return (index % 3 == 0 ? rows.push([<Tile type="thumbnail" id={photo.photo_id} image={photo.image_name} title={photo.title} />]) 
    //             : rows[rows.length-1].push(<Tile type="thumbnail" id={photo.photo_id} image={photo.image_name} title={photo.title} />)) && rows;
    //   }, []);
    
    // const tiles = items.map((item) => 
    //    <Container as={Row}>
    //        {item}
    //    </Container>
    //)

    return (
        <Container className="photography-body page">
            <Slider api_url='/photography?random=3' image_context="posters" />
            <Container className="new-additions_wrapper">
                <h2 className="new-additions_header">Newest Additions</h2>
                <CardDeck className="new-additions_tiles">
                    {tiles}
                </CardDeck>
            </Container>
            <Link to={{pathname: "photography/photos",
                       search: "?page=1"}}>
            <Button className="view-more_btn" variant="dark">
                <h4 className="view-more_text">All Photos</h4>
            </Button>
            </Link>
        </Container>
    )
}

export default Photography;