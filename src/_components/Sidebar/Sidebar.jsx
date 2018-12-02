import React from 'react';

import { tabs } from '../../_constants/tab.constants';
import { Sidebar, Menu, Accordion } from 'semantic-ui-react';

const tabNames = Object.keys(tabs);
tabNames.map(val => {
	tabs[val].MAIN;
});

export const HorizontalSidebar = ({
	animation,
	direction,
	visible,
	tab,
	changeTab,
	contacts,
	addContact,
}) => {
	console.log(tab);
	return (
		<Sidebar
			as={Menu}
			animation={animation}
			direction={direction}
			visible={visible}
			color="teal"
		>
			<Accordion as={Menu} fluid vertical>
				<Menu.Item
					key="add"
					icon="add user"
					name="addContact"
					content="Add Contact"
					onClick={addContact}
				/>
				{!contacts.loading &&
					contacts.items &&
					contacts.items.map(val => {
						return (
							<Menu.Item
								key={val.id}
								name={`${val.id}`}
								active={val.id === Number(tab.MAIN)}
								onClick={changeTab}
							>
								{val.name}
							</Menu.Item>
						);
					})}
			</Accordion>
		</Sidebar>
	);
};
