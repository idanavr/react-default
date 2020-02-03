import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createUserFunc } from './register.action';
import { LoginFunc } from '../login/login.action';
import './register.css';

class Register extends Component {

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
                    <h5> {newUserStatus} </h5>
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
        const removeSpacesRegex = /\s/g;
        const nameValidation = /^(?!.{51})[0-9a-zA-Z]+(?:[ -][0-9a-zA-Z]+)*$/;
        const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        const minPasswordLength = 6;

        if (!newUser.firstName.replace(removeSpacesRegex, '').length)
            newUser.error = 'First name is required';
        else if (!nameValidation.test(newUser.firstName))
            newUser.error = 'First name is not valid';
        else if (!newUser.lastName.replace(removeSpacesRegex, '').length)
            newUser.error = 'Last name is required';
        else if (!nameValidation.test(newUser.lastName))
            newUser.error = 'Last name is not valid';
        else if (!newUser.email.replace(removeSpacesRegex, '').length)
            newUser.error = 'Email is required';
        else if (!emailValidation.test(newUser.email))
            newUser.error = 'Email is not valid';
        else if (!newUser.password.replace(removeSpacesRegex, '').length)
            newUser.error = 'Password is required';
        else if (newUser.password.length < minPasswordLength)
            newUser.error = `Password must be at least ${minPasswordLength} characters long`;
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

Register.propTypes = {
    newUserStatus: PropTypes.string,
    createUser: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);