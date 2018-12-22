export const creatingUserMsg = 'creatingUserMsg';
import axios from 'axios';
// import { LoginFunc } from '../login/login.action';

export function createUserFunc(data) {
    return (dispatch) => {

        if (data.error)
            dispatch({ type: creatingUserMsg, msg: data.error });
        else {
            dispatch({ type: creatingUserMsg, msg: 'Creating user..' });

            axios.post('/api/users', data)
                .then((res) => {
                    if (res.status === 201) {
                        dispatch({ type: creatingUserMsg, msg: '' });
                    } else
                        dispatch({ type: creatingUserMsg, msg: res.data });

                })
                .catch((err) => {
                    console.log(err);
                    dispatch({ type: creatingUserMsg, msg: 'User creation failed' });
                });
        }
    };
}