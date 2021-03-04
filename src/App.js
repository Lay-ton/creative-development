import React from "react";
import './App.scss';
import Sidebar from "./common/sidebar";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import Home from './home/home'
import Photography from './shops/photography'
import Career from "./career/career"
import NoMatch from "./NoMatch"

import Poster from "./shops/poster"

const SidebarWithRouter = withRouter(Sidebar);

function App() {
  const viewHeight = window.innerHeight;


  return (
    <Container className="App" fluid>
      <Router>
        <Row style={{ height: viewHeight }} className="main-content"  noGutters>
          <Col lg={2} md={12}>
            <SidebarWithRouter/>
          </Col>
          <Col lg={10} md={12}>
            <Switch>
              <Route exact path="/" component={Poster}/>
              <Route exact path="/posters" component={Photography}/>
              <Route path="/career" component={Career}/>
              <Route path="/workshop"/>
              <Route component={NoMatch} />
            </Switch>
          </Col>
        </Row>
      </Router>
    </Container>
  );
}

export default App;
