import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import './dataList.scss';



function DataList(props) {
    return (
        <Container className="data-list__wrapper" fluid>
            {props.data.map(val => {
                return (
                <Container as={Row} className="data-list__item" fluid noGutters>
                    <Image className="data-list__thumbnail" src={`/imgs/${val.typeTable}/${val.image}/${val.image}_12x12.jpg`} thumbnail/>
                    <Container as={Col} className="data-list__summary">
                        <h5>{val.title}</h5>
                        <h6>{val.typeTable ? (val.typeTable) : ("default")}</h6>
                        <Container fluid>
                            <Link to={`/dashboard/${props.type}/${val.id}`}>Edit</Link> | <Link>View</Link> | <Link>Delete</Link>
                        </Container>
                    </Container>
                    <Container as={Col} className="data-list__state">
                        {val.published ? ("Published") : ("Draft")}
                    </Container>
                </Container>
                )
            })}
        </Container>
    )
};

export default DataList;