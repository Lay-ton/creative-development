import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
    Container,
    Button
} from 'react-bootstrap';
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

    return (
        <Container className="products-body__wrapper" fluid>
            <Container className="d-flex products-filter__wrapper justify-content-between" fluid>
                <div className="products-filter">
                    Filter
                </div>
                <Link className="" to="/dashboard/products/new">
                    New Product
                </Link>
            </Container>
            <DataList data={data} type="products"/>
        </Container>
    )
}

export default Products;