import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';


function Products(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("/api/photography").then(response => {
            setData(response.data.data);
        })
    })

    return (
        <Container>
            {data.map(data => {
                return (
                    <Container>
                        <li>{data.title}</li>
                        <li>{data.description}</li>
                        <li>{data.image}</li>
                    </Container>
                )
            })}
        </Container>
    )
}

export default Products;