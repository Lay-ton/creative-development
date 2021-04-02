import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import DataList from '../common/dataList';

import './products.scss';

function Products(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("/api/products").then(response => {
            setData(response.data.data);
        })
    },[])

    console.log(data);
    return (
        <Container className="products-body__wrapper" fluid>
            <DataList data={data}/>
        </Container>
    )
}

export default Products;