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
            console.log('selected :', action.payload.firstName);
            return { ...state, selectedUser: action.payload };

        case 'nextUserList':
            newPage = state.page + usersInPage;
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + usersInPage);
            if (newDisplayList.length !== 0)
                return { ...state, page: newPage, displayList: newDisplayList };
            alert('There are no more users'); 
            return state;

        case 'prevUserList':
            newPage = state.page - usersInPage;
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + usersInPage);
            if (newDisplayList.length !== 0)
                return { ...state, page: newPage, displayList: newDisplayList };
            alert('There are no more users');
            return state;

        case 'filterUserList':
            newPage = 0;
            filterExpr = action.payload.toLowerCase();
            newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + usersInPage);
            return { ...state, page: newPage, displayList: newDisplayList };

        case 'removeUser':
            console.log('removing user: ', originalUserList);
            for(let i = 0; i < originalUserList.length; i++) {
                if(originalUserList[i]._id === action.payload) {
                    originalUserList.splice(i,1);
                    break;
                }
             }
             if(newDisplayList.length - 1 === 0)
                newPage -= usersInPage;
             newDisplayList = fillterUsers(filterExpr).slice(newPage, newPage + usersInPage);
             
            return { ...state, page: newPage, displayList: newDisplayList };

        default:
            return state;
    }
}

function fillterUsers(expr) {
    return originalUserList.filter((user) => user.firstName.toLowerCase().includes(expr));
}