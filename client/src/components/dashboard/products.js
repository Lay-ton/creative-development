import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import DataList from '../common/dataList';

function Products(props) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState(props.query);

    useEffect(() => {
        axios.get(query).then(response => {
            // console.log(response)
            setData(response.data);
        })
    },[query])

    // console.log("query", query)
    // console.log(data);
    return (
        <Container className="products-body__wrapper" fluid>

            {/* Want a switch statement right here that either does listing or pulls up a single*/}
            <Container className="products-filter__wrapper">

            </Container>
            <DataList data={data} type="products"/>
        </Container>
    )
}

export default Products;