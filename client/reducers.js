import { combineReducers } from 'redux';
import usersReducer from './components/usersPanel/usersPanel.reducer';
import registerReducer from './components/register/register.reducer';
import loginReducer from './components/login/login.reducer';
import userEditProfileReducer from './components/userPanel/userEditProfile/userEditProfile.reducer';

const allReducers = combineReducers({
usersReducer,
registerReducer,
loginReducer,
userEditProfileReducer,
});
export default allReducers;