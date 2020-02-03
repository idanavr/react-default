import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { updateUserFunc } from './userEditProfile.action';
import './userEditProfile.css';

class userEditProfile extends Component {

    render() {
        const { updateUserStatus } = this.props;
        console.log(this.props.user);
        const currentInfo = this.props.user;

        return (
            <div>
                <h2>Edit Profile</h2>
                <form id="editProfileForm" onSubmit={(e) => this.beforeUpdateUser(e)} role="form">
                    <div>
                        <input type="text" id="fName" defaultValue={currentInfo.firstName} placeholder="First Name" ref={(obj) => { this.firstNameInput = obj; }} required />
                    </div>
                    <div>
                        <input type="text" id="lName" defaultValue={currentInfo.lastName} placeholder="Last Name" ref={(obj) => { this.lastNameInput = obj; }} required />
                    </div>
                    <div>
                        <input type="email" id="email" defaultValue={currentInfo.email} placeholder="Email" ref={(obj) => { this.emailInput = obj; }} readOnly />
                    </div>
                    <div>
                        <input type="password" id="oldPassword" placeholder="Old Password" ref={(obj) => { this.oldPasswordInput = obj; }} required />
                    </div>
                    <div>
                        <input type="password" id="newPassword" placeholder="New Password" ref={(obj) => { this.newPasswordInput = obj; }} />
                    </div>
                    <div style={{ 'fontSize': '20px' }}>
                        <label htmlFor="radioMale">Male</label>
                        <input type="radio" id="radioMale" name="gender" value="male" defaultChecked={currentInfo.gender === 'male'} required />
                        <label htmlFor="radioFemale">Female</label>
                        <input type="radio" id="radioFemale" name="gender" value="female" defaultChecked={currentInfo.gender === 'female'} required />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                    <h5> {updateUserStatus} </h5>
                </form>
            </div>
        );
    }

    beforeUpdateUser(e) {
        let newUserInfo = {};
        newUserInfo.id = this.props.user.id;
        newUserInfo.firstName = this.firstNameInput.value;
        newUserInfo.lastName = this.lastNameInput.value;
        newUserInfo.email = this.emailInput.value;
        newUserInfo.oldPassword = this.oldPasswordInput.value;
        newUserInfo.newPassword = this.newPasswordInput.value;
        newUserInfo.gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
        newUserInfo = this.checkValidation(newUserInfo);

        console.log('user for action: ', newUserInfo);
        this.props.updateUser(newUserInfo);
        e.preventDefault();
    }

        checkValidation(updatedUser) {
        const removeSpacesRegex = /\s/g;
        const nameValidation = /^(?!.{51})[0-9a-zA-Z]+(?:[ -][0-9a-zA-Z]+)*$/;
        const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        const minPasswordLength = 6;

        if (!updatedUser.firstName.replace(removeSpacesRegex, '').length)
            updatedUser.error = 'First name is required';
        else if (!nameValidation.test(updatedUser.firstName))
            updatedUser.error = 'First name is not valid';
        else if (!updatedUser.lastName.replace(removeSpacesRegex, '').length)
            updatedUser.error = 'Last name is required';
        else if (!nameValidation.test(updatedUser.lastName))
            updatedUser.error = 'Last name is not valid';
        else if (!updatedUser.email.replace(removeSpacesRegex, '').length)
            updatedUser.error = 'Email is required';
        else if (!emailValidation.test(updatedUser.email))
            updatedUser.error = 'Email is not valid';
        else if (!updatedUser.oldPassword.replace(removeSpacesRegex, '').length)
            updatedUser.error = 'Old password is required';
        else if (updatedUser.newPassword.length && updatedUser.newPassword.length < minPasswordLength)
            updatedUser.error = `The new password must be at least ${minPasswordLength} characters long`;
        else if (!updatedUser.gender)
            updatedUser.error = 'Gender is required';

        return updatedUser;
    }
}

function mapStateToProps(state) {
	return {
        user: state.loginReducer.user,
        updateUserStatus: state.userEditProfileReducer.msg
	};
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (data) => dispatch(updateUserFunc(data)),
    };
}

userEditProfile.propTypes = {
    updateUserStatus: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(userEditProfile);