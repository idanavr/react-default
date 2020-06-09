import { creatingUserMsg } from './register.action';
const defaultState = { msg: '' };

export default function register(state = defaultState, action) {
    switch (action.type) {
        case creatingUserMsg:
            return { ...state, msg: action.msg };

        default:
            return state;
    }
}