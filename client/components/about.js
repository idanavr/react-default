import React, { Component } from 'react';

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
                    <img height="40px" src="/github.png" title="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/idanavrahami/" className="logo-link">
                    <img height="40px" src="/linkedin.png" title="LinkedIn" />
                </a>
            </div>
        );
    }
} 