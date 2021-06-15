import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';


function Slider({api_url, image_context}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(api_url).then(response =>
            response.json().then(data => {
                setData(data);
            }) 
        )
    }, [])

    console.log(data)
    return (
        <Carousel fade hover>
            {data.map(data => {
                return (
                <Carousel.Item className="slider-item">
                    <img className="slider-image" src={`/imgs/${image_context}/${data.image}/${data.image}_20x8.jpg`} alt={data.title}/>
                    <Carousel.Caption>
                        <h3>{data.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                );
            })}
        </Carousel>
    );
}

export default Slider;