import { SET_MEETINGS, SET_CURRENT_MEETING, SET_SCHEDULE_DATA } from '../actions/meetingActions'; // Import action types
import { REMOVE_MEETING } from '../actions/meetingActions';
import { SET_SELECTED_SCHEDULE } from '../actions/type';
// Define initial state
const initialState = {
  meetings: [], // Ensure meetings is initialized as an array
  currentMeeting: null, // Initialize currentMeeting as null
  scheduleData: {},
  selectedSchedule: null,
};

// Define reducer function
const meetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETINGS:
      return {
        ...state,
        meetings: action.payload instanceof Array ? action.payload : [], // Ensure action.payload is an array
      };
    case SET_CURRENT_MEETING:
      return {
        ...state,
        currentMeeting: action.payload, // Set currentMeeting to the payload
      };
    case REMOVE_MEETING:
      return {
        ...state,
        meetings: state.meetings.filter(
          (meeting) => meeting.id !== action.payload
        ),
      };
    case SET_SCHEDULE_DATA:
      return {
        ...state,
        scheduleData: action.payload,
      };
    case SET_SELECTED_SCHEDULE:
      return {
        ...state,
        selectedSchedule: action.payload,
      };
    default:
      return state;
  }
};

export default meetingReducer;