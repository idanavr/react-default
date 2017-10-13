import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { LoginFunc } from './login.action';

class Login extends Component {
    
    render() {
        const { tryLogin, errorMsg } = this.props;

        function beforeLogin(e) {
            const userCredential = {};

            userCredential.email = document.getElementById('email').value;
            userCredential.password = document.getElementById('password').value;

            if(!userCredential.email.replace(/\s/g, '').length)
                userCredential.errors = 'Please write email';
            else if(!userCredential.password.replace(/\s/g, '').length)
                userCredential.errors = 'Please write password';
            
            tryLogin(userCredential);
            e.preventDefault();
        }
        
        return (
            <form onSubmit={(e) => beforeLogin(e) } role="form">
                <h2> Log-In </h2>
                <ul>
                    <li><input id="email" type="email" placeholder="Email" required /></li>
                    <li><input id="password" type="password" placeholder="Password" required /></li>
                    <li><button type="submit"> Enter </button></li>
                    <li>{ errorMsg }</li>
                </ul>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMsg: state.loginReducer.msg,
        authority: state.loginReducer.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return { 
        tryLogin : (data) => dispatch(LoginFunc(data)),
    };
}

Login.propTypes = {
    errorMsg: PropTypes.string,
    authority: PropTypes.string.isRequired,
    tryLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);