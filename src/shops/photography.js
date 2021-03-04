import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardDeck from 'react-bootstrap/CardDeck'

import Tile from '../common/tile';

const products = [
    {
        image: "0000809_0000809-R1-006-1A",
        title: "Between Reynolds Mt. and Fusillade Mt.",
        summary: "A few miles into our hike towards Gunsight Pass in Glacier National Park, Montana. This shot is directed towards the mountain that sits behind the Twin Lakes.",
        price_range: "$10-$25"
    },
    {
        image: "0000809_0000809-R1-018-7A",
        title: "Hungry Horse Dam",
        summary: "15 miles from the west entrance of Glacier National Park, Montana.",
        price_range: "$10-$25"
    },
    {
        image: "0000809_0000809-R1-024-10A",
        title: "Sawtooth National Forest",
        summary: "Hiking a couple miles south of Redfish Lake in Idaho's Sawtooth National Forest",
        price_range: "$10-$25"
    },
    {
        image: "0000810_0000810-R1-035-16",
        title: "Going-to-the-Sun Mt.",
        summary: "Aproaching Gunsight Lake, looking back at Going-to-the-Sun Mt. in Glacier Park, Montana",
        price_range: "$10-$25"
    },
]

function Photography(props) {
    let rows = []

    const items = products.reduce(function (rows, tile, index) { 
        return (index % 3 == 0 ? rows.push([<Tile type="thumbnail" image={tile.image} title={tile.title} price={tile.price_range} />]) 
                : rows[rows.length-1].push(<Tile type="thumbnail" image={tile.image} title={tile.title} price={tile.price_range} />)) && rows;
      }, []);
    
    const tiles = items.map((item) => 
       <Container as={Row}>
           {item}
       </Container>
    )

    
    return (
        <Container>
            <CardDeck>
                {tiles}
            </CardDeck>
        </Container>
    )
}

export default Photography;