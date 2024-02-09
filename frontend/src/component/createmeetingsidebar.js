import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Createmeetingsidebar = ({
  meetingName,
  setMeetingName,
  selectedDuration,
  showCustomDuration,
  handleDurationChange,
  location,
  setLocation,
  setSelectedDuration
}) => {
  const [error, setError] = useState(null);
  const [customDuration, setCustomDuration] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setLocation(newLocation);
  };

  const handleContinue = async () => {
    try {
      const userToken = sessionStorage.getItem('userToken');

      if (!userToken) {
        throw new Error('Token not found');
      }

      const decodeToken = (userToken) => {
        try {
          const [payload] = userToken.split('.');
          const decodedPayload = JSON.parse(atob(payload));
          return decodedPayload;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      };

      const decodedToken = decodeToken(userToken);

      const meetingData = {
        userId: decodedToken.id,
        scheduleId: null,
        name: meetingName,
        duration: showCustomDuration ? customDuration : selectedDuration,
        location: location,
        link: null
      };

      const response = await fetch('http://localhost:8000/meetingSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userToken
        },
        body: JSON.stringify(meetingData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      navigate(`/meetingsetting?id=${responseData.id}`);
    } catch (error) {
      console.error('Error creating meeting setting:', error.message);
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/index');
  };

  const handleCustomDurationChange = (event) => {
    const duration = event.target.value;
    if (duration && !Number(duration)) {
      setError("Please enter a valid number for duration.");
    } else if (Number(duration) > 300) {
      setError("Maximum time limit is 300 minutes.");
    } else {
      setError(null);
      setCustomDuration(duration);
      setSelectedDuration(duration);
    }
  };


  return (
    <>
      {error && <div>Error: {error}</div>}
      <div className="sidebar-block">
        <nav id="sidebar" className="sidebar-wrapper toggled">
          <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
            <div className="create-meeting mt-3 p-3">
              <button className="meeting-cancel" onClick={handleCancel}>
                <span className="mdi mdi-arrow-left-thick"></span>Cancel
              </button>
              <h4 className="mt-3">New Meeting</h4>
            </div>
            <hr />
            <div className="d-flex flex-column meeting-detail p-4">
              <label>Meeting name</label>
              <input
                type="textbox"
                className="form-control mb-3"
                placeholder="Name your meeting"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
              />

              <label>Duration</label>
              <select
                id="duration"
                className="custom-select"
                value={showCustomDuration ? "Custom" : selectedDuration}
                onChange={handleDurationChange}
              >
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="Custom">Custom</option>
              </select>
              <br />

              {showCustomDuration && (
                <div>
                  <input
                    type="textbox"
                    className="form-control mb-3"
                    placeholder="Enter duration in minutes"
                    value={customDuration}
                    onChange={handleCustomDurationChange}
                  />
                  {error && <div className="text-danger">{error}</div>}
                </div>
              )}

              <label>Location</label>
              <select
                id="location"
                className="custom-select"
                value={location}
                onChange={handleLocationChange}
              >
                <option value="google_meet">Google Meet</option>
              </select>
            </div>
          </div>
          <div className="meeting-controller d-flex justify-content-end me-4">
            <button className="meeting-cancel">
              <Link to="/index" className="meeting-cancel">Cancel</Link>
            </button>
            <button className="btn btn-primary" onClick={handleContinue}>Continue</button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Createmeetingsidebar;

