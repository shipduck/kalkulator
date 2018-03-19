import React from 'react';

import {
	Table,
	Button,
} from 'semantic-ui-react';

import '../styles/Pad.scss';

interface PadProps {
	value: number;
	handler: (value: number) => void;
};

enum State {
	IDLE = 'idle',
	ADDITION = 'addition',
	SUBTRACTION = 'subtraction',
	MULTIPLICATION = 'multiplication',
	DIVISION = 'division',
};

interface PadState {
	state: State;
	prevValue: number;
	prevState: State;
};

export class Pad extends React.Component<PadProps, PadState> {
	constructor(props: PadProps) {
		super(props);

		this.state = {
			'state': State.IDLE,
			'prevValue': 0,
			'prevState': State.IDLE,
		};
	}

	private clickClear() {
		this.props.handler(0);
		this.setState({
			'state': State.IDLE,
		});
	}

	private clickNumber(value: number) {
		if(this.state.state !== State.IDLE) {
			this.setState({
				'prevValue': this.props.value,
				'prevState': this.state.state,
				'state': State.IDLE,
			});
			this.props.handler(value);

			return;
		}

		this.props.handler(this.props.value * 10 + value);
	}

	private clickOperator(state: State) {
		this.setState({
			'state': state
		});
	}

	private clickEqual() {
		let value = this.props.value;

		switch(this.state.prevState) {
		case State.IDLE:
			break;
		case State.ADDITION:
			value = this.state.prevValue + value;
			break;
		case State.SUBTRACTION:
			value = this.state.prevValue - value;
			break;
		case State.MULTIPLICATION:
			value = this.state.prevValue * value;
			break;
		case State.DIVISION:
			value = this.state.prevValue / value;
			break;
		}

		this.props.handler(value);
		this.setState({
			'prevValue': 0,
			'prevState': State.IDLE,
		});
	}

	public render() {
		return (
			<Table id="pad">
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
							<Button circular className={`button_b ${this.state.state === State.DIVISION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(State.DIVISION);
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
							<Button circular className={`button_b ${this.state.state === State.MULTIPLICATION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(State.MULTIPLICATION);
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
							<Button circular className={`button_b ${this.state.state === State.SUBTRACTION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(State.SUBTRACTION);
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
							<Button circular className={`button_b ${this.state.state === State.ADDITION ? 'active' : ''}`} onClick={() => {
								this.clickOperator(State.ADDITION);
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
