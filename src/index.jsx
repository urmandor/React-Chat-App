import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

import '../semantic/dist/semantic.min.css';
import './styles/styles.css';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app'),
);
