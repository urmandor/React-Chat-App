import { contactConstants } from '../_constants';
import { contactService } from '../_services';
import { alertActions } from '.';

export const contactActions = {
	addContact,
	viewContacts,
	sendMessage,
	removeContacts,
};

function addContact(contact, action) {
	return dispatch => {
		dispatch(request(contact.contractName));

		let message;
		if (!contact.name) {
			message = 'Contact Name is required';
		}

		if (message) {
			dispatch(failure(message));
			dispatch(alertActions.error(message));
			return;
		}

		contactService
			.addContact(contact)
			.then(result => {
				dispatch(success(result, action));
				dispatch(alertActions.success('New Contact Added'));
				dispatch(contactActions.viewContacts());
			})
			.catch(error => {
				dispatch(failure(error.toString()));
				// dispatch(alertActions.error(error.toString()));
			});
	};

	function request(contract) {
		return { type: contactConstants.ADD_CONTACT_REQUEST, contract };
	}
	function success(contract, action) {
		return { type: contactConstants.ADD_CONTACT_SUCCESS, contract, action };
	}
	function failure(error) {
		return { type: contactConstants.ADD_CONTACT_FAILURE, error };
	}
}

function viewContacts() {
	return dispatch => {
		dispatch(request());

		contactService
			.getAllContacts()
			.then(contacts => {
				dispatch(success(contacts));
			})
			.catch(error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			});
	};
	function request() {
		return { type: contactConstants.VIEW_CONTACTS_REQUEST };
	}
	function success(contacts) {
		return { type: contactConstants.VIEW_CONTACTS_SUCCESS, contacts };
	}
	function failure(error) {
		return { type: contactConstants.VIEW_CONTACTS_FAILURE, error };
	}
}

function sendMessage(id, message) {
	return dispatch => {
		dispatch(request());

		contactService
			.sendMessage(id, message)
			.then(contacts => {
				dispatch(success(contacts));
			})
			.catch(error => {
				dispatch(failure(error.toString()));
			});
	};
	function request() {
		return { type: contactConstants.SEND_MESSAGE_REQUEST };
	}
	function success(contacts) {
		return { type: contactConstants.SEND_MESSAGE_SUCCESS, contacts };
	}
	function failure(error) {
		return { type: contactConstants.SEND_MESSAGE_FAILURE, error };
	}
}

function removeContacts() {
	return dispatch => {
		dispatch(request());

		contactService
			.removeContacts()
			.then(() => {
				dispatch(success());
			})
			.catch(error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			});
	};
	function request() {
		return { type: contactConstants.REMOVE_CONTACTS_REQUEST };
	}
	function success() {
		return { type: contactConstants.REMOVE_CONTACTS_SUCCESS };
	}
	function failure(error) {
		return { type: contactConstants.REMOVE_CONTACTS_FAILURE, error };
	}
}
