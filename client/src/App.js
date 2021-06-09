import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { clearMessage } from './actions/message';
import { history } from './helpers/history';

// Admin components
import AdminNav from './components/dashboard/adminNav';
import Dashboard from './components/dashboard/dashboard';
import Products from './components/dashboard/products';
import UpdateProduct from './components/dashboard/updateProduct';
import NewProduct from './components/dashboard/newProduct';

// Main site components
import Navigation from "./components/common/nav";
import Home from './components/home/home';
import Login from './components/common/login';
import Register from './components/common/register';
import Photography from './components/shops/photography';
import Tiles from './components/common/tiles';
import Career from "./components/career/career";
import Poster from "./components/shops/poster";
import NoMatch from "./components/common/NoMatch";


function App() {
	const [location, setLocation] = useState(window.location.pathname.split('/')[1]);
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

	useEffect(() => {
		setLocation(window.location.pathname.split('/')[1])
	}, [window.location.pathname])

	

	return (
		<Container className="App" fluid>
			
				{ location === "dashboard" ? (
					
					<Row className="main-content_wrapper" noGutters>
						{ showAdminBoard && <AdminNav/> }
						<Switch>
							<Route exact path="/dashboard" component={Dashboard}/>
							<Route exact path="/dashboard/products/new" render={() => <Dashboard body={<NewProduct/>}/>}/>
							<Route exact path="/dashboard/products/:id" render={() => <Dashboard body={<UpdateProduct/>}/>}/>
							<Route exact path="/dashboard/products" render={() => <Dashboard body={<Products query="/api/products"/>}/>}/>
							<Route exact path={["/", "/home"]} component={Home}/>
						</Switch>
					</Row>
					
				) : (
					
					<Row className="main-content_wrapper" noGutters>
						{ showAdminBoard && <AdminNav/>}
						<Navigation/>
						<Container as={Col} lg={10} md={12} className="main-content_body">
							<Switch>
								<Route exact path={["/", "/home"]} component={Home}/>
								<Route exact path="/login" component={Login}/>
								<Route exact path="/register" component={Register}/>
								<Route exact path="/photography" component={Photography}/>
								<Route exact path="/photography/page/:id" component={Tiles}/>
								<Route exact path="/photography/poster/:id" component={Poster}/>
								<Route exact path="/career" component={Career}/>
								<Route component={NoMatch} />	
							</Switch>				
						</Container>
					</Row>
					
				)}
					
		</Container>
	);
}

export default withRouter(App);
