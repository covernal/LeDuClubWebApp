import AdminUserConstants from '../constants/AdminUserConstants';
import ServerConfig from '../../cfg/NodeJS';

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
  },

  adminLoadPostmenError: function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_LOAD_POSTMEN_ERROR
    };
  },

  adminLoadPostmenSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_LOAD_POSTMEN_SUCCESS
    };
  },

  adminLoadPostmen: function(cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminGetPostmen')
        .then(response => {
          dispatch(_obj.adminLoadPostmenSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminLoadPostmenError(error));
          if(cb != null){
            cb();
          }
        });
  },

  adminAllocateRequestToPostmanError:  function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_ALLOCATE_REQUEST_TO_POSTMAN_ERROR
    };
  },

  adminAllocateRequestToPostmanSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_ALLOCATE_REQUEST_TO_POSTMAN_SUCCESS
    };
  },

  adminAllocateRequestToPostman: function(requestId, postmanId, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminAllocateRequestToPostman', {requestId: requestId, postmanId: postmanId})
        .then(response => {
          dispatch(_obj.adminAllocateRequestToPostmanSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminAllocateRequestToPostmanError(error));
          if(cb != null){
            cb();
          }
        });
  },

  adminApproveMemberApplicationError:  function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_APPROVE_MEMBER_APPLICATION_ERROR
    };
  },

  adminApproveMemberApplicationSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_APPROVE_MEMBER_APPLICATION_SUCCESS
    };
  },

  adminApproveMemberApplication: function(memberId, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminApproveMemberApplication', {memberId: memberId})
        .then(response => {
          dispatch(_obj.adminApproveMemberApplicationSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminApproveMemberApplicationError(error));
          if(cb != null){
            cb();
          }
        });
  },

  adminConfirmMemberDepositError:  function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_CONFIRM_MEMBER_DEPOSIT_ERROR
    };
  },

  adminConfirmMemberDepositSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_CONFIRM_MEMBER_DEPOSIT_SUCCESS
    };
  },

  adminConfirmMemberDeposit: function(memberId, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminConfirmMemberDeposit', {memberId: memberId})
        .then(response => {
          dispatch(_obj.adminConfirmMemberDepositSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminConfirmMemberDepositError(error));
          if(cb != null){
            cb();
          }
        });
  },

  adminConfirmMemberMonthlyFeeError:  function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_CONFIRM_MEMBER_MONTHLY_FEE_ERROR
    };
  },

  adminConfirmMemberMonthlyFeeSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_CONFIRM_MEMBER_MONTHLY_FEE_SUCCESS
    };
  },

  adminConfirmMemberMonthlyFee: function(memberId, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminConfirmMemberMonthlyFee', {memberId: memberId})
        .then(response => {
          dispatch(_obj.adminConfirmMemberMonthlyFeeSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminConfirmMemberMonthlyFeeError(error));
          if(cb != null){
            cb();
          }
        });
  },

  adminConfirmMemberStartTrialError:  function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_CONFIRM_MEMBER_START_TRIAL_ERROR
    };
  },

  adminConfirmMemberStartTrialSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_CONFIRM_MEMBER_START_TRIAL_SUCCESS
    };
  },

  adminConfirmMemberStartTrial: function(memberId, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminConfirmMemberStartTrial', {memberId: memberId})
        .then(response => {
          dispatch(_obj.adminConfirmMemberStartTrialSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminConfirmMemberStartTrialError(error));
          if(cb != null){
            cb();
          }
        });
  },  

  adminUpdateMemberProfileError:  function(error) {
    return {
      error,
      type: AdminUserConstants.ADMIN_UPDATE_MEMBER_PROFILE_ERROR
    };
  },

  adminUpdateMemberProfileSuccess: function(response) {
    return {
      response,
      type: AdminUserConstants.ADMIN_UPDATE_MEMBER_PROFILE_SUCCESS
    };
  },

  adminUpdateMemberProfile: function(data, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('adminUpdateMemberProfile', data)
        .then(response => {
          dispatch(_obj.adminUpdateMemberProfileSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.adminUpdateMemberProfileError(error));
          if(cb != null){
            cb();
          }
        });
  }  
};

export default AdminUserActions;
