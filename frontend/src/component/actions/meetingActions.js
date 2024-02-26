import { SET_SELECTED_SCHEDULE } from './type';
export const SET_MEETINGS = 'SET_MEETINGS';
export const SET_CURRENT_MEETING = 'SET_CURRENT_MEETING';
export const SET_MEETING_DETAILS = 'SET_MEETING_DETAILS'; // Define new action type
export const FETCH_MEETING_DETAILS = 'FETCH_MEETING_DETAILS';
export const SET_SCHEDULE_DATA = 'SET_SCHEDULE_DATA';
export const REMOVE_MEETING = 'REMOVE_MEETING';

const initialState = {
    scheduleData: [], // Or whatever initial value is appropriate
};
export const removeMeeting = (meetingId) => ({
    type: REMOVE_MEETING,
    payload: meetingId,
});
// Action creators
export const setMeetings = (meetings) => ({
    type: SET_MEETINGS,
    payload: meetings,
});

export const setCurrentMeeting = (meeting) => ({
    type: SET_CURRENT_MEETING,
    payload: meeting,
});



export const setMeetingDetails = (details) => ({ // Define setMeetingDetails action creator
    type: SET_MEETING_DETAILS,
    payload: details,
});

export const fetchMeetingDetails = (meetingId) => ({
    type: FETCH_MEETING_DETAILS,
    payload: meetingId,
});


const setScheduleData = (data) => ({
    type: 'SET_SCHEDULE_DATA',
    payload: data,
});

const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCHEDULE_DATA:
            return {
                ...state,
                scheduleData: action.payload,
            };
        // Add other cases as needed

        default:
            return state;
    }
};

const fetchScheduleData = async (scheduleId) => {
    const response = await fetch(`http://your-api-endpoint/schedule/${scheduleId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch schedule data");
    }
    return await response.json();
};


export const setSelectedSchedule = (selectedSchedule) => {
    return {
        type: SET_SELECTED_SCHEDULE,
        payload: selectedSchedule,
    };
};


export { setScheduleData, meetingReducer };