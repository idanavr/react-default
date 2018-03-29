import React, { Component } from 'react';
import './about.css';

export default class AboutUs extends Component {

    render() {
        return (
            <div>
                <h2>
                    About Us
                </h2>
                My name is Idan Avrahami <br />
                I am serving at the army as a professional full stack developer <br />
                Feel free to contact me for any question or request: <br />
                <a href="https://github.com/idanavr">
                    <i className="fab fa-github icon github" title="GitHub"></i>
                </a>
                <a href="https://www.linkedin.com/in/idanavrahami/">
                    <i className="fab fa-linkedin icon linkedin" title="LinkedIn"></i>
                </a>
            </div>
        );
    }
} 