export const loginStatus = 'loginStatus';
export const loginSuccess = 'loginSuccess';

import axios from 'axios';

export function LoginFunc(data) {
    console.log('log in function started');
    return (dispatch) => {
        if (data.errors) {
            dispatch({ type: loginStatus, payload: data.errors });
        } else {
            axios.post('/api/login', data)
                .then((result) => {
                    console.log(result);
                    if(result.status === 200) {
                        localStorage.setItem('jwtToken', result.data.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
                        dispatch({ type: loginSuccess, user: result.data.user, token: result.data.token });
                    } else if(result.status === 204)
                        throw Error('Wrong credentials');
                    else
                        throw Error('Connection failed');
                })
                .catch((err) => {
                    dispatch({ type: loginStatus, payload: err.message });
                });
        }
    };
}

export function LogoutFunc() {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
    return { type: loginSuccess, token: '' };
}

export function checkTokenFunc(key) {
    console.log(key);
    if(!key)
        return { type: loginSuccess, token: '' };
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
        axios.get(`/api/login/${key}`)
            .then((result) => {
                if (result.status !== 403){
                    dispatch({ type: loginSuccess, user: result.data.user, token: key });
                } else
                    dispatch({ type: loginSuccess, token: '' });
            });
    };
}