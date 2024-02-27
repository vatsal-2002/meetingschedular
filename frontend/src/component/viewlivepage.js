import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import Select from "react-select";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Timezones_List } from "./timezones";
import 'react-calendar/dist/Calendar.css';


const Viewlivepage = () => {
  const defaultTimeZone = "Asia/Kolkata";
  const [timezoneArray, settimezoneArray] = useState(defaultTimeZone);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingDetails, setMeetingDetails] = useState('');

  const { weeklyhoursArray } = location.state || {};

  useEffect(() => {
    console.log("weeklyhoursArray:", weeklyhoursArray);
  }, [weeklyhoursArray]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userFullName, setUserFullName] = useState('');
  const [timeDuration, setTimeDuration] = useState(15);
  const [daysWithData, setDaysWithData] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const meetingId = new URLSearchParams(location.search).get('id');

  const [currentTime, setCurrentTime] = useState(getCurrentTime(defaultTimeZone));

  function getCurrentTime(timezone) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };

    try {
      new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format();
    } catch (error) {
      timezone = "UTC";
    }

    const currentTime = new Date().toLocaleTimeString("en-US", {
      ...options,
      timeZone: timezone,
    });

    return currentTime;
  }

  const dropdownStyles = {
    control: (styles) => ({ ...styles, marginBottom: 20 }),
    menu: (styles) => ({ ...styles, marginTop: -8 }),
  };

  const handleTimeZoneChange = (selectedOption) => {
    settimezoneArray(selectedOption.value);
  };

  useEffect(() => {

    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneFromList = Timezones_List.find(
      (timezone) => timezone.timezone === currentTimezone
    );

    // Set the default timezone to the current timezone or "Asia/Kolkata" if not found
    settimezoneArray(timezoneFromList ? currentTimezone : defaultTimeZone);

    // Set the current time based on the default or current timezone
    setCurrentTime(getCurrentTime(timezoneFromList ? currentTimezone : defaultTimeZone));

  }, []);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const userToken = sessionStorage.getItem("userToken");
        const response = await fetch(
          `http://localhost:8000/meetingSettings/${meetingId}`,
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

        const meetingData = await response.json();
        setMeetingDetails(meetingData);
      } catch (error) {
        console.error("Error fetching meeting details:", error.message);
      }
    };

    if (meetingId) {
      fetchMeeting();
    }
  }, [meetingId, dispatch]);
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


  const [timezone, setTimezone] = useState([
    {
      weeklyhours: [],
    },
  ]);



  const getWeeklyHoursForSelectedDay = () => {
    const selectedDay = selectedDate.getDay();

    const selectedDayData = (weeklyhoursArray || []).find(dayData => dayData.day === selectedDay);

    if (selectedDayData) {
      const slots = selectedDayData.slots || [];
      return slots.map((slot) => {
        const startTime = new Date(selectedDate);
        startTime.setHours(parseInt(slot.start.hour), parseInt(slot.start.minute), 0);

        const endTime = new Date(selectedDate);
        endTime.setHours(parseInt(slot.end.hour), parseInt(slot.end.minute), 0);

        const timeSlots = [];
        let currentSlot = new Date(startTime);

        const duration = meetingDetails?.duration || 30; // Default duration is 30 minutes

        while (currentSlot < endTime) {
          const endSlot = new Date(currentSlot);
          endSlot.setMinutes(endSlot.getMinutes() + duration);

          timeSlots.push({
            start: {
              hour: currentSlot.getHours().toString().padStart(2, '0'),
              minute: currentSlot.getMinutes().toString().padStart(2, '0'),
            },
            end: {
              hour: endSlot.getHours().toString().padStart(2, '0'),
              minute: endSlot.getMinutes().toString().padStart(2, '0'),
            },
          });

          currentSlot.setMinutes(currentSlot.getMinutes() + duration);
        }

        return timeSlots;
      }).flat();
    }

    return [];
  };



  const generateTimeSlotsButtons = () => {
    const timeSlots = getWeeklyHoursForSelectedDay();
    const uniqueKeys = new Set();

    return timeSlots.map((slot, index) => {
      const key = `${slot.start.hour}:${slot.start.minute}`;

      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key);

        const startTime = new Date(selectedDate);
        startTime.setHours(parseInt(slot.start.hour), parseInt(slot.start.minute), 0);

        const endTime = new Date(selectedDate);
        endTime.setHours(parseInt(slot.end.hour), parseInt(slot.end.minute), 0);

        // Calculate duration based on meeting details or default
        const duration = meetingDetails?.duration || 30;

        const formattedStartTime = startTime.toLocaleTimeString('en-US', {
          timeZone: timezoneArray,
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });

        const formattedEndTime = endTime.toLocaleTimeString('en-US', {
          timeZone: timezoneArray,
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });

        return (
          <div key={key} className="d-flex align-items-center">
            <button className="btn btn-primary mx-1 mb-1 w-100" onClick={() => handleStartTimeClick(index)}>
              {formattedStartTime}
            </button>
            {selectedSchedule === index && (
              <button className="btn btn-secondary mb-1" onClick={() => handleNextButtonClick(slot)}>
                Next
              </button>
            )}
          </div>
        );
      }

      return null;
    });
  };


  const handleStartTimeClick = (index) => {
    // Set the selected schedule index when a formatted start time button is clicked
    setSelectedSchedule(index);
  };



  const handleNextButtonClick = (slot) => {
    // Format the selected date to match the desired format
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const formattedTime = `${slot.start.hour}:${slot.start.minute}`;
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    const timezoneOffsetString = timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset.toString();

    // Construct the URL with the necessary parameters and meeting details
    const url = `/meeting?${encodeURIComponent(meetingDetails.name)}/${meetingDetails.duration}/${encodeURIComponent(meetingDetails.location)}${formattedDate}T${formattedTime}${timezoneOffsetString}?month=${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}&date=${formattedDate}`;

    // Navigate to the Meeting page with the constructed URL and meeting details as state
    navigate(url, { state: meetingDetails });
  };




  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }) => {
    const currentDate = new Date();
    const isAfterToday = date >= currentDate;

    const day = date.getDay();
    const hasData =
      weeklyhoursArray &&
      weeklyhoursArray.some(
        (dayData) =>
          dayData.day === day &&
          dayData.slots &&
          dayData.slots.length > 0
      );

    if (hasData && isAfterToday && view === 'month' && !daysWithData.includes(day)) {
      setDaysWithData((prevDays) => [...prevDays, day]);
    }

    return hasData && isAfterToday && view === 'month' ? <div className="blue-dot"></div> : null;
  };

  const handleTileClick = ({ date, view }) => {
    if (!date) {
      return false;
    }

    const day = date.getDay();
    const hasData =
      timezone &&
      timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

    if (!hasData || view !== 'month') {
      return false;
    }

    setSelectedDate(date);

    return true;
  };


  const handleEventPageNavigation = () => {
    navigate('/event');
  };

  const handleMeetingSettingsNavigation = () => {
    navigate(`/meetingsetting?id=${meetingId}`);
  };

  return (
    <>
      <style>
        {`
          .blue-dot {
            width: 10px;
            height: 10px;
            background-color: blue;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 3px;
          }

          .disabled-dot {
            width: 10px;
            height: 10px;
            background-color: lightgray;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 3px;
          }
        `}
      </style>
      <div className="container-fuild">
        <row>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <NavDropdown title="Menu" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={handleEventPageNavigation}>Home</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleMeetingSettingsNavigation}>Edit event type
                    </NavDropdown.Item>
                  </NavDropdown>
                  <a href="#" className="btn btn-outline-primary"> Copy link </a>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </row>
      </div>

      <div className="container-fuild">
        <div className="row d-flex">
          <div className="col-12 d-flex align-items-center bg-soft-secondary vh-100">
            <div className="container create-preview">
              <div className="row d-flex">
                <div className="col-5 d-flex flex-column p-4">
                  <label>
                    {userFullName ? userFullName : "UserName name here"}
                  </label>
                  <label>{meetingDetails?.organizer}</label>
                  <h3>{meetingDetails?.name || "Event name here"}</h3>
                  <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    {meetingDetails?.duration ? `${meetingDetails.duration} min` : "30 min"}
                  </label>
                  <label>
                    <span className="mdi mdi-map-marker"></span>
                    {meetingDetails?.location || "Add a location for it to show here"}
                  </label>
                </div>
                <div className="col-7 d-flex align-items-center justify-content-center h-550 preview-right">
                  <div>
                    <h4>Select Date & Times</h4>
                    <div className="d-flex">
                      <div>
                        <Calendar
                          onChange={handleDateChange}
                          value={selectedDate}
                          minDate={new Date()}
                          tileContent={tileContent}
                          onClickDay={handleTileClick}
                        />
                      </div>
                      <div>
                        <div className="days-slots d-flex flex-column overflow-slots">
                          {generateTimeSlotsButtons()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h6>Time Zone</h6>
                      <Select
                        id="timezone"
                        className="w-50"
                        options={Timezones_List.map((timezone) => ({
                          value: timezone.timezone,
                          label: `${timezone.timezone} (${getCurrentTime(
                            timezone.timezone
                          )})`,
                        }))}
                        value={{
                          value: timezoneArray,
                          label: `${timezoneArray} (${getCurrentTime(
                            timezoneArray
                          )})`,
                        }}
                        onChange={handleTimeZoneChange}
                        isSearchable={true}
                        placeholder="Search or select a timezone"
                        styles={dropdownStyles}
                        menuPlacement="top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewlivepage;