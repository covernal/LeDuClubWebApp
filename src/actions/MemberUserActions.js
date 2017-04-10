import MemberUserConstants from '../constants/MemberUserConstants';
import ServerConfig from '../../cfg/NodeJS';
import Parse from 'parse';

let AV = global.AV;
let MemberUserActions = {
  memberNewBookBorrowRequestError: function(error) {
    return {
      error,
      type: MemberUserConstants.MEMBER_BORROW_REQUEST_ERROR
    };
  },

  memberNewBookBorrowRequestSuccess: function(response) {
    return {
      response,
      type: MemberUserConstants.MEMBER_BORROW_REQUEST_SUCCESS
    };
  },

  memberNewBookBorrowRequest: function(bookId, cb){
    let _obj = this;
    return dispatch =>
      AV.Cloud.run('memberNewBookBorrowRequest', {bookId: bookId})
        .then(response => {
          dispatch(_obj.memberNewBookBorrowRequestSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.memberNewBookBorrowRequestError(error));
          if(cb != null){
            cb();
          }
        });        
  },

  memberNewBookReturnRequestError: function(error) {
    return {
      error,
      type: MemberUserConstants.MEMBER_RETURN_REQUEST_ERROR
    };
  },

  memberNewBookReturnRequestSuccess: function(response) {
    return {
      response,
      type: MemberUserConstants.MEMBER_RETURN_REQUEST_SUCCESS
    };
  },

  memberNewBookReturnRequest: function(bookId, cb){
    let _obj = this;
    return dispatch =>
      AV.Cloud.run('memberNewBookReturnRequest', {bookId: bookId})
        .then(response => {
          dispatch(_obj.memberNewBookReturnRequestSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.memberNewBookReturnRequestError(error));
          if(cb != null){
            cb();
          }
        });        
  }, 

  memberAddCommentError: function(error) {
    return {
      error,
      type: MemberUserConstants.MEMBER_ADD_COMMENT_ERROR
    };
  },

  memberAddCommentSuccess: function(response) {
    return {
      response,
      type: MemberUserConstants.MEMBER_ADD_COMMENT_SUCCESS
    };
  },

  memberAddComment: function(data, cb){
	// data: bookId, rate, comment
    let _obj = this;
    return dispatch =>
      AV.Cloud.run('memberAddComment', data)
        .then(response => {
          dispatch(_obj.memberAddCommentSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.memberAddCommentError(error));
          if(cb != null){
            cb();
          }
        });        
  }   
};

export default MemberUserActions;
