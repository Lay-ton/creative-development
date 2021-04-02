import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Sidebar from './sidebar';
import Product from './products';
import './dashboard.scss';

function Dashboard(props) {
    const [bodyKey, setBodyKey] = useState("dashboard");
    const [body, setBody] = useState();

    useEffect(() => {
        if (bodyKey == 'products') {
            setBody(<Product/>)
        }
    }, [bodyKey]);

    return (
        <Container as={Row} className="dashboard-main" fluid noGutters>
            <Container as={Col} lg={2} fluid>
                <Sidebar active={bodyKey} setActive={setBodyKey}/>
            </Container>
            <Container as={Col} lg={10} className="dashboard-body" fluid>
                {body}
            </Container>
        </Container>
    )
}

export default Dashboard;