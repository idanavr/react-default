import { updateUserMsg } from './userEditProfile.action';
const defaultState = { msg: '' };

export default function userEditProfile(state = defaultState, action) {
    switch (action.type) {
        case updateUserMsg:
            return { ...state, msg: action.msg };

        default:
            return state;
    }
}