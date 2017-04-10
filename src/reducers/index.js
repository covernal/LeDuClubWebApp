import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import CommonUserReducer from './CommonUserReducer';
import AdminUserReducer from './AdminUserReducer';
import MemberUserReducer from './MemberUserReducer';

const rootReducer = combineReducers({
  CommonUserReducer,
  AdminUserReducer,
  MemberUserReducer,
  routing
});

export default rootReducer;
