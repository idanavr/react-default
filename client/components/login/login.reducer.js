/* eslint no-undefined: 0 */
import { updateLoginStatusMessage, setUserData } from './login.action';
const defaultState = { msg: '', user: undefined };

export default function login(state = defaultState, action) {
    switch (action.type) {
        case updateLoginStatusMessage:
            return { ...state, msg: action.msg };

        case setUserData:
            return { ...state, msg: '', user: action.user };

        default:
            return state;
    }
}