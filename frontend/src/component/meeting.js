import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";


const Meeting = () => {
  const [userFullName, setUserFullName] = useState('');
  const [formattedDateTime, setFormattedDateTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [timezone, setTimezone] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const meetingDetails = location.state;
  const navigate = useNavigate();
  const meetingId = new URLSearchParams(location.search).get('id');


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dateTimeString = queryParams.get('date');
    const timeString = queryParams.get('time');
    const timezoneParam = queryParams.get('timezone');
    const formattedTimezone = decodeURIComponent(timezoneParam).replace('-', ' ');
    const dateTime = new Date(dateTimeString + 'T' + timeString);

    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    };

    const formattedDateTime = dateTime.toLocaleString('en-US', options);
    setFormattedDateTime(formattedDateTime);
    setTimezone(formattedTimezone);
  }, [location.search, location.search]);



  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

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
  }, [dispatch]);


  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const timeSlotsParam = queryParams.get('time');

  //   if (timeSlotsParam) {
  //     try {
  //       // Remove the '%' character from the beginning of the timeSlotsParam
  //       const cleanedTimeSlotsParam = timeSlotsParam.replace(/^%/, '');
  //       const parsedTimeSlots = JSON.parse(decodeURIComponent(cleanedTimeSlotsParam));
  //       setTimeSlots(parsedTimeSlots);
  //     } catch (error) {
  //       console.error("Error parsing time slots:", error.message);
  //     }
  //   }
  // }, [location.search]);





  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleScheduleMeeting = async () => {
    try {
      const userToken = sessionStorage.getItem("userToken");
      const userId = decodeToken(userToken).id;

      if (!userName || !userEmail) {
        console.error("Name and email are required");
        return;
      }

      const queryParams = new URLSearchParams(location.search);
      const startTimeString = queryParams.get('date');
      const date = queryParams.get('date');
      const time = queryParams.get('time');
      const duration = queryParams.get('duration') || 30; // Default duration if not available
      console.log(duration);

      // Parse the start time from the URL
      const startTime = new Date(`${date} ${time}`);

      // Calculate the end time by adding the duration to the start time
      let endTime = new Date(startTime.getTime() + duration * 60000); // Convert duration to milliseconds

      // Check if endTime exceeds 24 hours, then increment the date by 1
      if (endTime.getDate() !== startTime.getDate()) {
        endTime.setDate(endTime.getDate() + 1);
      }

      // Format the end time as HH:mm
      const formattedEndTime = endTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      console.log(`Formatted End Time: ${formattedEndTime}`);

      const startslot = `${date} ${time}`;
      console.log(`Start Slot: ${startslot}`);

      const endslot = `${endTime.toISOString().split('T')[0]} ${formattedEndTime}`;
      console.log(`End Slot: ${endslot}`);

      const slotBooked = {
        start: startslot,
        end: endslot,
      };

      console.log(slotBooked);

      const response = await fetch('http://localhost:8000/slotbooked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userToken}`,
        },
        body: JSON.stringify({
          userId,
          meetingId,
          guestname: userName,
          guestemail: userEmail,
          slotbooked: slotBooked,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule meeting");
      }

      // You can handle the response or perform additional actions if needed
      const responseData = await response.json();
      console.log("Meeting scheduled successfully:", responseData);

      // Clear the form inputs and time slots after successful submission
      setUserName('');
      setUserEmail('');
      setTimeSlots([]);

    } catch (error) {
      console.error("Error scheduling meeting:", error.message);
    }
  };


  const handleEventPageNavigation = () => {
    navigate('/event');
  };

  const handleMeetingSettingsNavigation = () => {
    if (meetingId) {
      // Split the meetingId by '/' and get the first element
      const extractedId = meetingId.split('/')[0];
      navigate(`/meetingsetting?id=${extractedId}`);
    } else {
      console.error('Meeting ID not available');
    }
  };


  return (
    <>
      <div className="container-fuild">
        <row>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <NavDropdown title="Menu" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={handleEventPageNavigation}>
                      Home
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleMeetingSettingsNavigation}>
                      Edit event type
                    </NavDropdown.Item>
                  </NavDropdown>
                  <a href="#" className="btn btn-outline-primary">
                    {" "}
                    Copy link{" "}
                  </a>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </row>
      </div>
      <div className="container-fuild">
        <row>
          <div className="col-12 d-flex align-items-center bg-soft-secondary vh-100">
            <div className="container create-preview meetingpagediv">
              <div className="row d-flex ">
                <div className="col-6 d-flex flex-column p-4">
                  <label>
                    {userFullName ? userFullName : "UserName name here"}
                  </label>
                  <h3>
                    {meetingDetails.name
                      ? meetingDetails.name
                      : "Event name here"}
                  </h3>
                  <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    {meetingDetails.duration
                      ? meetingDetails.duration
                      : "30min"}{" "}
                    min
                  </label>
                  <label>
                    <span className="mdi mdi-video-outline"></span>
                    {meetingDetails.location
                      ? meetingDetails.location
                      : "Google Meeting"}
                  </label>
                  <label>
                    <span className="mdi mdi-calendar-blank-outline"></span>
                    {formattedDateTime ? formattedDateTime : "9:00am - 9:30am, Wednesday, January 31, 2024"}
                  </label>
                  <label>
                    <span className="mdi mdi-earth"></span>{timezone || "India Standard Time"}
                  </label>
                </div>
                <div className="col-6 d-flex align-items-center h-550 preview-right">
                  <div className="w-100">
                    <h5>Enter Details</h5>
                    <label>Name *</label>
                    <input
                      type="text"
                      className="form-control mb-3 w-100 nametextbox"
                      value={userName}
                      onChange={handleNameChange}
                    />
                    <label>Email *</label>
                    <input
                      type="email"
                      className="form-control mb-3 w-100 emailtextbox"
                      value={userEmail}
                      onChange={handleEmailChange}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleScheduleMeeting}
                    >
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </row>
      </div>
    </>
  );
};

export default Meeting;