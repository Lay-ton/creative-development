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

function UpdateProduct(props) {
    const [loaded, setLoaded] = useState(false);

    const [location, setLocation] = useState(window.location.pathname.split('/')[3]);
    const [type, setType] = useState(undefined);

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

    useEffect(() => {
        axios.get(`/api/products/${location}`).then(response => {
            const result = response.data.data;
            setData(result);
            setType(result.typeTable);
            setOrgImageName(result.image);
            setOrgImage(`/imgs/${result.typeTable}/${result.image}/${result.image}.jpg`)
            setImage(`/imgs/${result.typeTable}/${result.image}/${result.image}.jpg`)
            setTypeData(result.typeData);
            setLoaded(true);
        });
    },[])

    useEffect(() => {
        let newData = { 
            ...data,
            typeData
        }
        setData(newData)
    }, [typeData])

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

    const handleTitleChange = (e) => {
        setData({
            ...data,
            title: e.target.value
        })
    }

    const handleDescChange = (e) => {
        setData({
            ...data,
            description: e.target.value
        })
    }

    const handlePut = (publish) => {
        console.log("posting!")
        axios.put(`/api/products/${location}`, {
            ...data,
            published: publish
        }).then(response => {
            const result = response.data.data;
            setData(result);
            setType(result.typeTable);
            setOrgImageName(result.image);
            setOrgImage(`/imgs/${result.typeTable}/${result.image}/${result.image}.jpg`)
            setImage(`/imgs/${result.typeTable}/${result.image}/${result.image}.jpg`)
            setTypeData(result.typeData);
            setLoaded(true);
        });
    }

    console.log(data)
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
                                <Form.Control type="text" placeholder="Title" value={data.title} onChange={(event) => {
                                    handleTitleChange(event);
                                }}/>
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="6" value={data.description} onChange={(event) => {
                                    handleDescChange(event);
                                }}/>
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
                    
                    { loaded && typeData ? (
                        <div>
                            <Type type={type} data={typeData} setData={setTypeData}/>
                        </div>
                    ) : (
                        <> </>
                    )}
                    <div className="d-flex justify-content-end">
                        <div className="d-flex product-edit__save">
                            <div className="product-edit__timestamp">
                                Last updated: {data.updatedAt}
                            </div>
                            { data.published ? (
                                <>
                                    <Button variant="success" onClick={() => {
                                        handlePut(false)
                                    }}>Save As Draft</Button>
                                    <Button variant="success" onClick={() => {
                                        handlePut(true)
                                    }}>Publish</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="success" onClick={() => {
                                        handlePut(false)
                                    }}>Save</Button>
                                    <Button variant="success" onClick={() => {
                                        handlePut(true)
                                    }}>Publish</Button>
                                </>
                            )}
                        </div>
                    </div>
                </Form>
            </Container>
        </Container>
    )
}

export default UpdateProduct;