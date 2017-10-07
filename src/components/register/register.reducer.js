const defaultState = { msg: '' };

export default function (state = defaultState, action){
    switch(action.type){
    case 'creatingUserMsg':
        return { ...state, msg: action.msg };
    default:
        return state;
    }
}