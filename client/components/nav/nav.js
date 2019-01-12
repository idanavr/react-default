import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import './nav.css';
import { LogoutFunc } from '../login/login.action';

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
		const nav = this.getNavBar();
		const mobileMenuIcon = this.getMobileMenuIcon();

		return (
			<nav className="header">
				{mobileMenuIcon}
				{nav}
			</nav>
		);
	}
	
	toggleMenu() {
		this.setState({ showMenu: !this.state.showMenu });
	}

	getNavBar() {
		const { authority, user, Logout } = this.props;

		if (authority)
			return (
				<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
					<NavLink activeClassName="activeLink" exact to="/">Home</NavLink>
					<NavLink activeClassName="activeLink" exact to="/about">About us</NavLink>
					<NavLink activeClassName="activeLink" exact to="/users">Users</NavLink>
					<div className="rightNav">
						<div>
							{user.firstName}, <NavLink to="#" onClick={() => Logout()}>Logout</NavLink>
						</div>
					</div>
				</div>);

		return (
			<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
				<NavLink activeClassName="activeLink" exact to="/">Home</NavLink>
				<NavLink activeClassName="activeLink" exact to="/about">About us</NavLink>
				<div className="rightNav">
					<NavLink activeClassName="activeLink" exact to="/login">Login</NavLink>
					<NavLink activeClassName="activeLink" exact to="/register">Register</NavLink>
				</div>
			</div>);
	}

	getMobileMenuIcon() {
		return (
			this.state.showMenu
				? <span className="small-menu fa-stack" onClick={() => this.toggleMenu()}>
					<i className="far fa-times-circle fa-2x"></i>
				</span>
				: <span className="small-menu fa-stack" onClick={() => this.toggleMenu()}>
					<i className="far fa-circle fa-stack-2x"></i>
					<i className="fas fa-bars fa-stack-1x">
					</i>
				</span>);
	}
}

function mapStateToProps(state) {
	return {
		authority: state.loginReducer.auth,
		user: state.loginReducer.user,
	};
}

function mapDispatchToProps(dispatch) {
    return {
        Logout: () => dispatch(LogoutFunc()) 
    };
}

Navbar.propTypes = {
	authority: PropTypes.string.isRequired,
	user: PropTypes.object,
	Logout: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	ReactGA: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));