import React, { useState, useEffect } from 'react';
import RelationInput from '../../common/relationInput';

import { 
    Container, Form,
    Button, Col, Row
} from 'react-bootstrap';

function Photo({data, setData}) {
    const [sizes, setSizes] = useState(data.sizes)
    const [prices, setPrices] = useState(data.prices)
    const [changed, setChanged] = useState(false);
    
    useEffect(() => {
        setData({
            ...data,
            sizes,
            prices
        })
        console.log(data);

    }, [changed])

    return (
        <div className="row">
            <Container as={Col}>
                <RelationInput title="Sizes & Prices" 
                    item1={sizes}
                    setItem1={setSizes}
                    item2={prices}
                    setItem2={setPrices}
                    proc={changed}
                    setProc={setChanged}
                />
            </Container>
            <Container as={Col}>
                {/* display box with all the different sized images? */}
            </Container>
        </div>
    );
}

export default Photo;