import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import CommonUserReducer from './CommonUserReducer';
import AdminUserReducer from './AdminUserReducer';
import MemberUserReducer from './MemberUserReducer';
import PostmanReducer from './PostmanReducer';

const rootReducer = combineReducers({
  CommonUserReducer,
  AdminUserReducer,
  MemberUserReducer,
  PostmanReducer,
  routing
});

export default rootReducer;
