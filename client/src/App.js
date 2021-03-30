import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { clearMessage } from './actions/message';
import { history } from './helpers/history';
import './App.scss';

import Navigation from "./components/common/nav";
import Home from './components/home/home';
import Login from './components/common/login';
import Register from './components/common/register';
import Photography from './components/shops/photography';
import Tiles from './components/common/tiles';
import Career from "./components/career/career";
import Poster from "./components/shops/poster";
import NoMatch from "./components/common/NoMatch";


const SidebarWithRouter = withRouter(Navigation);

function App() {
	const [showAdminBoard, setShowAdminBoard] = useState(false);

	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		history.listen((location) => {
			dispatch(clearMessage());
		})
	}, [dispatch]);

	useEffect(() => {
		if (currentUser) {
			setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
		}
	}, [currentUser]);

	return (
		<Container className="App" fluid>
			<Router history={history}>
				<Row className="main-content_wrapper"  noGutters>
				<SidebarWithRouter/>
				<Container as={Col} lg={10} md={12} className="main-content_body">
					<Switch>
					<Route exact path={["/", "/home"]} component={Home}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/register" component={Register}/>
					<Route exact path="/photography" component={Photography}/>
					<Route exact path="/photography/page/:id" component={Tiles}/>
					<Route exact path="/photography/poster/:id" component={Poster}/>
					<Route path="/career" component={Career}/>
					<Route path="/workshop"/>
					<Route component={NoMatch} />
					</Switch>
				</Container>
				</Row>
			</Router>
		</Container>
	);
}

export default App;
