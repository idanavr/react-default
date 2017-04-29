import UsersList from './../../../data.json';
let firstList = UsersList.slice(0, 5);
let defaultState = { selectedUser: {}, page: 0, displayList: firstList };
let newPage;
let newDisplayList;
let filterExpr = '';

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'showSelectedUser':
            console.log('selected :', action.payload.first_name);
            return { ...state, selectedUser: action.payload };

        case 'nextUserList':
            newPage = state.page + 5;
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + 5);
            if (newDisplayList.length != 0)
                return { ...state, page: newPage, displayList: newDisplayList };
            alert('There are no more users'); //else
            return state;

        case 'prevUserList':
            console.log(newPage);
            newPage = state.page - 5;
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + 5);
            if (newDisplayList.length != 0)
                return { ...state, page: newPage, displayList: newDisplayList };
            alert('There are no more users'); //else
            return state;

        case 'filterUserList':
            console.log(action.payload);
            newPage = 0;
            filterExpr = action.payload.toLowerCase();
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + 5)
            return { ...state, page: newPage, displayList: newDisplayList }


        default:
            return state;
    }
}

function fillterUsers(expr) {
    return UsersList.filter(user => {
        if (user.first_name.toLowerCase().includes(expr))
            return user
    })
}