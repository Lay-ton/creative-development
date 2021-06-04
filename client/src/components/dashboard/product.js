import React, { useState, useEffect } from 'react';
import Type from './type';
import axios from 'axios';
import { 
    Container, Form,
    Button, Col, Row
} from 'react-bootstrap';

function Product(props) {
    const [loaded, setLoaded] = useState(false);

    const [location, setLocation] = useState(window.location.pathname.split('/')[3]);
    const [type, setType] = useState(undefined);
    const [data, setData] = useState({
        title: "",
        description: "",
        image: "",
        published: false
    });
    const [typeData, setTypeData] = useState({});

    useEffect(() => {
        axios.get(`/api/products/${location}`).then(response => {
            console.log(response)
            setData(response.data.data);
            setType(response.data.data.typeTable);
        });
    },[])

    useEffect(() => {
        console.log(type, data[type])
        setTypeData(data[type]);
        setLoaded(true);
    }, [type, data])
        
    console.log(data)
    return (
        <Container className="product-edit__wrapper" fluid>
            <Container className="product-edit__body" fluid>
            {/* Build out form and fill all values with current values in db */}
                
                <Form>
                    <div className="d-flex justify-content-between">
                        <h3>product data</h3>
                        <div className="d-flex product-edit__save">
                            <Button>Save Draft</Button>
                            <Button>Publish</Button>
                        </div>
                    </div>
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
                                <Form.Control className="product-edit__image" type="image" src={`/imgs/${data.typeTable}/${data.image}/${data.image}.jpg`}/>
                            </Form.Group>
                        </Container>
                    </Row>
                    
                    { loaded && typeData ? (
                        <div>
                            <Type type={type} data={typeData} setData={setTypeData}/>
                        </div>
                    ) : (
                        <> </>
                    )}
                    <div className="d-flex justify-content-end">
                        <div className="product-edit__timestamp">
                            Last updated: {data.updatedAt}
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>

        </Container>
    )
}

export default Product;