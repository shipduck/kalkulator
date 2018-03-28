import {
	Action,
} from 'redux';

export enum DisplayUpdateKeys {
	DISPLAY_UPDATE = 'DISPLAY_UPDATE',
};

export interface DisplayUpdateAction extends Action {
	type: DisplayUpdateKeys.DISPLAY_UPDATE;
	value: number;
};

export function displayUpdate(value: number): DisplayUpdateAction {
	return {
		'type': DisplayUpdateKeys.DISPLAY_UPDATE,
		'value': value,
	};
}
