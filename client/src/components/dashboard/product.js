import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Container, Form,
    Button, Col, Row
} from 'react-bootstrap';

function Product(props) {
    const [location, setLocation] = useState(window.location.pathname.split('/')[3]);
    const [data, setData] = useState({
        title: "",
        description: "",
        image: "",
        published: false
    });

    useEffect(() => {
        axios.get(`/api/products/${location}`).then(response => {
            console.log(response)
            setData(response.data.data);
        })
    },[])

    console.log(data)
    return (
        <Container className="product-edit__wrapper" fluid>
            <Container className="product-edit__body" fluid>
            {/* Build out form and fill all values with current values in db */}
            <h3>{data.typeTable}</h3>
            <Form>
                <Row>
                    <Container as={Col}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" value={data.title} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="6" value={data.description} />
                        </Form.Group>
                    </Container>
                    <Container as={Col}>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="image" src={`/imgs/${data.typeTable}/${data.image}/${data.image}.jpg`}/>
                        </Form.Group>
                    </Container>
                </Row>
                <Row>
                    {/* This is where the product type checking and rendering needs to happen */}
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Container>

        </Container>
    )
}

export default Product;