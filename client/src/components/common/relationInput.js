import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

function zip(a, b) {
    let combine = a.map((k, i) => [k,b[i]]);
    return combine;
}

function RelationPill({values, setValues, index, proc, setProc}) {
    const baseWidth = 25;
    const totalWidth = useRef();
    const deleteBtn = useRef();

    const [relation1, setRelation1] = useState(values[index][0]);
    const [width1, setWidth1] = useState();
    const span1 = useRef();

    const [relation2, setRelation2] = useState(values[index][1]);
    const [width2, setWidth2] = useState();
    const span2 = useRef();
    
    useEffect(() => {
        setRelation1(values[index][0]);
        setRelation2(values[index][1]);
    }, [values])
    
    // Updates the zip array in the parent
    useEffect(() => {
        values[index] = [relation1, relation2];
        setValues(values);
        setProc(!proc);
    }, [relation1, relation2])

    useEffect(() => {
        setWidth1(span1.current.offsetWidth + baseWidth);
    }, [relation1])

    useEffect(() => {
        setWidth2(span2.current.offsetWidth + baseWidth);
    }, [relation2])

    return (
        <div className="relation-item__wrapper d-flex" ref={totalWidth} key={index}>
            <div className="relation-item__body d-flex">
                <div className="relation-value__wrapper">
                    <span id="hide" ref={span1}>{relation1}</span>
                    <input className="relation1" key={0}
                        style={{width: width1}}
                        value={relation1}   
                        onChange={(e) => {
                            setRelation1(e.target.value)
                        }} 
                    />
                </div>
                <div className="relation-value__wrapper">
                    <span id="hide" ref={span2}>{relation2}</span>
                    <input className="relation2" key={1}
                        style={{width: width2}}
                        value={relation2}
                        onChange={(e) => {
                            setRelation2(e.target.value)
                        }}
                    />
                </div>
                
            </div>
            <div className="relation-item__delete" ref={deleteBtn}>
                <Button variant="danger" onClick={() => {
                    values.splice(index, 1);
                    setValues(values);
                    setProc(!proc);
                }}>
                    X
                </Button>
            </div>
        </div>
    );
}

function RelationInput({title, item1, setItem1, item2, setItem2, proc, setProc}) {
    const [relation, setRelation] = useState(zip(item1, item2));

    useEffect(async () => {
        // reset the items array
        item1 = []
        item2 = []
        
        // fills the item array with the correct values
        Object.keys(relation).map((key, index) => {
            item1[index] = relation[key][0]
            item2[index] = relation[key][1]
        })
        
        setItem1(item1);
        setItem2(item2);
        setRelation(zip(item1, item2));
    }, [proc])

    return (
        <div className="relation-input__wrapper">
            <label>{title}</label>
            <div className="relation-input__body d-flex flex-wrap">
                {relation.map((element, index) => {
                    return (
                        <RelationPill key={index} values={relation} setValues={setRelation} proc={proc} setProc={setProc} index={index}/>
                    );
                })}
                <Button className="relation-add" variant="info" 
                    onClick={() => {
                        relation.push(["", ""])
                        setRelation(relation);
                        setProc(!proc);
                    }}>
                    Add
                </Button>
            </div>
        </div>
    );
}

export default RelationInput;