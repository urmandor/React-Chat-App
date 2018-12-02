import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Loader, Message } from 'semantic-ui-react';
import { ChatList } from '../_components/Chat';
import { contactActions } from '../_actions';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.messagesEnd;
		this.onSendMessage = this.onSendMessage.bind(this);
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	onSendMessage(message) {
		const { tab, dispatch } = this.props;
		dispatch(contactActions.sendMessage(Number(tab.MAIN), message));
	}

	scrollToBottom = () => {
		if (this.messagesEnd) {
			this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
		}
	};

	render() {
		const { contacts, tab } = this.props;
		let contact;
		if (tab.MAIN && !contacts.loading && contacts.items) {
			contact = contacts.items.reduce((prev, curr) => {
				if (curr.id === Number(tab.MAIN)) {
					return curr;
				}
				return prev;
			}, undefined);
		}
		return (
			<Grid columns={1}>
				<Grid.Column>
					<Segment style={{ minHeight: 500, position: 'relative' }}>
						<React.Fragment>
							<Loader active={contacts.loading}>Loading</Loader>
							{contacts.loading ||
								(contact && tab.MAIN ? (
									<React.Fragment>
										<ChatList contact={contact} onSend={this.onSendMessage} />
										<div
											style={{ float: 'left', clear: 'both' }}
											ref={el => {
												this.messagesEnd = el;
											}}
										/>
									</React.Fragment>
								) : (
									<Message content="Select a contact from the left menu to view their conversation" />
								))}
						</React.Fragment>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	const { contacts, tab } = state;
	return {
		contacts,
		tab,
	};
}

const connectedMainPage = connect(mapStateToProps)(MainPage);
export { connectedMainPage as MainPage };
