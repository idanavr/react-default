import { updateUserMsg } from './userEditProfile.action';
const defaultState = { msg: '' };

export default function (state = defaultState, action) {
    switch (action.type) {
        case updateUserMsg:
            return { ...state, msg: action.msg };

        default:
            return state;
    }
}