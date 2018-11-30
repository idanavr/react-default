/* eslint no-undefined: 0 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null)
            return undefined;
        const loadedState = JSON.parse(serializedState);
        return loadedState;
    } catch(err) {
        return undefined;
    }
};

export const saveState = (state) => {
    console.log('saving state');
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(err) {
        // log error
    }
};