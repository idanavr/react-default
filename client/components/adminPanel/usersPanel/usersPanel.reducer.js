import { updateUserList, updateUsersPanelStatusMessage, removeUser } from './usersPanel.action';
let originalUserList = [];
const defaultState = { displayList: [], statusMessage: null };

export default function usersPanel(state = defaultState, action) {
    switch (action.type) {
        case updateUserList:
            console.log('display list is:', action.originalList);
            originalUserList = action.originalList;
            return { ...state, statusMessage: null, displayList: originalUserList };

        case updateUsersPanelStatusMessage:
            return { ...state, statusMessage: action.msg };

        case removeUser:
            console.log('removing user: ', originalUserList);
            for (let i = 0; i < originalUserList.length; i++) {
                if (originalUserList[i].id === action.userId) {
                    originalUserList.splice(i, 1);
                    break;
                }
            }
            return { ...state, displayList: originalUserList };

        default:
            return state;
    }
}