import React from 'react';
import { connect } from 'react-redux';
import { tabActions, userActions, contactActions } from '../../_actions';
import { HorizontalSidebar } from '../Sidebar';
import { Topbar } from '../Topbar';
import { AddContact } from '../AddContact';

import { Sidebar, Segment } from 'semantic-ui-react';

class MainLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSideBarVisible: true,
			showModal: false,
		};
		this.toggleSideBarVisibility = this.toggleSideBarVisibility.bind(this);
		this.changeTab = this.changeTab.bind(this);
		this.logout = this.logout.bind(this);
		this.showModal = this.showModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.handleContractAdd = this.handleContractAdd.bind(this);
	}
	componentDidMount() {
		const { dispatch, path } = this.props;
		dispatch(tabActions.changeTab(path.contact));
	}

	logout() {
		const { dispatch } = this.props;
		dispatch(userActions.logout());
	}

	toggleSideBarVisibility() {
		const { isSideBarVisible } = this.state;
		this.setState({ isSideBarVisible: !isSideBarVisible, transition: false });
	}

	changeTab(e, { name }) {
		const { dispatch } = this.props;
		dispatch(tabActions.changeTab(name));
	}

	showModal() {
		this.setState({ showModal: true });
	}

	onCloseModal() {
		this.setState({ showModal: false });
	}

	handleContractAdd(name) {
		const { dispatch } = this.props;
		const contact = { name };
		dispatch(contactActions.addContact(contact, this.onCloseModal));
	}

	render() {
		const { isSideBarVisible, showModal } = this.state;
		const { contacts, tab } = this.props;

		return (
			<React.Fragment>
				<Topbar
					toggleVisibility={this.toggleSideBarVisibility}
					logout={this.logout}
				/>

				<div className="main-content">
					<Sidebar.Pushable
						style={{ minHeight: '100vh', background: 'transparent' }}
						as={Segment}
						attached="bottom"
					>
						<HorizontalSidebar
							visible={isSideBarVisible}
							animation="overlay"
							direction="left"
							tab={tab}
							contacts={contacts}
							changeTab={this.changeTab}
							addContact={this.showModal}
						/>
						<Sidebar.Pusher>
							<div
								className="padding-transition"
								style={{
									paddingLeft: isSideBarVisible ? 260 : 0,
								}}
							>
								<Segment basic>
									<AddContact
										show={showModal}
										onClose={this.onCloseModal}
										handleSubmit={this.handleContractAdd}
										alert={contacts.error}
									/>
									{this.props.children}
								</Segment>
							</div>
						</Sidebar.Pusher>
					</Sidebar.Pushable>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { tab, contacts } = state;
	return {
		tab,
		contacts,
	};
}

const connectedLayout = connect(mapStateToProps)(MainLayout);
export { connectedLayout as MainLayout };
