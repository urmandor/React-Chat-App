import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { MainLayout } from './MainLayout';
import { userService } from '../_services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			return userService.isUserLoggedIn() ? (
				<MainLayout path={props.match.params}>
					<Component {...props} />
				</MainLayout>
			) : (
				<Redirect
					to={{ pathname: '/login', state: { from: props.location } }}
				/>
			);
		}}
	/>
);
