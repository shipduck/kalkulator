import React from 'react';

import { Display, } from '../components/Display';
import { Pad, } from '../components/Pad';

interface CalculatorState {
	value: number;
};

export class Calculator extends React.Component<{}, CalculatorState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			'value': 0,
		};
	}

	protected updateValue(value: number) {
		this.setState({
			'value': value,
		});
	}

	public render() {
		return (
			<div>
				<Display value={this.state.value} />
				<Pad value={this.state.value} handler={this.updateValue.bind(this)} />
			</div>
		);
	}
}
