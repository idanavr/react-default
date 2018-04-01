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

	toggleMenu() {
		this.setState({ showMenu: !this.state.showMenu });
	}

	beforeLogout() {
		this.props.Logout();
	}

	render() {
		const { authorities, user } = this.props;

		let nav = '';
		if (authorities)
			nav =
				<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
					<NavLink activeClassName="activeLink" exact to="/"> Home </NavLink>
					<NavLink activeClassName="activeLink" exact to="/about"> About us </NavLink>
					<NavLink activeClassName="activeLink" to="/users"> Users </NavLink>
					<div className="rightNav">
						{user.firstName},<NavLink to="#" onClick={() => this.beforeLogout()}> Logout </NavLink>
					</div>
				</div>;
		else
			nav =
				<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
					<NavLink activeClassName="activeLink" exact to="/">Home</NavLink>
					<NavLink activeClassName="activeLink" exact to="/about"> About us</NavLink>
					<div className="rightNav">
						<NavLink activeClassName="activeLink" exact to="/login"> Login</NavLink>
						<NavLink activeClassName="activeLink" exact to="/register"> Register</NavLink>
					</div>
				</div>;

		const smallMenu = this.state.showMenu
			? <span className="small-menu fa-stack" onClick={() => this.toggleMenu()}>
				<i className="far fa-times-circle fa-2x"></i>
				</span>
			: <span className="small-menu fa-stack" onClick={() => this.toggleMenu()}>
				<i className="far fa-circle fa-stack-2x"></i>
				<i className="fas fa-bars fa-stack-1x">
				</i>
			</span>;

		return (
			<nav className="header">
				{smallMenu}
				{nav}
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		authorities: state.loginReducer.auth,
		user: state.loginReducer.user,
	};
}

function mapDispatchToProps(dispatch) {
    return {
        Logout: () => dispatch(LogoutFunc()) 
    };
}

Navbar.propTypes = {
	authorities: PropTypes.string.isRequired,
	user: PropTypes.object,
	Logout: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	ReactGA: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));