export const updateLoginStatusMessage = 'updateLoginStatusMessage';
export const setLoginCredentials = 'setLoginCredentials';

import axios from 'axios';

export function LoginAction(data) {
    return (dispatch) => {
        if (data.error)
            return new Promise((resolve) => resolve(dispatch({ type: updateLoginStatusMessage, msg: data.error })));
        return axios.post('/api/login', data)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem('jwtToken', res.data.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                    return dispatch({ type: setLoginCredentials, user: res.data.user, token: res.data.token });
                }
                throw Error('Connection failed');
            })
            .catch((err) => {
                if (err.response.status === 404)
                    return dispatch({ type: updateLoginStatusMessage, msg: 'Wrong credentials' });
                return dispatch({ type: updateLoginStatusMessage, msg: err.message });
            });
    };
}

export function LogoutAction() {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
    return { type: setLoginCredentials, token: '' };
}

export function checkTokenAction(key) {
    console.log(key);
    if (!key)
        return { type: setLoginCredentials, token: '' };
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
        axios.get(`/api/login/${key}`)
            .then((result) => {
                if (result.status !== 403) {
                    dispatch({ type: setLoginCredentials, user: result.data.user, token: key });
                } else
                    dispatch({ type: setLoginCredentials, token: '' });
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: setLoginCredentials, token: '' });
            });
    };
}