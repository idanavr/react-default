import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from './register.action';
import { LoginAction } from '../login/login.action';
import './register.scss';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

function Register() {
    const { msg: newUserStatus } = useSelector((state) => state.registerReducer);
    const [submtting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
    });

    return (
        <div id="register">
            <div>
                <h2>Register</h2>
            </div>
            <form id="registerForm" onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    id="firstName"
                    label="First Name"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <TextField
                    id="email"
                    label="Email Address"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <RadioGroup aria-label="position" name="position" row
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
                    {submtting ? 'Registering...' : 'Register'}
                </Button>
                <div className="status-msg">
                    {newUserStatus}
                </div>
            </form>
        </div>
    );

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        const { firstName, lastName, email, password, gender } = formData;
        let newUser = {
            firstName,
            lastName,
            email,
            password,
            gender,
        };
        newUser = checkValidation(newUser);
        dispatch(createUserAction(newUser))
            .then((res) => {
                if (!res.msg.length) {
                    setSubmitting(false);
                    dispatch(LoginAction(newUser));
                }
            });
    }

    function checkValidation(newUser) {
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

export default Register;