import moment from 'moment';

export const contactService = {
	getAllContacts,
	addContact,
	removeContacts,
	sendMessage,
};

function getAllContacts() {
	return new Promise(resolve => {
		const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
		return resolve(contacts);
	});
}

function addContact(contact) {
	return new Promise((resolve, reject) => {
		const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
		let nameExists = false;
		for (let i = 0; i < contacts.length; i++) {
			if (contacts[i].name === contact.name) {
				nameExists = true;
				break;
			}
		}
		if (nameExists) {
			return reject('Contact name already exists');
		}
		const id = contacts.length + 1;
		contacts.push({ ...contact, id, messages: [] });
		localStorage.setItem('contacts', JSON.stringify(contacts));
		return resolve(contacts);
	});
}

function removeContacts() {
	return new Promise(resolve => {
		localStorage.removeItem('contacts');
		resolve();
	});
}

function sendMessage(id, msg) {
	return new Promise(resolve => {
		const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
		const array = contacts.map(contact => {
			if (contact.id === id) {
				const { messages } = contact;
				const time = moment();
				const lastMessage = messages[messages.length - 1];
				if (
					lastMessage &&
					lastMessage.isSent &&
					time.diff(lastMessage.time, 'minute') < 1
				) {
					messages[messages.length - 1] = {
						...lastMessage,
						message: `${lastMessage.message}\r\n${msg}`,
					};
				} else {
					messages.push({ isSent: true, message: msg, time });
				}

				contact = Object.assign({}, { ...contact, messages });
			}
			return contact;
		});
		localStorage.setItem('contacts', JSON.stringify(array));
		return resolve(contacts);
	});
}
