import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutFunc } from './login/login.action';

class Navbar extends Component {

	render() {

		const { authorities, Logout, user } = this.props;

		function beforeLogout() {
			Logout();
		}

		let nav = '';
		if (authorities)
			nav = 
			<div className={this.props.css.navbar}>
				<Link to="/"> Home </Link>
				<Link to="/about"> About us </Link>
				<Link to="/users"> Users </Link>
				<div className={this.props.css.rightNav}>
					{user.firstName},<Link to="#" onClick={() => beforeLogout()}> Logout </Link>
				</div>
			</div>;
		else
			nav = 
			<div className={this.props.css.navbar}>
				<Link to="/">Home</Link>
				<Link to="/about"> About us</Link>
				<div className={this.props.css.rightNav}>
					<Link to="/login"> Login</Link>
					<Link to="/register"> Register</Link>
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


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);