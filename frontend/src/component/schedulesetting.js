import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import Schedulesettingsidebar from './schedulesettingsidebar';
import Calendar from 'react-calendar';
import Select from "react-select";
import { Timezones_List } from "./timezones";
import 'react-calendar/dist/Calendar.css';
import { setScheduleData } from './actions/meetingActions';

const Schedulesetting = () => {
  const weeklyhoursArray = useSelector(state => state.meetings.scheduleData);
  const defaultTimeZone = "Asia/Kolkata";
  const [timezoneArray, settimezoneArray] = useState(defaultTimeZone);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userFullName, setUserFullName] = useState('');
  const [timeDuration, setTimeDuration] = useState(30);
  const [daysWithData, setDaysWithData] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const meetingId = new URLSearchParams(location.search).get('id');
  const currentMeeting = useSelector(state => state.meetings.currentMeeting);

  const [currentTime, setCurrentTime] = useState(getCurrentTime(defaultTimeZone));

  const handleScheduleChange = (selectedScheduleData) => {
    setSelectedSchedule(selectedScheduleData);
  };

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

    settimezoneArray(timezoneFromList ? currentTimezone : defaultTimeZone);
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

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const [timezone, setTimezone] = useState([
    {
      weeklyhours: [],
    },
  ]);

  useEffect(() => {
    if (Array.isArray(weeklyhoursArray)) {
      setTimezone(prevState => [{
        ...prevState[0],
        weeklyhours: weeklyhoursArray,
      }]);
    }
  }, [weeklyhoursArray]);

  useEffect(() => {
    if (currentMeeting) {
      setMeetingDetails(currentMeeting);
    }
  }, [currentMeeting]);

  useEffect(() => {
    if (meetingDetails && meetingDetails.duration) {
      setTimeDuration(parseInt(meetingDetails.duration));
    } else {
      setTimeDuration(30);
    }
  }, [meetingDetails]);

  const getWeeklyHoursForSelectedDay = () => {
    const selectedDay = selectedDate.getDay();
    const selectedTimeZone = timezone.find(
      (tz) => tz.weeklyhours && tz.weeklyhours.some((day) => day.day === selectedDay)
    );

    if (selectedTimeZone) {
      const selectedDayData = selectedTimeZone.weeklyhours.find((day) => day.day === selectedDay);
      if (selectedDayData) {
        const slots = selectedDayData.slots || [];
        return slots.map((slot) => {
          const startTime = new Date(selectedDate);
          startTime.setHours(parseInt(slot.start.hour), parseInt(slot.start.minute), 0);

          const endTime = new Date(selectedDate);
          endTime.setHours(parseInt(slot.end.hour), parseInt(slot.end.minute), 0);

          const timeSlots = [];
          let currentSlot = new Date(startTime);

          while (currentSlot < endTime) {
            const endSlot = new Date(currentSlot);
            endSlot.setMinutes(endSlot.getMinutes() + timeDuration);

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

            currentSlot.setMinutes(currentSlot.getMinutes() + timeDuration);
          }

          return timeSlots;
        }).flat();
      }
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

        const formattedStartTime = startTime.toLocaleTimeString('en-US', {
          timeZone: timezoneArray,
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });

        return (
          <button className="btn btn-primary mx-3 mb-1" key={key}>
            {formattedStartTime}
          </button>
        );
      }

      return null;
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }) => {
    const currentDate = new Date();
    const isAfterToday = date >= currentDate;

    const day = date.getDay();
    const hasData =
      timezone &&
      timezone.some(
        (tz) =>
          tz.weeklyhours &&
          tz.weeklyhours.some((d) => d.day === day && d.slots && d.slots.length > 0)
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

  const handleViewLivePage = () => {
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();

    const url = `/viewlivepage?id=${meetingId}&month=${selectedMonth}-${selectedYear}`;
    const state = {
      meetingDetails,
      selectedDate,
      timezoneArray,
      selectedSchedule,
      weeklyhoursArray,
    };
    navigate(url, { state });
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
        <div className="row d-flex">
          <div className="col-3">
            <div className="page-wrapper toggled">
              <Schedulesettingsidebar
                onScheduleChange={handleScheduleChange}
              />
            </div>
          </div>

          <div className="col-9 d-flex align-items-center bg-soft-secondary">
            <div className="container create-preview">
              <div className="row d-flex">
                <p>
                  This is a preview. To book an event, share the link with your
                  invitees.
                  <button className="btn-view-live" onClick={handleViewLivePage}><span className="mdi mdi-arrow-top-right-bold-box-outline mx-1"></span>View live page</button>
                </p>

                <div className="col-5 d-flex flex-column p-4">
                  <label>
                    {userFullName ? userFullName : "UserName name here"}
                  </label>
                  <h3>
                    {meetingDetails ? meetingDetails.name : "Event name here"}
                  </h3>
                  <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    {meetingDetails
                      ? meetingDetails.duration + " min"
                      : "30 min"}
                  </label>
                  <label>
                    <span className="mdi mdi-map-marker"></span>
                    {meetingDetails
                      ? meetingDetails.location
                      : "Add a location for it to show here"}
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

export default Schedulesetting;
