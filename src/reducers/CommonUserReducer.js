import CommonUserConstants from '../constants/CommonUserConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  resetPasswordEmailStatus: undefined,
  userDetails: {},
  updatedUser: {},
  error: null
});

/**
 * Return the Common User object based on the API data.
 *
 * @param {state} state The initialState of the object
 * @param {action} action The action the user wishes to perform
 * @return {state} {*} Returns the original state or the featured articles object
 * @constructor
 */
function CommonUserReducer(state = initialState, action) {
  switch (action.type) {
  case CommonUserConstants.COMMON_USER_RESET_PASSWORD:
    return Object.assign({}, state, {
      resetPasswordEmailStatus: undefined,
      error: null
    });
  case CommonUserConstants.COMMON_USER_RESET_PASSWORD_SUCCESS:
    return Object.assign({}, state, {
      resetPasswordEmailStatus: true,
      error: null
    });
  case CommonUserConstants.COMMON_USER_RESET_PASSWORD_ERROR:
    return Object.assign({}, state, {
      resetPasswordEmailStatus: false,
      error: action.error
    });
  case CommonUserConstants.GET_PUBLIC_USER_PROFILE:
  case CommonUserConstants.USER_LOGIN:
  case CommonUserConstants.USER_UPDATE:
    return Object.assign({}, state, {
      userDetails: {},
      error: null
    });
  case CommonUserConstants.GET_PUBLIC_USER_PROFILE_SUCCESS:
  case CommonUserConstants.USER_LOGIN_SUCCESS:
  case CommonUserConstants.GET_USER_SUCCESS:
    return Object.assign({}, state, {
      userDetails: action.response,
      error: null
    });
  case CommonUserConstants.GET_PUBLIC_USER_PROFILE_ERROR:
  case CommonUserConstants.USER_LOGIN_ERROR:
  case CommonUserConstants.USER_UPDATE_ERROR:
  case CommonUserConstants.GET_USER_ERROR:
    return Object.assign({}, state, {
      userDetails: {},
      updatedUser: {},
      error: action.error
    });
  case CommonUserConstants.USER_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      updatedUser: action.response,
      error: null
    }); 

  //Load All Warehouses
  case CommonUserConstants.LOAD_WAREHOUSES:
    return Object.assign({}, state, {
      warehouses: {},
      error: null
    });  
  case CommonUserConstants.LOAD_WAREHOUSES_SUCCESS:  
    return Object.assign({}, state, {
      warehouses: action.response,
      error: null
    });
  case CommonUserConstants.LOAD_WAREHOUSES_ERROR:
    return Object.assign({}, state, {
      warehouses: {},
      error: action.error
    }); 

  case CommonUserConstants.LOAD_BOOKS:
    return Object.assign({}, state, {
      books: [],
      error: null
    });
  case CommonUserConstants.LOAD_BOOKS_SUCCESS:
    return Object.assign({}, state, {
      books: action.response,
      error: null
    });
  case CommonUserConstants.LOAD_BOOKS_ERROR:
    return Object.assign({}, state, {
      books: [],
      error: action.error
    });

  case CommonUserConstants.GET_BOOK_SUCCESS:  
    return Object.assign({}, state, {
      book: action.response,
      error: null
    });
  case CommonUserConstants.GET_BOOK_ERROR:
    return Object.assign({}, state, {
      book: {},
      error: action.error
    }); 

  case CommonUserConstants.GET_BOOK_REVIEWS_SUCCESS:  
    return Object.assign({}, state, {
      bookReviews: action.response,
      error: null
    });
  case CommonUserConstants.GET_BOOK_REVIEWS_ERROR:
    return Object.assign({}, state, {
      bookReviews: {},
      error: action.error
    }); 

  case CommonUserConstants.GET_NEW_MEMBER_APPLICATION_SUCCESS:  
    return Object.assign({}, state, {
      user: action.response,
      error: null
    });
  case CommonUserConstants.GET_NEW_MEMBER_APPLICATION_ERROR:
    return Object.assign({}, state, {
      user: {},
      error: action.error
    });                

  case CommonUserConstants.GET_BOOKBOX_SUCCESS:  
    return Object.assign({}, state, {
      bookbox: action.response,
      error: null
    });
  case CommonUserConstants.GET_BOOKBOX_ERROR:
    return Object.assign({}, state, {
      bookbox: {},
      error: action.error
    });

  default:
    return state;
  }
}

export default CommonUserReducer;
