/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

const initialState = {
  isFillingInformation: false,
};

/**
* Based on action, will determine whether a user is filling out information on 
* the check in page
*/
const Visitor = (state = initialState, action) => {
  switch (action.type) {
    case 'BACK_TO_CHECK_IN':
      return {
        ...state,
        isFillingOutInformation: false,
      };

    case 'CLICK_CHECK_IN':
      return {
        ...state,
        isFillingOutInformation: true,
      };
    case 'LEAVE_CHECK_IN': return initialState;
    default:
      return state;
  }
}

export default Visitor
 