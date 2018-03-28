import React from 'react';
import {
	connect,
} from 'react-redux';

import {
	State,
} from '../reducers';

import '../styles/Display.scss';

interface DisplayProps {
	value: number;
};

class _Display extends React.Component<DisplayProps> {
	public render() {
		return (
			<div id="display">
				<span>{this.props.value}</span>
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'value': state.display.value,
	};
}

export const Display = connect(mapStateToProps)(_Display);
