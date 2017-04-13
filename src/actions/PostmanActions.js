import PostmanConstants from '../constants/PostmanConstants';
import ServerConfig from '../../cfg/NodeJS';

let AV = global.AV;
let PostmanActions = {
  postmanGetMyRequestsError: function(error) {
    return {
      error,
      type: PostmanConstants.POSTMAN_GET_MYREQUESTS_ERROR
    };
  },

  postmanGetMyRequestsSuccess: function(response) {
    return {
      response,
      type: PostmanConstants.POSTMAN_GET_MYREQUESTS_SUCCESS
    };
  },

  postmanGetMyRequests: function(skip, requestType, cb){
    let _obj = this;
    return dispatch =>
      AV.Cloud.run('postmanGetMyRequests', {skip: skip, requestType: requestType})
        .then(response => {
          dispatch(_obj.postmanGetMyRequestsSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.postmanGetMyRequestsError(error));
          if(cb != null){
            cb();
          }
        });        
  },

  postmanConfirmBookRequestCompletedError: function(error) {
    return {
      error,
      type: PostmanConstants.POSTMAN_CONFIRM_ERROR
    };
  },

  postmanConfirmBookRequestCompletedSuccess: function(response) {
    return {
      response,
      type: PostmanConstants.POSTMAN_CONFIRM_SUCCESS
    };
  },

  postmanConfirmBookRequestCompleted: function(requestId, cb){
    let _obj = this;
    return dispatch =>
      AV.Cloud.run('postmanConfirmBookRequestCompleted', {requestId: requestId})
        .then(response => {
          dispatch(_obj.postmanConfirmBookRequestCompletedSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.postmanConfirmBookRequestCompletedError(error));
          if(cb != null){
            cb();
          }
        });        
  } 
};

export default PostmanActions;
