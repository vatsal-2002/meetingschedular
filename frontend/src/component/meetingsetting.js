import Meetingsettingsidebar from './meetingsettingsidebar';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Meetingsetting = () => {
  const location = useLocation();
  const [meetingName, setMeetingName] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [userFullName, setUserFullName] = useState('');
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const message = params.get('message');

  //   if (message) {
  //     toast.success(message, { position: 'top-center', autoClose: 1000 });

  //     params.delete('message');

  //     const newUrl = `${window.location.pathname}?${params.toString()}`;

  //     setTimeout(() => {
  //       window.location.replace(newUrl);
  //     }, 1000);
  //   }
  // }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const fetchMeetingDetails = async () => {
      try {
        const userToken = sessionStorage.getItem("userToken");

        const response = await fetch(
          `http://localhost:8000/meetingSettings/${id}`,
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

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const decodedToken = decodeToken(userToken);
    const userId = decodedToken.id;
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
                  <label>{userFullName ? userFullName : "Event name here"}</label>
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