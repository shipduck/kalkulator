import React from 'react';
import {
	render,
} from 'react-dom';

import {
	createStore,
	Action,
} from 'redux';
import {
	Provider,
} from 'react-redux';

import {
	reducers,
	State,
} from './reducers';

import {
	App,
} from './containers/App';

import './index.html';

const store = createStore<State, Action, void, void>(reducers);

class AppRouter extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}

render(<AppRouter />, document.querySelector('#app'));
