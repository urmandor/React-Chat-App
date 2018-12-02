import React from 'react';

import { Icon, Menu, Header } from 'semantic-ui-react';

export const Topbar = ({ toggleVisibility, logout }) => (
	<Menu secondary attached="top" className="topbar">
		<Menu.Item onClick={() => toggleVisibility()}>
			<Icon name="sidebar" /> Contacts
		</Menu.Item>
		<Menu.Item>
			<Header color="teal">Faltu Chat App</Header>
		</Menu.Item>
		<Menu.Item position="right" onClick={() => logout()}>
			Logout
		</Menu.Item>
	</Menu>
);
