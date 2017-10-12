import { loginStatus, loginSuccess } from './login.action';
const defaultState = { msg : '', user: null, auth: null };

export default function (state = defaultState, action) {
    switch (action.type) {
        case loginStatus:
            return { ...state, msg: action.payload };

        case loginSuccess:
            console.log(action.token);
            return { ...state, msg: '', user: action.user, auth: action.token };

        default:
            return state;
    }
}