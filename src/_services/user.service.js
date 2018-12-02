export const userService = {
	login,
	logout,
	isUserLoggedIn,
};

function login(username, password) {
	return new Promise((resolve, reject) => {
		if (username === 'admin' && password === 'admin') {
			const user = { username, password };
			// add user to local storage to log in
			localStorage.setItem('user', JSON.stringify(user));
			return resolve(user);
		}
		return reject('Invalid username or password');
	});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
	return Promise.resolve();
}

function isUserLoggedIn() {
	return JSON.parse(localStorage.getItem('user'));
}
