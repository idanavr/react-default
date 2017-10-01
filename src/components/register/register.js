import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createUserFunc } from './register.action';

class register extends Component {


    render() {
        
        const { newUserStatus, createUser } = this.props;

        function checkValidation(newUser){
            const gender = document.querySelector('input[name="gender"]:checked');

            if(!newUser.firstName.replace(/\s/g, '').length)
                newUser.errors = 'Please write first name';
            else if(!newUser.lastName.replace(/\s/g, '').length)
                newUser.errors = 'Please write last name';
            else if(!newUser.email.replace(/\s/g, '').length)
                newUser.errors = 'Please write your email';
            else if(!gender)
                newUser.errors = 'Please select gender';
            else
                newUser.gender = gender.value;
            
            return newUser;
        }

        function beforeCreateUser() {
            let newUser = { };
            newUser.firstName = document.getElementById('fName').value;
            newUser.lastName = document.getElementById('lName').value;
            newUser.email = document.getElementById('email').value;
            newUser = checkValidation(newUser);
            // if(gender && newUser.firstName.replace(/\s/g, '').length && newUser.lastName.replace(/\s/g, '').length && newUser.email.replace(/\s/g, '').length)
            //     newUser.gender = gender.value;
            // else
            //     newUser.errors = 'Please fill all the fields';
            console.log('user for action: ', newUser);
            createUser(newUser);
        }

        return(
            <div>
            <h2>
            Register
            </h2>
                <ul>
                    <li><input id="fName" type="text" placeholder="First Name" /></li>
                    <li><input id="lName" type="text" placeholder="Last Name" /></li>
                    <li><input id="email" type="text" placeholder="email" /></li>
                    <li style={{ 'font-size': '20px' }}>
                        <label htmlFor="radioMale">Male</label>
                        <input id="radioMale" type="radio" name="gender" value="male" />
                        <label htmlFor="radioFemale">Female</label>
                        <input id="radioFemale" type="radio" name="gender" value="female" />
                    </li>
                    <li><input type="button" value="Submit" onClick={ () => beforeCreateUser() } /></li>
                </ul>
                <h3> { newUserStatus } </h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        newUserStatus: state.registerReducer.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: (data) => dispatch(createUserFunc(data)) 
    };
}

register.propTypes = {
    newUserStatus: PropTypes.string.isRequired,
    createUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(register);