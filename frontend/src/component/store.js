import { createStore, combineReducers } from 'redux';
import meetingReducer from './reducer/meetingReducer';

// Combine reducers
const rootReducer = combineReducers({
    meetings: meetingReducer,
});


const store = createStore(rootReducer);

export default store;
