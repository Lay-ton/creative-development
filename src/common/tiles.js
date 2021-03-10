import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck'

import Tile from './tile';
import Paging from './paging';

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
        fetch(`${api_url}?page=${page.next}`).then(response => 
            response.json().then(data => {
                console.log(data)
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
        makeApiCallPage(page)
    }, []);

    const pageNumbers = [];
    if (metadata.total_pages !== null && metadata.total_pages > 0) {
        for (let i = 1; i <= metadata.total_pages; i++) {
            pageNumbers.push(i);
        }
    }

    console.log(data)
    console.log(page)
    console.log(metadata)

    const cards = data.map((item) => {
        return (
            <Tile link="/photography/poster" type="thumbnail" id={item.photo_id} image_context="posters" image={item.image_name} title={item.title} />
        );
    })

    return (
        <Container>
            <h1>{api_url}</h1>
            <CardDeck>
                {cards}
            </CardDeck>
            <Paging page_nums={pageNumbers} current={page.cur} change={makeApiCallPage}/>
        </Container>
    );
}

export default Tiles;