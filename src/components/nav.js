import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { LogoutFunc } from './login/login.action';

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.props.history.listen((location) => {
			this.props.ReactGA.set({ page: location.pathname + location.search });
			this.props.ReactGA.pageview(location.pathname + location.search);
		});
	}

	render() {

		const { authorities, Logout, user } = this.props;

		function beforeLogout() {
			Logout();
		}

		let nav = '';
		if (authorities)
			nav =
				<div className="navbar">
					<NavLink activeClassName="activeLink" exact to="/"> Home </NavLink>
					<NavLink activeClassName="activeLink" exact to="/about"> About us </NavLink>
					<NavLink activeClassName="activeLink" to="/users"> Users </NavLink>
					<div className="rightNav">
						{user.firstName},<NavLink to="#" onClick={() => beforeLogout()}> Logout </NavLink>
					</div>
				</div>;
		else
			nav =
				<div className="navbar">
					<NavLink activeClassName="activeLink" exact to="/">Home</NavLink>
					<NavLink activeClassName="activeLink" exact to="/about"> About us</NavLink>
					<div className="rightNav">
						<NavLink activeClassName="activeLink" exact to="/login"> Login</NavLink>
						<NavLink activeClassName="activeLink" exact to="/register"> Register</NavLink>
					</div>
				</div>;


		return (
			<nav className="header">
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));