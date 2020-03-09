export const creatingUserMsg = 'creatingUserMsg';
import axios from 'axios';

export function createUserAction(data) {
    return (dispatch) => {
        if (data.error)
            return new Promise((resolve) => resolve(dispatch({ type: creatingUserMsg, msg: data.error })));
        return axios.post('/api/users', data)
            .then((res) => {
                if (res.status === 201)
                    return dispatch({ type: creatingUserMsg, msg: '' });
                return dispatch({ type: creatingUserMsg, msg: res.data });
            })
            .catch((err) => {
                const errMsg = err.response.data;
                if (errMsg && typeof (errMsg) === 'string')
                    return dispatch({ type: creatingUserMsg, msg: errMsg });
                return dispatch({ type: creatingUserMsg, msg: 'User creation failed' });
            });
    };
}