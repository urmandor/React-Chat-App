import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { contactActions } from '.';

export const userActions = {
	login,
	logout,
};

function login(username, password) {
	return dispatch => {
		dispatch(request({ username }));

		userService.login(username, password).then(
			user => {
				dispatch(success(user));
				history.push('/');
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			},
		);
	};

	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

function logout() {
	return dispatch => {
		dispatch(contactActions.removeContacts());
		userService.logout().then(() => {
			history.push('/login');
			dispatch({ type: userConstants.LOGOUT });
		});
	};
}
