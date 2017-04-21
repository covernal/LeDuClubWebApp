import MemberUserConstants from '../constants/MemberUserConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  result: [],
  error: null
});

/**
 * Return the Member User object based on the API data.
 *
 * @param {state} state The initialState of the object
 * @param {action} action The action the user wishes to perform
 * @return {state} {*} Returns the original state or the featured articles object
 * @constructor
 */
function MemberUserReducer(state = initialState, action) {
  switch (action.type) {
  case MemberUserConstants.MEMBER_BORROW_REQUEST_SUCCESS:
  case MemberUserConstants.MEMBER_RETURN_REQUEST_SUCCESS:
  case MemberUserConstants.MEMBER_ADD_COMMENT_SUCCESS:
    return Object.assign({}, state, {
      result: action.response,
      error: null
    });
  case MemberUserConstants.MEMBER_BORROW_REQUEST_ERROR:
  case MemberUserConstants.MEMBER_RETURN_REQUEST_ERROR:
  case MemberUserConstants.MEMBER_ADD_COMMENT_ERROR:
    return Object.assign({}, state, {
      result: [],
      error: action.error
    });

  case MemberUserConstants.MEMBER_GET_MYBOOK_REQUESTS_SUCCESS:
    return Object.assign({}, state, {
      requests: action.response,
      error: null
    });    
  case MemberUserConstants.MEMBER_GET_MYBOOK_REQUESTS_ERROR:
    return Object.assign({}, state, {
      requests: [],
      error: action.error
    });

  case MemberUserConstants.MEMBER_GET_MYBORROWED_BOOKS_SUCCESS:
  case MemberUserConstants.MEMBER_GET_THISWEEK_BOOKBOX_SUCCESS:
    return Object.assign({}, state, {
      bookboxes: action.response,
      error: null
    });    
  case MemberUserConstants.MEMBER_GET_MYBORROWED_BOOKS_ERROR:
  case MemberUserConstants.MEMBER_GET_THISWEEK_BOOKBOX_ERROR:
    return Object.assign({}, state, {
      bookboxes: [],
      error: action.error
    });    

  default:
    return state;
  }
}

export default MemberUserReducer;
