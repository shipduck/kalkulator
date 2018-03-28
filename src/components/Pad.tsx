import React from 'react';
import {
	connect,
	Dispatch,
} from 'react-redux';

import {
	State,
} from '../reducers';

import {
	displayUpdate,
} from '../actions';

import {
	Table,
	Button,
} from 'semantic-ui-react';

import '../styles/Pad.scss';

enum PadState {
	IDLE = 'idle',
	ADDITION = 'addition',
	SUBTRACTION = 'subtraction',
	MULTIPLICATION = 'multiplication',
	DIVISION = 'division',
};

interface ComponentProps {
	value: number;
	dispatch: Dispatch<any>;
};

interface ComponentState {
	state: PadState;
	prevValue: number;
	prevState: PadState;
};

class _Pad extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.state = {
			'state': PadState.IDLE,
			'prevValue': 0,
			'prevState': PadState.IDLE,
		};
	}

	private clickClear() {
		this.props.dispatch(displayUpdate(0));
		this.setState({
			'state': PadState.IDLE,
		});
	}

	private clickNumber(value: number) {
		if(this.state.state !== PadState.IDLE) {
			this.setState({
				'prevValue': this.props.value,
				'prevState': this.state.state,
				'state': PadState.IDLE,
			});
			this.props.dispatch(displayUpdate(value));

			return;
		}

		this.props.dispatch(displayUpdate(this.props.value * 10 + value));
	}

	private clickOperator(state: PadState) {
		this.setState({
			'state': state
		});
	}

	private clickEqual() {
		let value = this.props.value;

		switch(this.state.prevState) {
		case PadState.IDLE:
			break;
		case PadState.ADDITION:
			value = this.state.prevValue + value;
			break;
		case PadState.SUBTRACTION:
			value = this.state.prevValue - value;
			break;
		case PadState.MULTIPLICATION:
			value = this.state.prevValue * value;
			break;
		case PadState.DIVISION:
			value = this.state.prevValue / value;
			break;
		}

		this.props.dispatch(displayUpdate(value));
		this.setState({
			'prevValue': 0,
			'prevState': PadState.IDLE,
		});
	}

	public render() {
		return (
			<Table id="pad" unstackable>
				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<Button circular className="button_a" onClick={() => {
								this.clickClear();
							}}>{this.props.value === 0 ? 'AC': 'C'}</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_a">±</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_a">%</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className={`button_b ${this.state.state === PadState.DIVISION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(PadState.DIVISION);
							}}>÷</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(7);
							}}>7</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(8);
							}}>8</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(9);
							}}>9</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className={`button_b ${this.state.state === PadState.MULTIPLICATION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(PadState.MULTIPLICATION);
							}}>×</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(4);
							}}>4</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(5);
							}}>5</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(6);
							}}>6</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className={`button_b ${this.state.state === PadState.SUBTRACTION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(PadState.SUBTRACTION);
							}}>-</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(1);
							}}>1</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(2);
							}}>2</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(3);
							}}>3</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className={`button_b ${this.state.state === PadState.ADDITION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(PadState.ADDITION);
							}}>+</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell id="pad_zero" colSpan="2">
							<Button circular className="button_c" onClick={() => {
								this.clickNumber(0);
							}}>0</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_c">.</Button>
						</Table.Cell>
						<Table.Cell>
							<Button circular className="button_b" onClick={() => {
								this.clickEqual();
							}}>=</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'value': state.display.value,
	};
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
	return {
		'dispatch': dispatch,
	};
}

export const Pad = connect(mapStateToProps, mapDispatchToProps)(_Pad);
