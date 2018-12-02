import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
	/* eslint-disable indent */
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: action.user,
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user,
			};
		case userConstants.LOGIN_FAILURE:
			return {};
		case userConstants.LOGOUT:
			return {};
		default:
			return state;
	}
	/* eslint-enable indent */
}
