import PostmanConstants from '../constants/PostmanConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  result: [],
  error: null
});

function PostmanReducer(state = initialState, action) {
  switch (action.type) {
  case PostmanConstants.POSTMAN_GET_MYREQUESTS_SUCCESS:
    return Object.assign({}, state, {
      requests: action.response,
      error: null
    });
  case PostmanConstants.POSTMAN_GET_MYREQUESTS_ERROR:
    return Object.assign({}, state, {
      requests: [],
      error: action.error
    });

  case PostmanConstants.POSTMAN_CONFIRM_SUCCESS:
    return Object.assign({}, state, {
      request: action.response,
      error: null
    });
  case PostmanConstants.POSTMAN_CONFIRM_ERROR:
    return Object.assign({}, state, {
      request: [],
      error: action.error
    });    

  default:
    return state;
  }
}

export default PostmanReducer;
