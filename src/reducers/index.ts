import {
	combineReducers,
} from 'redux';

import {
	DisplayUpdateKeys,
	DisplayUpdateAction,
} from '../actions';

interface DisplayUpdateState {
	value: number;
};

function display(state: DisplayUpdateState = {
	'value': 0,
}, action: DisplayUpdateAction): DisplayUpdateState {
	switch(action.type) {
	case DisplayUpdateKeys.DISPLAY_UPDATE:
		return {
			'value': action.value,
		};
	default:
		return state;
	}
}

export interface State {
	display: DisplayUpdateState;
};

export const reducers = combineReducers<State>({
	'display': display,
});
