
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Sidebar from "./sidebar";
import Topheader from "./topheader";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMeeting } from './actions/meetingActions';
import { useNavigate, useHistory } from 'react-router-dom';
import { setMeetings } from './actions/meetingActions';
import { removeMeeting } from './actions/meetingActions';


const Index = () => {
  const [isToggled, setToggled] = useState(true);
  const dispatch = useDispatch();
  const meetingsState = useSelector(state => state.meetings);
  const Navigate = useNavigate();

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      if (!token) {
        console.log("No token found in session storage.");
        return;
      }

      const decodedToken = decodeToken(token);
      const config = {
        headers: { Authorization: token },
      };

      const response = await axios.get(
        `http://localhost:8000/meeting/${decodedToken.id}`,
        config
      );

      const filteredMeetings = response.data.filter(
        (meeting) => !meeting.deletedAt
      );

      const meetingsWithId = filteredMeetings.map((meeting) => ({
        ...meeting,
        id: meeting.id, // Assuming the id is available in the meeting object
      }));
      dispatch(setMeetings(meetingsWithId));
      // Dispatch action to set meetings in Redux store
      dispatch(setMeetings(filteredMeetings));
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const decodeToken = (token) => {
    try {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this event permanently?"
      );
      if (confirmDelete) {
        const token = sessionStorage.getItem("userToken");
        const config = {
          headers: { Authorization: token },
        };

        const response = await axios.delete(
          `http://localhost:8000/meetingSettings/${id}`,
          config
        );

        if (response.status === 200) {
          console.log("Meeting deleted successfully:", response.data);
          // Dispatch action to remove meeting from Redux store
          dispatch(removeMeeting(id));
        } else {
          console.error("Error deleting meeting:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  const handleEdit = async (meeting) => {
    try {
      // Dispatch action to set current meeting in Redux store
      dispatch(setCurrentMeeting(meeting));
      // Redirect to meeting settings page
      Navigate(`/meetingsetting?id=${meeting.id}`); // Pass meeting id as query parameter
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
  };


  return (
    <>
      <div className={`page-wrapper ${isToggled ? "toggled" : ""}`}>
        <Sidebar isToggled={isToggled} handleToggle={handleToggle} />
        <main className="page-content bg-light">
          <Topheader isToggled={isToggled} handleToggle={handleToggle} />
          <div className="container-fluid">
            <div className="layout-specing">
              <div className="d-md-flex justify-content-between align-items-center">
                <h5 className="mb-0">Event types</h5>
              </div>
              <div className="row">
                <div className="row row-cols-xl-3 row-cols-md-2 row-cols-1">
                  {meetingsState.meetings.map((meeting) => (
                    <div key={meeting.id} className="col mt-4">
                      <div className="features feature-primary d-flex justify-content-between rounded shadow p-3">
                        <div className="d-flex align-items-center">
                          <div className="flex-1 ms-3">
                            <h3 className="mb-0 text-muted">{meeting.name}</h3>
                            <h6 className="mb-0 text-muted">
                              {meeting.duration} min
                            </h6>
                            <h6 className="mb-0 text-muted">
                              View booking page
                            </h6>
                          </div>
                        </div>
                        <Dropdown className="index-dropdown">
                          <Dropdown.Toggle variant="" id="dropdown-basic">
                            <span className="mdi mdi-cog" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                handleEdit(meeting)
                              }
                            >
                              <span className="mdi mdi-pencil" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDelete(meeting.id)}
                            >
                              <span className="mdi mdi-delete" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
