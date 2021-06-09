import React from 'react';
import Photo from './types/photo';

function Type({type, data, setData}) {

    const handleType = () => {
        switch(type) {
            case "Photo":
                console.log("print", data);
                if (Object.keys(data).length === 0) {
                    console.log("print", data);
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