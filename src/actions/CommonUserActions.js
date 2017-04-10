import CommonUserConstants from '../constants/CommonUserConstants';
import cookie from 'react-cookie';
import _ from 'lodash';

let AV = global.AV;
let CommonUserActions = {
  //Reset Password
  commonUserResetPasswordRequest: function() {
    return {
      type: CommonUserConstants.COMMON_USER_RESET_PASSWORD
    };
  },

  commonUserResetPasswordError: function(error) {
    return {
      error,
      type: CommonUserConstants.COMMON_USER_RESET_PASSWORD_ERROR
    };
  },

  commonUserResetPasswordSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.COMMON_USER_RESET_PASSWORD_SUCCESS
    };
  },

  resetPassword: function(data, cb){
    let _obj = this;
    return dispatch => {
      AV.User.requestPasswordReset(data)
      .then(response => {
        dispatch(_obj.commonUserResetPasswordSuccess(response));
        if(cb != null){
          cb();
        }
      })
      .catch(error => {
        dispatch(_obj.commonUserResetPasswordError(error));
        if(cb != null){
          cb();
        }
      });
    };
  },

  //Retrieve public user profile
  publicUserProfileRequest: function() {
    return {
      type: CommonUserConstants.GET_PUBLIC_USER_PROFILE
    };
  },

  publicUserProfileError: function(error) {
    return {
      error,
      type: CommonUserConstants.GET_PUBLIC_USER_PROFILE_ERROR
    };
  },

  publicUserProfileSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.GET_PUBLIC_USER_PROFILE_SUCCESS
    };
  },

  getPublicUserProfile: function(data, cb){
    let _obj = this;
    return dispatch => {
      AV.Cloud.run('getPublicUserProfile', data)
      .then(response => {
        const type = response.user.attributes.type;
        if(response.challenges.length > 0){
          let promises = [];
          let userIdsSet = new Set();
          _.forEach(response.challenges, challenge => {
            const userId = challenge.get((type == "candidate") ? "mentor" : "candidate");
            userIdsSet.add(userId);
          });
          const userIdsArray = [...userIdsSet];
          _.forEach(userIdsArray, id => {
            const req = {
              id: id
            };
            promises.push(AV.Cloud.run('getUserPublic', req));
          });
          AV.Promise.when(promises).then(users => {
            _.forEach(response.challenges, (challenge, index) => {
              response.challenges[index].set('type', type);
              //for Candidate
              if(type == "candidate") {
                const mentorId = challenge.get('mentor');
                const mentorUser = _.find(users, user => {
                  return user.id == mentorId;
                });
                if(mentorUser){
                  const mentorFullName = `${mentorUser.get('firstName')} ${mentorUser.get('lastName')}`;
                  const mentorUsername = mentorUser.get('username');
                  response.challenges[index].set('mentorFullName', mentorFullName);
                  response.challenges[index].set('mentorUsername', mentorUsername);
                }
              }

              //for Mentor
              if(type == "mentor") {
                const candidateId = challenge.get('candidate');
                const candidateUser = _.find(users, user => {
                  return user.id == candidateId;
                });
                if(candidateUser){
                  const candidateFullName = `${candidateUser.get('firstName')} ${candidateUser.get('lastName')}`;
                  const candidateUsername = candidateUser.get('username');
                  response.challenges[index].set('candidateFullName', candidateFullName);
                  response.challenges[index].set('candidateUsername', candidateUsername);
                }              
              }
            });
            dispatch(_obj.publicUserProfileSuccess(response));
            if(cb != null){
              cb();
            }
          });
        }else{
          dispatch(_obj.publicUserProfileSuccess(response));
          if(cb != null){
            cb();
          }
        }
      })
      .catch(error => {
        dispatch(_obj.publicUserProfileError(error));
        if(cb != null){
          cb();
        }
      });
    };
  },

  // Login
  userLoginRequest: function() {
    return {
      type: CommonUserConstants.USER_LOGIN
    };
  },

  userLoginError: function(error) {
    return {
      error,
      type: CommonUserConstants.USER_LOGIN_ERROR
    };
  },

  userLoginSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.USER_LOGIN_SUCCESS
    };
  },

  login: function(data, cb){
    let _obj = this;
    const session = cookie.load('session');
    if(session){
      return dispatch => {
        AV.User.become(session)
        .then(response => {
          dispatch(_obj.userLoginSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.userLoginError(error));
          if(cb != null){
            cb();
          }
        });
      };
    }else{
      const {username, password} = data;
      return dispatch => {
        AV.User.logIn(username,password)
        .then(response => {
          dispatch(_obj.userLoginSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.userLoginError(error));
          if(cb != null){
            cb();
          }
        });
      };
    }
  },

  // Update user
  userUpdateRequest: function() {
    return {
      type: CommonUserConstants.USER_UPDATE
    };
  },

  userUpdateError: function(error) {
    return {
      error,
      type: CommonUserConstants.USER_UPDATE_ERROR
    };
  },

  userUpdateSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.USER_UPDATE_SUCCESS
    };
  },

  userUpdate: function(data, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('updateUserProfile', data)
        .then(response => {
          dispatch(_obj.userUpdateSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.userUpdateError(error));
          if(cb != null){
            cb();
          }
        });
  },

  //Retrieve User
  getUserError: function(error) {
    return {
      error,
      type: CommonUserConstants.GET_USER_ERROR
    };
  },

  getUserSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.GET_USER_SUCCESS
    };
  },

  getUser: function(id, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('getUser', {id: id})
        .then(response => {
          dispatch(_obj.getUserSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.getUserError(error));
          if(cb != null){
            cb();
          }
        });
  },

  loadWarehousesError: function(error) {
    return {
      error,
      type: CommonUserConstants.LOAD_WAREHOUSES_ERROR
    };
  },

  loadWarehousesSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.LOAD_WAREHOUSES_SUCCESS
    };
  },

  loadWarehouses: function(cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('getWarehouses')
        .then(response => {
          dispatch(_obj.loadWarehousesSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.loadWarehousesError(error));
          if(cb != null){
            cb();
          }
        });
  },

  loadBooksError: function(error) {
    return {
      error,
      type: CommonUserConstants.LOAD_BOOKS_ERROR
    };
  },

  loadBooksSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.LOAD_BOOKS_SUCCESS
    };
  },

  loadBooks: function(data, cb){
    // data: belongToWarehouseId, ageGroup, customerRate, bookName, ISBN
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('getBooks', data)
        .then(response => {
          dispatch(_obj.loadBooksSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.loadBooksError(error));
          if(cb != null){
            cb();
          }
        });
  },

  getBookError: function(error) {
    return {
      error,
      type: CommonUserConstants.GET_BOOK_ERROR
    };
  },

  getBookSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.GET_BOOK_SUCCESS
    };
  },

  getBook: function(id, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('getBook', {id: id})
        .then(response => {
          dispatch(_obj.getBookSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.getBookError(error));
          if(cb != null){
            cb();
          }
        });
  },

  getBookReviewsError: function(error) {
    return {
      error,
      type: CommonUserConstants.GET_BOOK_REVIEWS_ERROR
    };
  },

  getBookReviewsSuccess: function(response) {
    return {
      response,
      type: CommonUserConstants.GET_BOOK_REVIEWS_SUCCESS
    };
  },

  getBookReviews: function(skip, bookId, cb){
    let _obj = this;

    return dispatch =>
      AV.Cloud.run('getBookReviews', {skip: skip, bookId: bookId})
        .then(response => {
          dispatch(_obj.getBookReviewsSuccess(response));
          if(cb != null){
            cb();
          }
        })
        .catch(error => {
          dispatch(_obj.getBookReviewsError(error));
          if(cb != null){
            cb();
          }
        });
  }
};

export default CommonUserActions;
