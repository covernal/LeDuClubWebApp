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


  default:
    return state;
  }
}

export default MemberUserReducer;
