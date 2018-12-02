import { tabConstants } from '../_constants';
import { history } from '../_helpers';
export const tabActions = {
	changeTab,
};

function changeTab(tab) {
	history.push(tab);
	return {
		type: tabConstants.CHANGE_TAB,
		MAIN: tab,
	};
}
