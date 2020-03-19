export const updateUserList = 'updateUserList';
export const updateUsersPanelStatusMessage = 'updateUsersPanelStatusMessage';
export const removeUser = 'removeUser';
import axios from 'axios';

export function getUserListAction() {
    return (dispatch) => {
        dispatch({ type: updateUsersPanelStatusMessage, msg: 'loading...' });

        return axios.get('/api/users')
            .then((res) => dispatch({ type: updateUserList, originalList: res.data }))
            .catch(() => dispatch({ type: updateUsersPanelStatusMessage, msg: 'loading failed' }));
    };
}

export function deleteUserByIdAction(id) {
    return (dispatch) => {
        console.log('Deleting user: ', id);
        return axios.delete('/api/users', { data: { id } })
            .then(() => {
                dispatch({ type: removeUser, userId: id });
            });
    };
}