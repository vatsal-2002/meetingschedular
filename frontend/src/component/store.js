import { createStore, combineReducers } from 'redux';
import meetingReducer from './reducer/meetingReducer';

// Combine reducers
const rootReducer = combineReducers({
    meetings: meetingReducer,
});

// Retrieve initial state from server or use a default state
const initialState = {}; // You can initialize it with data from the server if available

// Create store with initial state
const store = createStore(rootReducer, initialState);

export default store;
