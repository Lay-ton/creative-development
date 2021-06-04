import React from 'react';
import Photo from './types/photo';

function Type({type, data, setData}) {

    const handleType = () => {
        switch(type) {
            case "photo":
                return <Photo data={data} setData={setData}/>;
            default:
                return "ERROR: Not type associated with this product"
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