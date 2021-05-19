import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Slider from '../common/slider';
import Tile from '../common/tile';

function Photography(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/api/products/type/photo?order=desc&size=3").then(response => 
            response.json().then(data => {
                setData(data.data);
            })
        );
    }, [])

    const tiles = data.map((item) => {
        console.log("Item")
        console.log(item);
        return (
            <Tile link="/photography/poster" type="thumbnail" data={item} />
        )
    })
    
    return (
        <Container className="photography-body page">
            <Slider api_url="/api/products/type/photo?order=rand&size=3" image_context="photo" />
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