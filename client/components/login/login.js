import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { LoginFunc } from './login.action';
import './login.css';

class Login extends Component {

    render() {
        const { errorMsg } = this.props;

        return (
            <div>
                <div>
                    <h2>Login</h2>
                </div>
                <form id="loginForm" onSubmit={(e) => this.beforeLogin(e)} role="form">
                    <div>
                        <input id="email" type="email" placeholder="Email" ref={(obj) => { this.emailInput = obj; }} required />
                    </div>
                    <div>
                        <input id="password" type="password" placeholder="Password" ref={(obj) => { this.passwordInput = obj; }} required />
                    </div>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                    <div>
                        {errorMsg}
                    </div>
                </form>
            </div>
        );
    }

    beforeLogin(e) {
        const userCredential = {};

        userCredential.email = this.emailInput.value;
        userCredential.password = this.passwordInput.value;

        const removeSpacesRegex = /\s/g;
        if (!userCredential.email.replace(removeSpacesRegex, '').length)
            userCredential.error = 'Email name is required';
        else if (!userCredential.password.replace(removeSpacesRegex, '').length)
            userCredential.error = 'Password is required';

        this.props.tryLogin(userCredential);
        e.preventDefault();
    }
}

function mapStateToProps(state) {
    return {
        errorMsg: state.loginReducer.msg,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        tryLogin: (data) => dispatch(LoginFunc(data)),
    };
}

Login.propTypes = {
    errorMsg: PropTypes.string,
    tryLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);