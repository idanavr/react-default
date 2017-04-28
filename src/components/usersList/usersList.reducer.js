export default function(state = null, action)  {
    switch(action.type){
        case 'showSelectedUser':
            console.log('selected :', action.payload.first_name);
            return action.payload;

        default:
            return state;
    }
}