import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';

import Tile from './tile';
import Paging from './paging';
import './tiles.scss';


function Tiles(props) {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [metadata, setMeta] = useState({
        totalItems: null,
        totalPages: null,
    })
    const split_url = window.location.pathname.split("/")
    const api_url = `/api/${split_url[1]}/published?size=9&page=${split_url[3] - 1}`;

    //There is a bunch of extra metadata here that could be useful if I had a lot of entries 
    const makeApiCallPage = () => {
        fetch(`${api_url}`).then(response => 
            response.json().then(data => {
                console.log(data);
                setData(data.data);
                setPage(data.currentPage + 1);
                setMeta({
                    totalItems: data.totalItems,
                    totalPages: data.totalPages
                })
            })
        );
    }
    
    useEffect(() => {
        makeApiCallPage()
    }, [window.location.pathname]);

    const pageNumbers = [];
    if (metadata.totalPages !== null && metadata.totalPages > 0) {
        for (let i = 1; i <= metadata.totalPages; i++) {
            pageNumbers.push(i);
        }
    }

    //Need to make this dynamic
    const items = data.reduce(function (rows, item, index) { 
        return (index % 3 == 0 ? rows.push([<Tile link="/photography/poster" type="thumbnail" id={item.id} image_context="posters" image={item.image} title={item.title} />]) 
                : rows[rows.length-1].push(<Tile link="/photography/poster" type="thumbnail" id={item.id} image_context="posters" image={item.image} title={item.title} />)) && rows;
      }, []);
    
    const tiles = items.map((item) => 
       <CardDeck className="card_wrapper">
           {item}
        </CardDeck>
    )

    return (
        <Container className="tiles-body page">
            <h1>{split_url[1]}</h1>
            <Container>
                {tiles}
            </Container>
            <Paging page_nums={pageNumbers} link_base={`/${split_url[1]}/${split_url[2]}/`} current={page} change={makeApiCallPage}/>
        </Container>
    );
}

export default Tiles;