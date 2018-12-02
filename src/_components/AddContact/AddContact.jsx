import React from 'react';
import { Modal, Form, Message } from 'semantic-ui-react';

export class AddContact extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '' };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e, data) {
		const { name, value } = data;
		this.setState({ [name]: value });
	}

	onSubmit(e) {
		e.preventDefault();
		const { name } = this.state;
		this.props.handleSubmit(name);
	}

	render() {
		const { show, onClose, alert } = this.props;
		const { name } = this.state;
		return (
			<Modal dimmer="blurring" open={show} onClose={onClose}>
				<Modal.Header content="Add Contact" />
				<Modal.Content>
					{alert && <Message error content={alert} />}
					<Form size="large" name="form" onSubmit={this.onSubmit}>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Contact Name"
							name="name"
							value={name}
							onChange={this.onChange}
						/>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Form.Button
						positive
						icon="checkmark"
						labelPosition="right"
						content="Add Contact"
						onClick={this.onSubmit}
					/>
				</Modal.Actions>
			</Modal>
		);
	}
}
