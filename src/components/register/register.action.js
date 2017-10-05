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
            if(res.status === 201)
                dispatch({ type: creatingUserMsg, msg: 'User was created!' });
            else
                dispatch({ type: creatingUserMsg, msg: 'User creation failed' });
                
            })
        .catch((err) => { 
            console.log(err); 
            dispatch({ type: creatingUserMsg, msg: 'User creation failed' });
        });
    }
    };
}