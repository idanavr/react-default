import { combineReducers } from 'redux';
// import Users from './../data.json';
import usersReducer from './components/usersList/usersList.reducer';

// const getUsers = () => Users;

const allReducers = combineReducers({
// getUsers,
usersReducer
});
export default allReducers;