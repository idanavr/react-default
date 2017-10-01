import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (css) =>
	<nav className={css.header}>
		<div className={css.navbar}>
			<Link to="/">Home</Link>
			<Link to="/about"> About us</Link>
			<Link to="/users"> Users</Link>
			<div className={css.rightNav}>
				<Link to="/register"> Register</Link>
			</div>
		</div>
	</nav>;

export default Navbar;