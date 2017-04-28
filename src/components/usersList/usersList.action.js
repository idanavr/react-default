const showSelectedUser = 'showSelectedUser';

export default (user) => {
    return {type: showSelectedUser, payload :user}
}