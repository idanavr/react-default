import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginAction } from './login.action';
import './login.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login() {
    const { msg: errorMsg } = useSelector((state) => state.loginReducer);
    const [submtting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    return (
        <div>
            <div>
                <h2>Login</h2>
            </div>
            <form id="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                    disabled={submtting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Log In
                </Button>
                <div className="status-msg">
                    {errorMsg}
                </div>
            </form>
        </div>
    );

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        const { email, password } = formData;
        let userCredential = {
            email,
            password
        };
        userCredential = checkValidation(userCredential);
        dispatch(LoginAction(userCredential))
            .then((res) => {
                if (!res.user)
                    setSubmitting(false);
            });
    }

    function checkValidation(userCredential) {
        const removeSpacesRegex = /\s/g;
        if (!userCredential.email.replace(removeSpacesRegex, '').length)
            userCredential.error = 'Email is required';
        else if (!userCredential.password.replace(removeSpacesRegex, '').length)
            userCredential.error = 'Password is required';

        return userCredential;
    }

}

export default Login;