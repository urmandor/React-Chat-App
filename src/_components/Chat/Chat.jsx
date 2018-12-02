import React from 'react';
import moment from 'moment';
import { Form, List, Header, Image } from 'semantic-ui-react';
import Avatar from '../../_images/profile.png';

export class ChatList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { message: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e, data) {
		const { name, value } = data;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const { message } = this.state;
		if (!message) {
			return;
		}
		const { onSend } = this.props;
		onSend(message);
		this.setState({ message: '' });
	}

	render() {
		const { contact } = this.props;
		const { message } = this.state;

		return (
			<React.Fragment>
				<Header color="teal" size="large" style={{ marginTop: 0 }}>
					<Image src={Avatar} /> {contact.name}
				</Header>
				<List size="large" style={{ marginBottom: 50 }}>
					{contact.messages.map((val, index) => {
						return (
							<List.Item key={index}>
								<List.Header style={{ color: 'gray', fontSize: 12 }}>
									{moment(val.time).calendar()}
								</List.Header>
								<List.Content
									className={`speech-bubble ${val.isSent ? 'left' : 'right'}`}
								>
									{val.message.split('\r\n').map((msg, i) => {
										return (
											<span key={i}>
												{msg}
												<br />
											</span>
										);
									})}
								</List.Content>
							</List.Item>
						);
					})}
				</List>
				<Form
					style={{ position: 'absolute', left: 10, right: 10, bottom: 10 }}
					onSubmit={this.handleSubmit}
				>
					<Form.Input
						fluid
						name="message"
						value={message}
						action={{ color: 'teal', content: 'Send' }}
						onChange={this.handleChange}
					/>
				</Form>
			</React.Fragment>
		);
	}
}
