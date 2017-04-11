import AdminUserConstants from '../constants/AdminUserConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  result: [],
  error: null
});

/**
 * Return the Admin User object based on the API data.
 *
 * @param {state} state The initialState of the object
 * @param {action} action The action the user wishes to perform
 * @return {state} {*} Returns the original state or the featured articles object
 * @constructor
 */
function AdminUserReducer(state = initialState, action) {
  switch (action.type) {
  case AdminUserConstants.ADMIN_LOAD_BOOKS:
  case AdminUserConstants.ADMIN_CREATE_BOOK:
  case AdminUserConstants.ADMIN_UPDATE_BOOK:
    return Object.assign({}, state, {
      books: [],
      error: null
    });
  case AdminUserConstants.ADMIN_LOAD_BOOKS_SUCCESS:
  case AdminUserConstants.ADMIN_CREATE_BOOK_SUCCESS:
  case AdminUserConstants.ADMIN_UPDATE_BOOK_SUCCESS:
    return Object.assign({}, state, {
      books: action.response,
      error: null
    });
  case AdminUserConstants.ADMIN_LOAD_BOOKS_ERROR:
  case AdminUserConstants.ADMIN_CREATE_BOOK_ERROR:
  case AdminUserConstants.ADMIN_UPDATE_BOOK_ERROR:
    return Object.assign({}, state, {
      books: [],
      error: action.error
    });

  case AdminUserConstants.ADMIN_LOAD_MEMBERS:
    return Object.assign({}, state, {
      members: [],
      error: null
    });
  case AdminUserConstants.ADMIN_LOAD_MEMBERS_SUCCESS:
    return Object.assign({}, state, {
      members: action.response,
      error: null
    });
  case AdminUserConstants.ADMIN_LOAD_MEMBERS_ERROR:
    return Object.assign({}, state, {
      members: [],
      error: action.error
    });

  case AdminUserConstants.ADMIN_LOAD_REQUESTS_SUCCESS:
    return Object.assign({}, state, {
      requests: action.response,
      error: null
    });
  case AdminUserConstants.ADMIN_LOAD_REQUESTS_ERROR:
    return Object.assign({}, state, {
      requests: [],
      error: action.error
    });    

  case AdminUserConstants.ADMIN_LOAD_POSTMEN_SUCCESS:
    return Object.assign({}, state, {
      postmen: action.response,
      error: null
    });
  case AdminUserConstants.ADMIN_LOAD_POSTMEN_ERROR:
    return Object.assign({}, state, {
      postmen: [],
      error: action.error
    }); 

  case AdminUserConstants.ADMIN_ALLOCATE_REQUEST_TO_POSTMAN_SUCCESS:
    return Object.assign({}, state, {
      request: action.response,
      error: null
    });
  case AdminUserConstants.ADMIN_ALLOCATE_REQUEST_TO_POSTMAN_ERROR:
    return Object.assign({}, state, {
      request: [],
      error: action.error
    });     

  default:
    return state;
  }
}

export default AdminUserReducer;
