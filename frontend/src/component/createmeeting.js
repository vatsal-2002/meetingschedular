import React, { useState } from 'react';
import Createmeetingsidebar from './createmeetingsidebar';

const Createmeeting = () => {
  const [meetingName, setMeetingName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("15");
  const [showCustomDuration, setShowCustomDuration] = useState(false);
  const [location, setLocation] = useState("google_meet");
  const [customDuration, setCustomDuration] = useState(""); // State to store custom duration

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
                  <label>MEET PATEL</label>
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
