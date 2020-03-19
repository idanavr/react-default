import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { LogoutAction } from '../login/login.action';
import { v4 as uuidv4 } from 'uuid';
import { isAllowedToUserRole } from '../../utils';
import './nav.scss';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.props.history.listen((location) => {
			this.props.ReactGA.set({ page: location.pathname + location.search });
			this.props.ReactGA.pageview(location.pathname + location.search);
		});
		this.state = { showMenu: false };
	}

	render() {
		const nav = this.getNavbar();
		const mobileMenuIcon = this.getMobileMenuIcon();

		return (
			<nav id="header">
				{mobileMenuIcon}
				{nav}
			</nav>
		);
	}

	toggleMenu() {
		this.setState({ showMenu: !this.state.showMenu });
	}

	getNavbar() {
		const { user, Logout } = this.props;

		const generateNavFromComponentList = (components) => (
			<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
				{components.map((component) =>
					<React.Fragment key={uuidv4()}>
						{component}
					</React.Fragment>)}
			</div>
		);

		const optionsList = [];
		optionsList.push(<NavLink activeClassName="activeLink" exact to="/">Home</NavLink>);
		optionsList.push(<NavLink activeClassName="activeLink" exact to="/about">About Us</NavLink>);

		if (user) {
			optionsList.push(<NavLink activeClassName="activeLink" exact to="/user/edit">Edit Profile</NavLink>);

			if (isAllowedToUserRole(user, ['admin'])) {
				optionsList.push(<NavLink activeClassName="activeLink" exact to="/admin/users">Users</NavLink>);
			}

			optionsList.push(
				<div className="rightNav">
					<div>
						{user.firstName},<NavLink to="#" onClick={() => Logout()}>Log Out</NavLink>
					</div>
				</div>
			);
		} else {
			optionsList.push(
				<div className="rightNav">
					<NavLink activeClassName="activeLink" exact to="/login">Login</NavLink>
					<NavLink activeClassName="activeLink" exact to="/register">Register</NavLink>
				</div>
			);
		}
		return generateNavFromComponentList(optionsList);
	}

	getMobileMenuIcon() {
		return (
			this.state.showMenu
				? <span className="small-menu" onClick={() => this.toggleMenu()}>
					<KeyboardBackspaceRoundedIcon />
				</span>
				: <span className="small-menu" onClick={() => this.toggleMenu()}>
					<MenuRoundedIcon />
				</span>);
	}
}

function mapStateToProps(state) {
	return {
		user: state.loginReducer.user,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		Logout: () => dispatch(LogoutAction())
	};
}

Navbar.propTypes = {
	user: PropTypes.object,
	Logout: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	ReactGA: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));