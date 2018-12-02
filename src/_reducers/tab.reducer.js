import { tabConstants, tabs } from '../_constants';

export function tab(
	state = {
		MAIN: tabs.CONTACTS.MAIN,
	},
	action,
) {
	const { type, ...tab } = action;
	/* eslint-disable indent */
	switch (type) {
		case tabConstants.CHANGE_TAB:
			state = {
				...state,
				MAIN: tab.MAIN,
			};
			return state;

		default:
			return state;
	}
	/* eslint-enable indent */
}
