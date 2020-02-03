export const updateUserMsg = 'updateUserMsg';
import axios from 'axios';

export function updateUserFunc(data) {
    return (dispatch) => {

        if (data.error)
            dispatch({ type: updateUserMsg, msg: data.error });
        else {
            dispatch({ type: updateUserMsg, msg: 'updating user..' });
            axios.put(`/api/users/${data.id}`, data)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({ type: updateUserMsg, msg: 'User has been updated' });
                    } else
                        dispatch({ type: updateUserMsg, msg: res.data });
                })
                .catch((err) => {
                    const errMsg = err.response.data;
                    console.log(errMsg);
                    if (errMsg && typeof(errMsg) === 'string')
                        dispatch({ type: updateUserMsg, msg: errMsg });
                    else
                        dispatch({ type: updateUserMsg, msg: 'Update user failed' });
                });
        }
    };
}