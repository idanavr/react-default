import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createUserFunc } from './register.action';
import { LoginFunc } from '../login/login.action';

class register extends Component {

    // componentWillMount() {
    //     console.log('authority', this.props.authority);
    //     if(this.props.authority) {
    //         this.props.history.push('/');
    //     }
    // }

    render() {
        
        const { newUserStatus, createUser, userLogin } = this.props;

        function checkValidation(newUser){
            const gender = document.querySelector('input[name="gender"]:checked');

            if(!newUser.firstName.replace(/\s/g, '').length)
                newUser.errors = 'Please write first name';
            else if(!newUser.lastName.replace(/\s/g, '').length)
                newUser.errors = 'Please write last name';
            else if(!newUser.email.replace(/\s/g, '').length)
                newUser.errors = 'Please write your email';
            else if(!newUser.password.replace(/\s/g, '').length)
                newUser.errors = 'Please write a password';
            else if(!gender)
                newUser.errors = 'Please select gender';
            else
                newUser.gender = gender.value;
            
            return newUser;
        }

        function beforeCreateUser() {
            let newUser = {};
            newUser.firstName = document.getElementById('fName').value;
            newUser.lastName = document.getElementById('lName').value;
            newUser.email = document.getElementById('email').value;
            newUser.password = document.getElementById('password').value;
            newUser = checkValidation(newUser);
            
            console.log('user for action: ', newUser);
            Promise.resolve(createUser(newUser)) // change it - for some reason .then doen't wait for the last dispatch to be done
            .then(() => setTimeout(() => {
                userLogin(newUser);
            }, 500)); 
        }

        return(
            <div>
            <h2>
            Register
            </h2>
                <ul>
                    <li><input type="text" id="fName" placeholder="First Name" /></li>
                    <li><input type="text" id="lName" placeholder="Last Name" /></li>
                    <li><input type="text" id="email" placeholder="Email" /></li>
                    <li><input type="password" id="password" placeholder="Password" /></li>
                    <li style={{ 'fontSize': '20px' }}>
                        <label htmlFor="radioMale">Male</label>
                        <input type="radio" id="radioMale" name="gender" value="male" />
                        <label htmlFor="radioFemale">Female</label>
                        <input type="radio" id="radioFemale" name="gender" value="female" />
                    </li>
                    <li><button onClick={ () => beforeCreateUser() } > Submit </button></li>
                </ul>
                <h3> { newUserStatus } </h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        newUserStatus: state.registerReducer.msg,
        authority: state.loginReducer.auth,
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
    createUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(register);