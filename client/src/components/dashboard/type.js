import React from 'react';
import Photo from './types/photo';

function Type({type, data, setData}) {

    const handleType = () => {
        switch(type) {
            case "photo":
                // Handles the creation of a new product with type photo
                if (Object.keys(data).length === 0) {
                    data = { prices: [], sizes: [], images: [] }
                    setData(data)
                }
                return <Photo data={data} setData={setData}/>;
            default:
                return "ERROR: No type associated with this product"
        }
    }

    return (
        <div>
            <h4>{type} data</h4> 
            {handleType()}
        </div>
    );
}

export default Type;