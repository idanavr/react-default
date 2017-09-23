const showSelectedUser = 'showSelectedUser';
const getUserList = 'getUserList';
const loadingUserList = 'loadingUserList';
const nextUserList = 'nextUserList';
const prevUserList = 'prevUserList';
const filterUserList = 'filterUserList';

export default (user) => ({ type: showSelectedUser, payload :user });


export function getUsersListFunc() {
    console.log('loading list started');
    return (dispatch) => {
        console.log('loading list');
        dispatch({ type: loadingUserList, msg: 'loading...' });

        return fetch('/api/users')
            .then((res) => res.json())
            .then((res) => dispatch({ type: getUserList, originalList: res }))
            .then(() => dispatch({ type: filterUserList, payload: '' }))
            .catch((err) => dispatch({ type: loadingUserList, msg: err }));
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