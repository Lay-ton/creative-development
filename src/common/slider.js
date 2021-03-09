import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './slider.scss';


function Slider({api_url, image_context}) {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch(api_url).then(response =>
            response.json().then(data => {
                setPhotos(data.photos);
            }) 
        )
    }, [])

    return (
        <Carousel fade hover>
            {photos.map(photo => {
                return (
                <Carousel.Item className="slider-item">
                    <img className="slider-image" src={`/imgs/${image_context}/${photo.image_name}/${photo.image_name}_20x8.jpg`} alt={photo.title}/>
                    <Carousel.Caption>
                        <h3>{photo.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                );
            })}
        </Carousel>
    );
}

export default Slider;