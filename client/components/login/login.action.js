export const updateLoginStatusMessage = 'updateLoginStatusMessage';
export const setUserData = 'setUserData';
import axios from 'axios';

export function LoginAction(data) {
    return (dispatch) => {
        if (data.error)
            return new Promise((resolve) => resolve(dispatch({ type: updateLoginStatusMessage, msg: data.error })));
        return axios.post('/api/login', data)
            .then((res) => {
                if (res.status === 200)
                    return dispatch({ type: setUserData, user: res.data });
                throw new Error('Connection failed');
            })
            .catch((err) => {
                if (err.response.status === 404)
                    return dispatch({ type: updateLoginStatusMessage, msg: 'Wrong credentials' });
                return dispatch({ type: updateLoginStatusMessage, msg: err.message });
            });
    };
}

export function LogoutAction() {
    return (dispatch) =>
        axios.post('/api/login/logout')
            .then((result) => {
                if (result.status === 204)
                    return dispatch({ type: setUserData, user: null });                    
                throw Error('Couldn\'t log out');
            });
}

export function verifyUserAction() {
    return (dispatch) =>
        axios.get('/api/users/me')
            .then((result) => {
                if (result.status === 200)
                    return dispatch({ type: setUserData, user: result.data });
                return dispatch({ type: setUserData, user: null });
            })
            .catch(() => dispatch({ type: setUserData, user: null }));
}