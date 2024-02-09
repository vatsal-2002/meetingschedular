import Meetingsettingsidebar from './meetingsettingsidebar';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Meetingsetting = () => {
  const location = useLocation();
  const [meetingName, setMeetingName] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');

  useEffect(() => {
    // Extract id from the query parameters
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    // Fetch meeting details based on the id
    const fetchMeetingDetails = async () => {
      try {
        const userToken = sessionStorage.getItem("userToken");

        const response = await fetch(
          `http://localhost:8000/meetingSettings/${id}`, // Use the id to fetch meeting details
          {
            method: "GET",
            headers: {
              Authorization: `${userToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch meeting details");
        }

        const meetingDetailsData = await response.json();
        // Update state with fetched data
        setMeetingName(meetingDetailsData.name || '');
        setMeetingDuration(meetingDetailsData.duration || '');
        setMeetingLocation(meetingDetailsData.location || '');
      } catch (error) {
        console.error("Error fetching meeting details:", error.message);
      }
    };

    if (id) {
      fetchMeetingDetails();
    }
  }, [location.search]);

  return (
    <>
      <div className="container-fuild">
        <row className="d-flex">
          <div className="col-3">
            <div className="page-wrapper toggled">
              <Meetingsettingsidebar />
            </div>
          </div>

          <div className="col-9 d-flex align-items-center bg-soft-secondary">
            <div className="container create-preview">
              <div className='row d-flex'>
                <p>
                  This is a preview. To book an event, share the link with
                  your invitees.
                </p>
                <div className="col-6 d-flex flex-column p-4">
                  <label>MEET PATEL</label>
                  <h3>{meetingName}</h3>
                  <label><span className="mdi mdi-clock-time-five-outline"></span>{meetingDuration} min</label>
                  <label><span className="mdi mdi-map-marker"></span>{meetingLocation}</label>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center h-550 preview-right">
                  <h5 className='text-center'>A preview of your availability will show on the next step</h5>
                </div>
              </div>
            </div>
          </div>
        </row>
      </div>
    </>
  );

}

export default Meetingsetting