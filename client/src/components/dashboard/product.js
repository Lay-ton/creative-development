import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function Product(props) {
    const [location, setLocation] = useState(window.location.pathname.split('/')[3]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`/api/products/${location}`).then(response => {
            console.log(response)
            setData(response.data.data);
        })
    },[])

    console.log(data)
    return (
        <Container>
            {/* Build out form and fill all values with current values in db */}
        </Container>
    )
}

export default Product;