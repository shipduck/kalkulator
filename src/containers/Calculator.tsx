import React from 'react';

import {
	Display,
} from '../components/Display';
import {
	Pad,
} from '../components/Pad';

export class Calculator extends React.Component {
	public render() {
		return (
			<div>
				<Display />
				<Pad />
			</div>
		);
	}
}
