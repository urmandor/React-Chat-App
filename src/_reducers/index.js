import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { tab } from './tab.reducer';
import { contacts } from './contact.reducer';

const rootReducer = combineReducers({
	authentication,
	alert,
	tab,
	contacts,
});

export default rootReducer;
