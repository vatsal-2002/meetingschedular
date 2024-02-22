import React, { useState, useEffect } from 'react';
import Createmeetingsidebar from './createmeetingsidebar';

const Createmeeting = () => {
  const [meetingName, setMeetingName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("15");
  const [showCustomDuration, setShowCustomDuration] = useState(false);
  const [location, setLocation] = useState("google_meet");
  const [customDuration, setCustomDuration] = useState("");
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    // Decode user token to get user ID
    const userToken = sessionStorage.getItem("userToken");
    const decodedToken = decodeToken(userToken);
    const userId = decodedToken.id;
    // Fetch user details using user ID
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `${userToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        setUserFullName(`${userData.firstname} ${userData.lastname}`);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to decode JWT token
  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  const handleDurationChange = (event) => {
    const duration = event.target.value;
    setSelectedDuration(duration);
    setShowCustomDuration(duration === 'Custom');
  };



  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex">
          <div className="col-3">
            <div className="page-wrapper toggled">
              <Createmeetingsidebar
                meetingName={meetingName}
                setMeetingName={setMeetingName}
                selectedDuration={selectedDuration}
                showCustomDuration={showCustomDuration}
                handleDurationChange={handleDurationChange}
                location={location}
                setLocation={setLocation}
                setSelectedDuration={setSelectedDuration} // Add this line
              />
            </div>
          </div>

          <div className="col-9 d-flex align-items-center bg-soft-secondary">
            <div className="container create-preview">
              <div className='row d-flex'>
                <p>
                  This is a preview. To book an event, share the link with your invitees.
                </p>
                <div className="col-6 d-flex flex-column p-4">
                  <label>{userFullName ? userFullName : "Event name here"}</label>
                  <h3>{meetingName}</h3>
                  <label><span className="mdi mdi-clock-time-five-outline"></span>{selectedDuration} min</label>
                  <label><span className="mdi mdi-map-marker"></span>{location}</label>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center h-550 preview-right">
                  <h5 className='text-center'>A preview of your availability will show on the next step</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createmeeting;
