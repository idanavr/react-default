import { updateLoginStatusMessage, setLoginCredentials } from './login.action';
const defaultState = { msg: '', user: null, auth: null };

export default function (state = defaultState, action) {
    switch (action.type) {
        case updateLoginStatusMessage:
            return { ...state, msg: action.msg };

        case setLoginCredentials:
            console.log(action.token);
            return { ...state, msg: '', user: action.user, auth: action.token };

        default:
            return state;
    }
}