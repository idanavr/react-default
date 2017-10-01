const creatingUserMsg = 'creatingUserMsg';

export function createUserFunc(data) {
    return (dispatch) => {

        if(data.errors)
            dispatch({ type: creatingUserMsg, msg: data.errors });
        else {

        dispatch({ type: creatingUserMsg, msg: 'Creating user..' });
        
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if(res.status === 400)
                dispatch({ type: creatingUserMsg, msg: 'User creation failed' });
            else
                dispatch({ type: creatingUserMsg, msg: 'User was created!' });
            })
        // .then((res) => { 
        //     console.log(res);
        //     dispatch({ type: creatingUserMsg, msg: 'User was created!' });
        // })
        .catch((err) => { 
            console.log(err); 
            dispatch({ type: creatingUserMsg, msg: 'User creation failed, error: ', err });
        });
    }
    };
}