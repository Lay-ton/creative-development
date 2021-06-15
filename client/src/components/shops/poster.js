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

// const prices = {
//     "14\"X11\"": "$11.00",
//     "12\"X12\"": "$13.00",
//     "18\"X12\"": "$14.00",
//     "20\"X8\"": "$14.00",
//     "20\"X16\"": "$18.00",
//     "30\"X20\"": "$25.00",
//     "36\"X24\"": "$30.00",
// }

// const sizes = {
//     "14\"X11\"": "14x11",
//     "12\"X12\"": "12x12",
//     "18\"X12\"": "18x12",
//     "20\"X8\"": "20x8",
//     "20\"X16\"": "20x16",
//     "30\"X20\"": "30x20",
//     "36\"X24\"": "36x24",
// }

function Poster(props) {
    const [sizes, setSizes] = useState([]);
    const [prices, setPrices] = useState([]);
    const [size, setSize] = useState("");
    const [selected, setSelected] = useState("");
    const [price, setPrice] = useState("");
    const [product, setProduct] = useState([]);
    const [additions, setAdditions] = useState([]);

    useEffect(() => {
        var split_url = window.location.pathname.split('/');
        console.log(split_url);
        fetch(`/api/products/${split_url[3]}`).then(response => 
            response.json().then(data => {
                console.log(data.data)
                const result = data.data
                setProduct(result);
                setSizes(result.typeData.sizes);
                setPrices(result.typeData.prices);
                setSelected(result.typeData.sizes[0]);
                setSize(result.typeData.sizes[0]);
                setPrice(result.typeData.prices[0]);
            })
        );
        
        window.scrollTo(0, 0);
    }, [props.location.pathname])

    useEffect(() => {
        fetch("/api/products/type/photo?order=desc&size=3").then(response => 
            response.json().then(data => {
                setAdditions(data);
            })
        );
    }, [])

    
    const images = sizes.map((dim, key) =>
        <Tab.Pane className="poster-img__wrapper" eventKey={key}>
            <Image className={`poster-img img-dim_${dim}`} src={`/imgs/photo/${product.image}/${product.image}_${dim}.jpg`} />
        </Tab.Pane>
    )

    const options = sizes.map((dim, key) =>
        <Nav.Item as={Col} lg={4} className="size-item">
            <Nav.Link className="poster-btn" eventKey={key} onMouseEnter={() => setSize(dim)} onMouseLeave={() => setSize(selected)} onClick={() => {setSelected(dim); setPrice(prices[key])}}>{dim}</Nav.Link>
        </Nav.Item>
    )

    const tiles = additions.map((item) => {
        return (
            <Tile type="thumbnail" data={item} />
        )
    })

    return (
        <Container className="poster-body page">
            <h6 className="poster-path_wrapper">
                <Link to={{pathname: "/photography"}}>
                    /photography
                </Link>
                <Link to={{pathname: "/photography/page/1",
                    }}>
                    /photos
                </Link>
            </h6>
            <h2 className="section-title">{product.title}</h2>
            <Tab.Container id="left-tabs-example" activeKey={sizes[selected]}>
                <Container as={Row} className="poster-main_wrapper" noGutters fluid>
                    <Tab.Content className="images_wrapper" as={Col} lg={7} xs={12}>
                        {images}
                    </Tab.Content>
                    <Container as={Col} lg={5} xs={12} className="option-cart_outter-wrapper">
                        <Container className="option-cart_inner-wrapper">
                            <Container className="poster-desc_wrapper">
                                <h6 className="poster-desc_header"><u>Description:</u></h6>
                                {product.description}
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