import { combineReducers } from 'redux';
import usersReducer from './components/usersList/usersList.reducer';
import registerReducer from './components/register/register.reducer';

const allReducers = combineReducers({
usersReducer,
registerReducer
});
export default allReducers;