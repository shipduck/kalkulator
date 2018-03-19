import React from 'react';

import { Calculator, } from './Calculator';

import 'semantic-ui-css/semantic.min.css';
import '../styles/App.scss';

export class App extends React.Component {
	public render() {
		return (
			<Calculator />
		);
	}
}
