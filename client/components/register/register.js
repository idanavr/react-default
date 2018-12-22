import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createUserFunc } from './register.action';
import { LoginFunc } from '../login/login.action';
import './register.css';

class register extends Component {

    render() {
        const { newUserStatus } = this.props;

        return (
            <div>
                <div>
                    <h2>Register</h2>
                </div>
                <form id="registerForm" onSubmit={(e) => this.beforeCreateUser(e)} role="form">
                    <div>
                        <input type="text" id="fName" placeholder="First Name" ref={(obj) => { this.firstNameInput = obj; }} required />
                    </div>
                    <div>
                        <input type="text" id="lName" placeholder="Last Name" ref={(obj) => { this.lastNameInput = obj; }} required />
                    </div>
                    <div>
                        <input type="email" id="email" placeholder="Email" ref={(obj) => { this.emailInput = obj; }} required />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="Password" ref={(obj) => { this.passwordInput = obj; }} required />
                    </div>
                    <div style={{ 'fontSize': '20px' }}>
                        <label htmlFor="radioMale">Male</label>
                        <input type="radio" id="radioMale" name="gender" value="male" required />
                        <label htmlFor="radioFemale">Female</label>
                        <input type="radio" id="radioFemale" name="gender" value="female" required />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                    <h3> {newUserStatus} </h3>
                </form>
            </div>
        );
    }

    beforeCreateUser(e) {
        let newUser = {};
        newUser.firstName = this.firstNameInput.value;
        newUser.lastName = this.lastNameInput.value;
        newUser.email = this.emailInput.value;
        newUser.password = this.passwordInput.value;
        newUser.gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
        newUser = this.checkValidation(newUser);

        console.log('user for action: ', newUser);
        Promise.resolve(this.props.createUser(newUser)) // change it - for some reason .then doen't wait for the last dispatch to be done
            .then(() => setTimeout(() => {
                this.props.userLogin(newUser);
            }, 500));
        e.preventDefault();
    }

    checkValidation(newUser) {
        // Do better validation for string input (like spaces should return warning)
        const removeSpacesRegex = /\s/g;

        if (!newUser.firstName.replace(removeSpacesRegex, '').length)
            newUser.error = 'First name is required';
        else if (!newUser.lastName.replace(removeSpacesRegex, '').length)
            newUser.error = 'Last name is required';
        else if (!newUser.email.replace(removeSpacesRegex, '').length)
            newUser.error = 'Email name is required';
        else if (!newUser.password.replace(removeSpacesRegex, '').length)
            newUser.error = 'Password is required';
        else if (!newUser.gender)
            newUser.error = 'Gender is required';

        return newUser;
    }
}

function mapStateToProps(state) {
    return {
        newUserStatus: state.registerReducer.msg,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: (data) => dispatch(createUserFunc(data)),
        userLogin: (data) => dispatch(LoginFunc(data)),
    };
}

register.propTypes = {
    newUserStatus: PropTypes.string,
    createUser: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(register);