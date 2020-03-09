import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import './about.scss';

export default function AboutUs() {
    return (
        <div id="about" className="animated fadeIn">
            <h2>About Us</h2>
            <div>
                My name is Idan Avrahami <br />
                I am working as a professional full stack developer <br />
                Feel free to contact me for any question or request: <br />
            </div>
            <div id="social-networks">
                <a href="https://www.linkedin.com/in/idanavrahami/">
                    <GitHubIcon fontSize="large" style={{ color: '#24292e' }} />
                </a>
                <a href="https://github.com/idanavr">
                    <LinkedInIcon fontSize="large" style={{ color: '#0077b5' }} />
                </a>
            </div>
        </div>
    );
} 