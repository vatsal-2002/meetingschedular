// import { SET_MEETINGS, SET_CURRENT_MEETING } from '../actions/meetingActions'; // Import action types
// import { REMOVE_MEETING } from '../actions/meetingActions';

// // Define initial state
// const initialState = {
//     meetings: [], // Ensure meetings is initialized as an array
//     currentMeeting: null, // Initialize currentMeeting as null
// };

// // Define reducer function
// const meetingReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_MEETINGS:
//             return {
//                 ...state,
//                 meetings: action.payload instanceof Array ? action.payload : [], // Ensure action.payload is an array
//             };
//         case SET_CURRENT_MEETING:
//             return {
//                 ...state,
//                 currentMeeting: action.payload, // Set currentMeeting to the payload
//             };
//         case REMOVE_MEETING:
//             return {
//                 ...state,
//                 meetings: state.meetings.filter(meeting => meeting.id !== action.payload),
//             };
//         default:
//             return state;
//     }
// };

// export default meetingReducer;


import { SET_MEETINGS, SET_CURRENT_MEETING, REMOVE_MEETING, SET_MEETING_DETAILS } from '../actions/meetingActions';

const initialState = {
  meetings: [],
  currentMeeting: null,
  meetingDetails: null,
};

const meetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETINGS:
      return {
        ...state,
        meetings: action.payload instanceof Array ? action.payload : [],
      };
    case SET_CURRENT_MEETING:
      return {
        ...state,
        currentMeeting: action.payload,
      };
    case SET_MEETING_DETAILS:
      return {
        ...state,
        meetingDetails: action.payload,
      };
    case REMOVE_MEETING:
      return {
        ...state,
        meetings: state.meetings.filter(meeting => meeting.id !== action.payload),
      };
    default:
      return state;
  }
};

export default meetingReducer;
