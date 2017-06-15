/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

const initialState = {
  type: undefined,
};

/**
* Based on action, lets user choose their user type of visitor or employee
*/
const User = (state = initialState, action) => {
  switch (action.type) {
    case 'CHOOSE_USER_TYPE':
      return {
        ...state,
        type: action.userType,
      };



    default:
      return state;
  }
}

export default User
 