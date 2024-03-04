import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Saleshandy-Logo-.png";
import Select from "react-select";
import { Timezones_List } from "./timezones";

const Availability = () => {
  const defaultTimeZone = "Asia/Kolkata";
  const [timezone, settimezone] = useState(defaultTimeZone);
  const [username, setusername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [weeklyhours, setWeeklyHours] = useState([]);

  useEffect(() => {
    // Fetch the token from sessionStorage
    const storedToken = sessionStorage.getItem("SignUpToken");
    if (storedToken) {
      setToken(storedToken);
    }

    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneFromList = Timezones_List.find(
      (timezone) => timezone.timezone === currentTimezone
    );

    // Set the default timezone to the current timezone or "Asia/Kolkata" if not found
    settimezone(timezoneFromList ? currentTimezone : defaultTimeZone);

    // Set the current time based on the default or current timezone
    setCurrentTime(getCurrentTime(timezoneFromList ? currentTimezone : defaultTimeZone));

  }, []);

  const handleTimeZoneChange = (selectedOption) => {
    settimezone(selectedOption.value);
  };

  const handleSubmit = async () => {
    try {
      const selectedStartHour = document.getElementById("start-hour").value;
      const selectedEndHour = document.getElementById("end-hour").value;
      const selectedDays = document.querySelectorAll(".slot-checkbox:checked");
      const weeklyhours = [];
      selectedDays.forEach((dayElement) => {
        const day = parseInt(dayElement.value, 10);
        const startHour = selectedStartHour.split(":")[0];
        const startMinute = selectedStartHour.split(":")[1];
        const endHour = selectedEndHour.split(":")[0];
        const endMinute = selectedEndHour.split(":")[1];
        const slot = {
          start: {
            hour: startHour,
            minute: startMinute,
          },
          end: {
            hour: endHour,
            minute: endMinute,
          },
        };
        const existingDayEntry = weeklyhours.find((entry) => entry.day === day);
        if (existingDayEntry) {
          existingDayEntry.slots.push(slot);
        } else {
          weeklyhours.push({
            day,
            slots: [slot],
          });
        }
      });
      setWeeklyHours(weeklyhours);

      const isDefault = 1;
      const name = "Default";
      // Use the selected timezone from the state
      const requestData = {
        isDefault,
        name,
        timezone,
        weeklyhours,
      };

      const response = await fetch("http://localhost:8000/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        return;
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message || "Internal server error");
    }
  };

  const hoursArray = Array.from({ length: 25 }, (_, index) => {
    const formattedHour = index < 10 ? `0${index}` : `${index}`;
    return `${formattedHour}:00`;
  });

  return (
    <>
      <div className="availability">
        <section className="bg-home bg-circle-gradiant d-flex align-items-center">
          <div className="bg-overlay bg-overlay-white"></div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card form-setting p-4 rounded shadow">
                  <img src={logo} alt="Logo" className="form-setting-logo" />
                  <h4>Set your availability</h4>
                  <p>
                    Let Saleshandy know when you're typically available to accept meetings.
                  </p>
                  <hr />
                  <div>
                    <h5>Available hours</h5>
                    <div className="d-flex">
                      <select id="start-hour" className="form-control w-50 me-4" defaultValue="09:00">
                        {hoursArray.map((hour, index) => (
                          <option key={index} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <select id="end-hour" className="form-control w-50" defaultValue="18:00">
                        {hoursArray.map((hour, index) => (
                          <option key={index} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5>Available days</h5>
                    <div className="available-slot d-flex align-items-baseline justify-content-center mt-3">
                      {Array.from({ length: 7 }).map((_, day) => (
                        <div
                          key={day}
                          className="slot d-flex flex-column pe-3 align-items-center justify-content-center"
                        >
                          <input
                            type="checkbox"
                            className="slot-checkbox"
                            value={day}
                          />
                          <h6>
                            {[
                              "Sundays",
                              "Mondays",
                              "Tuesdays",
                              "Wednesdays",
                              "Thursdays",
                              "Fridays",
                              "Saturdays",
                            ][day]}
                          </h6>
                        </div>
                      ))}
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
                        value: timezone,
                        label: `${timezone} (${getCurrentTime(timezone)})`,
                      }}
                      onChange={handleTimeZoneChange}
                      isSearchable={true}
                      placeholder="Search or select a timezone"
                      styles={dropdownStyles}
                      menuPlacement="top"
                    />
                  </div>
                  <hr />
                  <h6 className="text-center">
                    Don't worry! You'll be able to further customize your availability later on.
                  </h6>
                  <div className="d-flex justify-content-end mt-4">
                    <button
                      className="btn btn-pills btn-primary w-30"
                      onClick={handleSubmit}
                    >
                      Finish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Availability;