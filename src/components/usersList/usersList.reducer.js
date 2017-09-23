let originalUserList = [];
const usersInPage = 5;
let newDisplayList = originalUserList.slice(0, usersInPage);
const defaultState = { selectedUser: {}, page: 0, displayList: [], msg: null };
let newPage = 0;
let filterExpr = '';

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'getUserList':
            console.log('display list is:', action.originalList);
            originalUserList = action.originalList;
            return { ...state, msg: null };

        case 'loadingUserList':
            return { ...state, msg: action.msg };

        case 'showSelectedUser':
            console.log('selected :', action.payload.first_name);
            return { ...state, selectedUser: action.payload };

        case 'nextUserList':
            newPage = state.page + usersInPage;
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + usersInPage);
            if (newDisplayList.length !== 0)
                return { ...state, page: newPage, displayList: newDisplayList };
            alert('There are no more users'); 
            return state;

        case 'prevUserList':
            console.log(newPage);
            newPage = state.page - usersInPage;
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + usersInPage);
            if (newDisplayList.length !== 0)
                return { ...state, page: newPage, displayList: newDisplayList };
            alert('There are no more users');
            return state;

        case 'filterUserList':
            console.log(action.payload);
            newPage = 0;
            filterExpr = action.payload.toLowerCase();
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + usersInPage);
            return { ...state, page: newPage, displayList: newDisplayList };


        default:
            return state;
    }
}

function fillterUsers(expr) {
    return originalUserList.filter((user) => user.first_name.toLowerCase().includes(expr));
}