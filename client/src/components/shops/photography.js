import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Slider from '../common/slider';
import Tile from '../common/tile';
import './photography.scss';

function Photography(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/photography/sorted/DESC?limit=3").then(response => 
            response.json().then(data => {
                setData(data.data);
            })
        );
    }, [])

    const tiles = data.map((item) => {
        return (
            <Tile link="/photography/poster" type="thumbnail" id={item.photo_id} image_context="posters" image={item.image_name} title={item.title} />
        )
    })
    
    return (
        <Container className="photography-body page">
            <Slider api_url='/photography/random?limit=3' image_context="posters" />
            <Container className="new-additions_wrapper">
                <h2 className="new-additions_header">Newest Additions</h2>
                <CardDeck className="new-additions_tiles">
                    {tiles}
                </CardDeck>
            </Container>
            <Link to={{pathname: "photography/page/1"}}>
                <Button className="view-more_btn" variant="dark">
                    <h4 className="view-more_text">All Photos</h4>
                </Button>
            </Link>
        </Container>
    )
}

export default Photography;