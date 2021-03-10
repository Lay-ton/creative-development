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
    const [page, setPage] = useState({
        prev: null,
        cur: 0,
        next: 1,
    })
    const [metadata, setMeta] = useState({
        count: null,
        total_rows: null,
        total_pages: null,
    })
    const api_url = "/" + window.location.pathname.split('/')[1];

    //There is a bunch of extra metadata here that could be useful if I had a lot of entries 
    const makeApiCallPage = (pageNum) => {
        fetch(`${api_url}?page=${pageNum}`).then(response => 
            response.json().then(data => {
                setData(data.data);
                setPage({
                    prev: (data.page > 0 ? data.page - 1 : null),
                    cur: data.current_page,
                    next: (data.total_pages > 1 ? data.current_page + 1 : null),
                });
                setMeta({
                    count: data.count,
                    total_rows: data.total_rows,
                    total_pages: data.total_pages
                })
            })
        );
    }
    
    useEffect(() => {
        makeApiCallPage(1)
    }, []);

    const pageNumbers = [];
    if (metadata.total_pages !== null && metadata.total_pages > 0) {
        for (let i = 1; i <= metadata.total_pages; i++) {
            pageNumbers.push(i);
        }
    }

    const items = data.reduce(function (rows, item, index) { 
        return (index % 3 == 0 ? rows.push([<Tile link="/photography/poster" type="thumbnail" id={item.photo_id} image_context="posters" image={item.image_name} title={item.title} />]) 
                : rows[rows.length-1].push(<Tile link="/photography/poster" type="thumbnail" id={item.photo_id} image_context="posters" image={item.image_name} title={item.title} />)) && rows;
      }, []);
    
    const tiles = items.map((item) => 
       <CardDeck className="card_wrapper">
           {item}
        </CardDeck>
    )

    // console.log(data)
    // console.log(page)
    // console.log(metadata)

    // const cards = data.map((item) => {
    //     return (
    //         <Col lg={3}>
    //             <Tile link="/photography/poster" type="thumbnail" id={item.photo_id} image_context="posters" image={item.image_name} title={item.title} />
    //         </Col>
    //     );
    // })

    return (
        <Container className="tiles-body page">
            <h1>{api_url}</h1>
            <Container>
                {tiles}
            </Container>
            <Paging page_nums={pageNumbers} current={page.cur} change={makeApiCallPage}/>
        </Container>
    );
}

export default Tiles;