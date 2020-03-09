export const updateUserMsg = 'updateUserMsg';
import axios from 'axios';

export function updateUserAction(data) {
    return (dispatch) => {
        if (data.error)
            return new Promise((resolve) => resolve(dispatch({ type: updateUserMsg, msg: data.error })));
        return axios.put(`/api/users/${data.id}`, data)
            .then((res) => {
                if (res.status === 200)
                    return dispatch({ type: updateUserMsg, msg: 'User has been updated' });
                return dispatch({ type: updateUserMsg, msg: res.data });
            })
            .catch((err) => {
                const errMsg = err.response.data;
                if (errMsg && typeof (errMsg) === 'string')
                    return dispatch({ type: updateUserMsg, msg: errMsg });
                return dispatch({ type: updateUserMsg, msg: 'Update user failed' });
            });
    };
}