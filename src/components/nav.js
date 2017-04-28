import React, {Component} from 'react';
import {Link} from 'react-router'


const Navbar = (css) => 
	<nav className={css["navbar"]}>
	  <Link to="/">Home</Link>
	  <Link to="/about"> About us</Link>
	  <Link to="/users"> users</Link>
    </nav>

export default Navbar;