export const loginStatusMessage = 'loginStatusMessage';
export const setLoginCredentials = 'setLoginCredentials';

import axios from 'axios';

export function LoginFunc(data) {
    console.log('log in function started');
    return (dispatch) => {
        if (data.error) {
            dispatch({ type: loginStatusMessage, payload: data.error });
        } else {
            axios.post('/api/login', data)
                .then((result) => {
                    console.log(result);
                    if(result.status === 200) {
                        localStorage.setItem('jwtToken', result.data.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
                        dispatch({ type: setLoginCredentials, user: result.data.user, token: result.data.token });
                    } else
                        throw Error('Connection failed');
                })
                .catch((err) => {
                    if(err.response.status === 404)
                        dispatch({ type: loginStatusMessage, payload: 'Wrong credentials' });
                    else
                        dispatch({ type: loginStatusMessage, payload: err.message });
                });
        }
    };
}

export function LogoutFunc() {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
    return { type: setLoginCredentials, token: '' };
}

export function checkTokenFunc(key) {
    console.log(key);
    if(!key)
        return { type: setLoginCredentials, token: '' };
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
        axios.get(`/api/login/${key}`)
            .then((result) => {
                if (result.status !== 403){
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