import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAction } from './userEditProfile.action';
import './userEditProfile.scss';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

function UserEditProfile() {
    const currentUser = useSelector((state) => state.loginReducer.user) || {};
    const { msg: updateUserStatus } = useSelector((state) => state.userEditProfileReducer);
    const [submtting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        oldPassword: '',
        newPassword: '',
        gender: currentUser.gender || '',
    });

    return (
        <div>
            <h2>Edit Profile</h2>
            <form id="editProfileForm" onSubmit={(e) => beforeUpdateUser(e)} role="form">
                <TextField
                    defaultValue={currentUser.firstName}
                    id="firstName"
                    label="First Name"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <TextField
                    defaultValue={currentUser.lastName}
                    id="lastName"
                    label="Last Name"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <TextField
                    defaultValue={currentUser.email}
                    id="email"
                    label="Email Address"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                    id="oldPassword"
                    type="password"
                    label="Old Password"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                />
                <TextField
                    id="newPassword"
                    type="password"
                    label="New Password"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <RadioGroup aria-label="position" name="position" row defaultValue={currentUser.gender && currentUser.gender.toLowerCase()}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                    <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                        labelPlacement="top"
                    />
                </RadioGroup>
                <Button
                    disabled={submtting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    {submtting ? 'Updating...' : 'Update'}
                </Button>
                <div className="status-msg">
                    {updateUserStatus}
                </div>
            </form>
        </div>
    );

    function beforeUpdateUser(e) {
        e.preventDefault();
        setSubmitting(true);
        const { firstName, lastName, email, oldPassword, newPassword, gender } = formData;
        let updatedUser = {
            id: currentUser.id,
            firstName,
            lastName,
            email,
            oldPassword,
            newPassword,
            gender,
        };
        updatedUser = checkValidation(updatedUser);
        dispatch(updateUserAction(updatedUser))
            .then(() => {
                setSubmitting(false);
            });
    }

    function checkValidation(updatedUser) {
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
        else if (updatedUser.oldPassword.length < minPasswordLength)
            updatedUser.error = 'Old password is incorrect';
        else if (updatedUser.newPassword.length && updatedUser.newPassword.length < minPasswordLength)
            updatedUser.error = `The new password must be at least ${minPasswordLength} characters long`;
        else if (!updatedUser.gender)
            updatedUser.error = 'Gender is required';

        return updatedUser;
    }
}

export default UserEditProfile;