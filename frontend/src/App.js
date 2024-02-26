import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './component/store';
import Login from './component/login';
import Signup from './component/signup';
import Setting from './component/setting';
import Availability from './component/availability';
import Demo from './component/demo';
import Index from './component/event';
import Createmeeting from './component/createmeeting';
import Meetingsetting from './component/meetingsetting';
import EditMeeting from './component/editmeeting';
import Schedulesetting from './component/schedulesetting';
import Viewlivepage from './component/viewlivepage';
import Meeting from './component/meeting';
import Availabilityschedules from './component/availabilityschedules';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/event" element={<Index />} />
            <Route path="/createmeeting" element={<Createmeeting />} />
            <Route path="/meetingsetting" element={<Meetingsetting />} />
            <Route path="/editmeeting" element={<EditMeeting />} />
            <Route path="/schedulesetting" element={<Schedulesetting />} />
            <Route path="/viewlivepage" element={<Viewlivepage />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/availabilityschedules" element={<Availabilityschedules />} />
            {/* <Route path="/demo" element={<Demo />} /> */}

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;