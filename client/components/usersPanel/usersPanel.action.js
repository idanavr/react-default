export const showSelectedUser = 'showSelectedUser';
export const getUserList = 'getUserList';
export const loadingUserList = 'loadingUserList';
export const nextUserList = 'nextUserList';
export const prevUserList = 'prevUserList';
export const filterUserList = 'filterUserList';
export const removeUser = 'removeUser';
import axios from 'axios';

export function getUserListFunc() {
    return (dispatch) => {
        console.log('loading list..');
        dispatch({ type: loadingUserList, msg: 'loading...' });

        return axios.get('/api/users')
            .then((res) => dispatch({ type: getUserList, originalList: res.data }))
            .then(() => dispatch({ type: filterUserList, payload: '' }))
            .catch(() => dispatch({ type: loadingUserList, msg: 'loading failed' }));
    };
}

export function nextUserListFunc() {
    return { type: nextUserList };
}

export function prevUserListFunc() {
    return { type: prevUserList };
}

export function filterUserListFunc(expr) {
    return { type: filterUserList, payload: expr };
}

export function userClickAction(user) { 
    return { type: showSelectedUser, payload: user };
}

export function deleteUserByIdFunc(id) {

    return (dispatch) => {
        console.log('Deleting user: ', id);
        return axios.delete('/api/users', { data: { id } })
            .then(() => {
                dispatch({ type: showSelectedUser, payload: {} });
                dispatch({ type: removeUser, payload: id });
            });
    };
}