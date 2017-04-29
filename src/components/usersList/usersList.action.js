const showSelectedUser = 'showSelectedUser';
const nextUserList = 'nextUserList';
const prevUserList = 'prevUserList';
const filterUserList = 'filterUserList';

export default (user) => {
    return {type: showSelectedUser, payload :user}
}

export function nextUserListFunc() {
    return {type: nextUserList}
}

export function prevUserListFunc() {
    return {type: prevUserList}
}

export function filterUserListFunc(expr) {
    return {type: filterUserList, payload: expr}
}