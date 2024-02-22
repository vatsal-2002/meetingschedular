export const SET_MEETINGS = 'SET_MEETINGS';
export const SET_CURRENT_MEETING = 'SET_CURRENT_MEETING';
export const SET_MEETING_DETAILS = 'SET_MEETING_DETAILS'; // Define new action type
export const FETCH_MEETING_DETAILS = 'FETCH_MEETING_DETAILS';

export const REMOVE_MEETING = 'REMOVE_MEETING';

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




