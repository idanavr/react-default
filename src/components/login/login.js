import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { LoginFunc } from './login.action';

class Login extends Component {
    
    render() {
        const { tryLogin, errorMsg } = this.props;

        function beforeLogin() {
            const userCredential = {};

            userCredential.email = document.getElementById('email').value;
            userCredential.password = document.getElementById('password').value;

            if(!userCredential.email.replace(/\s/g, '').length)
                userCredential.errors = 'Please write email';
            else if(!userCredential.password.replace(/\s/g, '').length)
                userCredential.errors = 'Please write password';
            
            tryLogin(userCredential);
        }
        
        return (
            <div>
                <h2> Log-In </h2>
                <ul>
                    <li><input id="email" type="text" placeholder="Email" /></li>
                    <li><input id="password" type="password" placeholder="Password" /></li>
                    <li><button onClick={() => beforeLogin() }>Enter</button></li>
                    <li>{ errorMsg }</li>
                </ul>
            </div>
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