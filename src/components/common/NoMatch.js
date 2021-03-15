import React from "react";
import Container from 'react-bootstrap/Container'

function NoMatch(props) {
  return (
    <Container className="error-page" fluid>
        <Container>
            <h1>This page doesn't exist</h1>
        </Container>
    </Container>
  );
}

export default NoMatch;