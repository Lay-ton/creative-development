import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Sidebar from './sidebar';
import Product from './products';
import './dashboard.scss';

function Dashboard(props) {
    const [bodyKey, setBodyKey] = useState("dashboard");
    const [body, setBody] = useState(props.body);

    useEffect(() => {
        setBody(props.body)
    }, [props.body]);

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