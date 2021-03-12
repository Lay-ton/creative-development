import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import CardDeck from 'react-bootstrap/CardDeck';

import Tile from '../common/tile';
import './poster.scss';

const prices = {
    "14\"X11\"": "$11.00",
    "12\"X12\"": "$13.00",
    "18\"X12\"": "$14.00",
    "20\"X8\"": "$14.00",
    "20\"X16\"": "$18.00",
    "30\"X20\"": "$25.00",
    "36\"X24\"": "$30.00",
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

function Poster(props) {
    const [size, setSize] = useState("14\"X11\"");
    const [selected, setSelected] = useState("14\"X11\"");
    const [price, setPrice] = useState(prices[size]);
    const [poster, setPoster] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${props.location.pathname}`).then(response => 
            response.json().then(data => {
                setPoster(data.data);
            })
        );
        window.scrollTo(0, 0)
    }, [props.location.pathname])

    useEffect(() => {
        fetch("/photography/sorted/DESC?limit=3").then(response => 
            response.json().then(data => {
                setData(data.data);
            })
        );
    }, [])

    
    const images = Object.values(sizes).map((dim) =>
        <Tab.Pane className="poster-img__wrapper" eventKey={dim}>
            <Image className={`poster-img img-dim_${dim}`} src={`/imgs/posters/${poster.image_name}/${poster.image_name}_${dim}.jpg`} />
        </Tab.Pane>
    )

    const options = Object.entries(sizes).map(([key, dim]) =>
        <Nav.Item as={Col} lg={4} className="size-item" onMouseEnter={() => setSize(key)} onMouseLeave={() => setSize(selected)}>
            <Nav.Link className="poster-btn" eventKey={dim} onClick={() => {setSelected(key); setPrice(prices[key])}}>{key}</Nav.Link>
        </Nav.Item>
    )

    const tiles = data.map((item) => {
        return (
            <Tile link="/photography/poster" type="thumbnail" id={item.photo_id} image_context="posters" image={item.image_name} title={item.title} />
        )
    })

    return (
        <Container className="poster-body page">
            <h6 className="poster-path_wrapper">
                <Link to={{pathname: "/photography"}}>
                    /Photography
                </Link>
                <Link to={{pathname: "/photography/page/1",
                    }}>
                    /Photos
                </Link>
            </h6>
            <h2 className="section-title">{poster.title}</h2>
            <Tab.Container id="left-tabs-example" defaultActiveKey={"14x11"}>
                <Container as={Row} noGutters fluid>
                    <Tab.Content className="" as={Col} lg={7} xs={12}>
                        {images}
                    </Tab.Content>
                    <Container as={Col} lg={5} xs={12} className="option-cart_outter-wrapper">
                        <Container className="option-cart_inner-wrapper">
                            <Container className="poster-desc_wrapper">
                                <h6 className="poster-desc_header"><u>Description:</u></h6>
                                {poster.description}
                            </Container>  
                            <Nav className="flex-column poster-sizes_wrapper">
                                <h6 className="poster-sizes_header"><u>Size:</u> {size}</h6>
                                <Container as={Row} noGutters fluid>
                                    {options}
                                </Container>
                            </Nav>
                            <Container className="poster-price_wrapper">
                                <Container className="poster-price_btn" fluid>
                                    <h5>{price}</h5>
                                    <Button variant="info">Add to Cart</Button>
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Tab.Container>
            <Container className="new-additions_wrapper">
                <h2 className="new-additions_header">Newest Additions</h2>
                <CardDeck className="new-additions_tiles">
                    {tiles}
                </CardDeck>
            </Container>
        </Container>
    );
}

export default Poster;