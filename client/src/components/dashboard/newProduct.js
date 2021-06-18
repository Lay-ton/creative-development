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

function NewProduct(props) {
    const [loaded, setLoaded] = useState(false);

    const [location, setLocation] = useState(window.location.pathname.split('/')[3]);
    const [types, setTypes] = useState([]);
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

    useEffect(() => {
        axios.get('/api/products/types').then(response => {
            setTypes(response.data)
            setType(response.data[0])
        });
    },[])

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

    useEffect(() => {
        setData({
            ...data,
            typeTable: type
        })
    }, [type])

    useEffect(() => {
        let newData = { 
            ...data,
            typeData
        }
        console.log(newData)
        setData(newData)
    }, [typeData])

    const handlePost = (publish) => {
        console.log("posting!")
        const newData = {
            ...data,
            published: publish
        }
        console.log("update", newData)
        axios.post(`/api/products/`, newData ).then(response => {
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
                    
                    {/* Select the type and present the desired type fields */}
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <h3>select type</h3>
                        <Form.Control as="select" onChange={(event) => {
                            handleTypeChange(event);
                        }}>
                            {/* map the types here */}
                            {types.map(data => {
                                return (<option>{data}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>

                    <div>
                        <Type type={type} data={typeData} setData={setTypeData}/>
                    </div>

                    <div className="d-flex justify-content-end">
                        <div className="d-flex product-edit__save">
                            { data.published ? (
                                <>
                                    <Button variant="success" onClick={() => {
                                        handlePost(false)
                                    }}>Save As Draft</Button>
                                    <Button variant="success" onClick={() => {
                                        handlePost(true)
                                    }}>Publish</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="success" onClick={() => {
                                        handlePost(false)
                                    }}>Save</Button>
                                    <Button variant="success" onClick={() => {
                                        handlePost(true)
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

export default NewProduct;