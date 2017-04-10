import AdminUserConstants from '../constants/AdminUserConstants';
import ServerConfig from '../../cfg/NodeJS';
import Parse from 'parse';

let AV = global.AV;
let AdminUserActions = {
  adminLoadBooksRequest: function() {
    return {
      type: AdminUserConstants.ADMIN_LOAD_BOOKS
    };
  },

  adminLoadBooksError: function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_LOAD_BOOKS_ERROR
    };
  },

  adminLoadBooksSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_LOAD_BOOKS_SUCCESS
    };
  },

  adminLoadBooks: function(data, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('getBooks', {skip: data})
        .then(response => {
          dispatch(_obj.adminLoadBooksSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminLoadBooksError(error));
          if(cb != null){
            cb();
          }
        });
  },

  adminLoadMembersRequest: function() {
    return {
      type: AdminUserConstants.ADMIN_LOAD_MEMBERS
    };
  },

  adminLoadMembersError: function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_LOAD_MEMBERS_ERROR
    };
  },

  adminLoadMembersSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_LOAD_MEMBERS_SUCCESS
    };
  },

  adminLoadMembers: function(data, cb){
    //data will be {skip, belongToWarehouseId, membershipStatus}
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminGetMembers', data)
        .then(response => {
          dispatch(_obj.adminLoadMembersSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminLoadMembersError(error));
          if(cb != null){
            cb();
          }
        });
  }, 

  adminLoadRequestsError: function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_LOAD_REQUESTS_ERROR
    };
  },

  adminLoadRequestsSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_LOAD_REQUESTS_SUCCESS
    };
  },

  adminLoadRequests: function(data, cb){
    //data will be {skip, belongToWarehouseId}
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminGetBookRequests', data)
        .then(response => {
          dispatch(_obj.adminLoadRequestsSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminLoadRequestsError(error));
          if(cb != null){
            cb();
          }
        });
  },

  adminCreateBookError: function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_CREATE_BOOK_ERROR
    };
  },

  adminCreateBookSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_CREATE_BOOK_SUCCESS
    };
  },

  adminCreateBook: function(data, cb){
    let _obj = this;
    return dispatch =>
      AV.Cloud.run('adminCreateBook', data)
        .then(response => {
          dispatch(_obj.adminCreateBookSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminCreateBookError(error));
          if(cb != null){
            cb();
          }
        });        
  },

  adminUpdateBookError: function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_UPDATE_BOOK_ERROR
    };
  },

  adminUpdateBookSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_UPDATE_BOOK_SUCCESS
    };
  },

  adminUpdateBook: function(data, cb){
    let _obj = this;
    return dispatch =>
      AV.Cloud.run('adminUpdateBook', data)
        .then(response => {
          dispatch(_obj.adminUpdateBookSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminUpdateBookError(error));
          if(cb != null){
            cb();
          }
        });        
  }     
};

export default AdminUserActions;
