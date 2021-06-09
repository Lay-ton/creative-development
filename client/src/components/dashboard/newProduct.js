import React, { useState, useEffect, useRef } from 'react';
import Type from './type';
import axios from 'axios';
import { 
    Container, 
    Form,
    Button, 
    Col, 
    Row,
    Image
} from 'react-bootstrap';

const Types = ["None", "Photo"]

function NewProduct(props) {
    const [loaded, setLoaded] = useState(false);

    const [location, setLocation] = useState(window.location.pathname.split('/')[3]);
    const [type, setType] = useState();

    const [orgImage, setOrgImage] = useState()
    const [orgImageName, setOrgImageName] = useState();
    const [image, setImage] = useState()

    const [data, setData] = useState({
        title: "",
        description: "",
        image: "",
        published: false
    });
    const [typeData, setTypeData] = useState({});

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setData({
                ...data,
                image: e.target.files[0].name.split(".")[0]
            })
            setImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setData({
                ...data,
                image: orgImageName
            })
            setImage(orgImage);
        }
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    return (
        <Container className="product-edit__wrapper" fluid>
            <Container className="product-edit__body" fluid>
                <Form>
                    <div className="d-flex justify-content-between">
                        <h3>product data</h3>
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
                                { data.image ? (
                                    <div className="product-edit__image-container">
                                        <Image className="product-edit__image" src={image} />
                                        <Form.File 
                                            className="product-edit__image-upload"
                                            id="custom-file"
                                            label={data.image}
                                            onChange={(event) => {
                                                handleImageChange(event);
                                            }}
                                            custom
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <Form.Control className="product-edit__image" type="file"/>
                                    </div>
                                )}
                            </Form.Group>
                        </Container>
                    </Row>
                    
                    {/* Select the type and present the desired type fields */}
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <h3>select type</h3>
                        <Form.Control as="select" onChange={(event) => {
                            handleTypeChange(event);
                        }}>
                            {/* map the types here */}
                            {Types.map(data => {
                                return (<option>{data}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>

                    <div>
                        <Type type={type} data={typeData} setData={setTypeData}/>
                    </div>

                    <div className="d-flex justify-content-end">
                        <div className="d-flex product-edit__save">
                            <Button variant="success">Save Draft</Button>
                            <Button variant="success">Publish</Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </Container>
    )
}

export default NewProduct;