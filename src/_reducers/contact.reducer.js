import { contactConstants } from '../_constants';

export function contacts(state = { loading: true, items: [] }, action) {
	/* eslint-disable indent */
	switch (action.type) {
		case contactConstants.VIEW_CONTACTS_REQUEST:
			return {
				loading: true,
			};
		case contactConstants.VIEW_CONTACTS_SUCCESS:
			return {
				items: action.contacts,
			};
		case contactConstants.VIEW_CONTACTS_FAILURE:
			return {
				error: action.error,
			};

		case contactConstants.ADD_CONTACT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case contactConstants.ADD_CONTACT_SUCCESS:
			action.action &&
				{}.toString.call(action.action) === '[object Function]' &&
				action.action();
			return state;
		case contactConstants.ADD_CONTACT_FAILURE:
			return { ...state, error: action.error };

		case contactConstants.SEND_MESSAGE_REQUEST:
			return state;
		case contactConstants.SEND_MESSAGE_SUCCESS:
			return { items: action.contacts };
		case contactConstants.SEND_MESSAGE_FAILURE:
			return { ...state, error: action.error };

		case contactConstants.REMOVE_CONTACTS_SUCCESS:
			return {};

		default:
			return state;
	}
	/* eslint-enable indent */
}
