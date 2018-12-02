import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions, contactActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { MainPage } from '../MainPage';
import { LoginPage } from '../LoginPage';

import { userService } from '../_services';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	componentDidMount() {
		const { dispatch } = this.props;
		userService.isUserLoggedIn && dispatch(contactActions.viewContacts());
	}

	render() {
		return (
			<Router history={history}>
				<Switch>
					<PrivateRoute exact path="/" component={MainPage} />
					<Route exact path="/login" component={LoginPage} />
					<PrivateRoute exact path="/:contact" component={MainPage} />
				</Switch>
			</Router>
		);
	}
}

const connectedApp = connect()(App);
export { connectedApp as App };
