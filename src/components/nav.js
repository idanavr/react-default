import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { LogoutFunc } from './login/login.action';

class Navbar extends Component {

	render() {

		const { authorities, Logout, user, css } = this.props;

		function beforeLogout() {
			Logout();
		}

		let nav = '';
		if (authorities)
			nav =
				<div className={css.navbar}>
					<NavLink activeClassName={css.activeLink} exact to="/"> Home </NavLink>
					<NavLink activeClassName={css.activeLink} exact to="/about"> About us </NavLink>
					<NavLink activeClassName={css.activeLink} to="/users"> Users </NavLink>
					<div className={css.rightNav}>
						{user.firstName},<NavLink to="#" onClick={() => beforeLogout()}> Logout </NavLink>
					</div>
				</div>;
		else
			nav =
				<div className={css.navbar}>
					<NavLink activeClassName={css.activeLink} exact to="/">Home</NavLink>
					<NavLink activeClassName={css.activeLink} exact to="/about"> About us</NavLink>
					<div className={css.rightNav}>
						<NavLink activeClassName={css.activeLink} exact to="/login"> Login</NavLink>
						<NavLink activeClassName={css.activeLink} exact to="/register"> Register</NavLink>
					</div>
				</div>;


		return (
			<nav className={this.props.css.header}>
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