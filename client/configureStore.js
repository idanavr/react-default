import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import { minMillisecondToSaveState } from 'config';

const middlewares = [ReduxThunk];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
    console.log(process.env);
}
const middleware = applyMiddleware(...middlewares);

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(
        rootReducer,
        persistedState,
        middleware
    );
    console.log(persistedState);

    store.subscribe(throttle(() => {
        saveState(formatStateToStorage(store.getState()));
    }, minMillisecondToSaveState));

    return store;
};

const formatStateToStorage = (state) => ({
    loginReducer: {
        user: state.loginReducer.user
    }
});

export default configureStore;