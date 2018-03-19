import React from 'react';

import '../styles/Display.scss';

interface DisplayProps {
	value: number;
};

export class Display extends React.Component<DisplayProps> {
	public render() {
		return (
			<div id="display">
				<span>{this.props.value}</span>
			</div>
		);
	}
}
