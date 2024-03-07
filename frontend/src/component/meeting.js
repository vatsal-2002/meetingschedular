import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

const Meeting = () => {
  const [userFullName, setUserFullName] = useState("");
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [meetingSuccess, setMeetingSuccess] = useState(false);
  const [userNameFocused, setuserNameFocused] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const meetingDetails = location.state;
  const navigate = useNavigate();
  const meetingId = new URLSearchParams(location.search).get("id");
  const meetingIdformate = meetingId.split('/')[0];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dateTimeString = queryParams.get("date");
    const timeString = queryParams.get("time");
    const timezoneParam = queryParams.get("timezone");
    const formattedTimezone = decodeURIComponent(timezoneParam).replace(
      "-",
      " "
    );
    const dateTime = new Date(dateTimeString + "T" + timeString);

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    const formattedDateTime = dateTime.toLocaleString("en-US", options);
    setFormattedDateTime(formattedDateTime);
    setTimezone(formattedTimezone);
  }, [location.search, location.search]);

  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const decodedToken = decodeToken(userToken);
    const userId = decodedToken.id;
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `${userToken}`,
          },
        });

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

  useEffect(() => {
    // Check for validation errors
    const hasErrors = !!errors.userName || !!errors.userEmail;
    // Update button disabled state
    setIsButtonDisabled(hasErrors || !userName || !userEmail); // Disable if there are errors or required fields are empty
  }, [errors, userName, userEmail]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
    // Validate username
    setErrors((prevErrors) => ({
      ...prevErrors,
      userName: /^[a-zA-Z]*$/.test(value)
        ? ""
        : "Alphabetic characters only allowed in the name",
    }));
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setUserEmail(value);
    // Validate email
    setErrors((prevErrors) => ({
      ...prevErrors,
      userEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email format",
    }));
  };



  const handleScheduleMeeting = async () => {
    try {
      const userToken = sessionStorage.getItem("userToken");
      const userId = decodeToken(userToken).id;

      // Check if required fields are empty
      if (!userName) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: "Name is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: "",
        }));
      }

      if (!userEmail) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userEmail: "Email is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userEmail: "",
        }));
      }

      // Check for validation errors
      if (errors.userName || errors.userEmail) {
        console.error("Validation failed. Please correct the errors.");
        return;
      }

      // Proceed with data submission
      const queryParams = new URLSearchParams(location.search);
      const startTimeString = queryParams.get("date");
      const date = queryParams.get("date");
      const time = queryParams.get("time");
      const duration = queryParams.get("duration") || 30;

      // Parse the start time from the URL
      const startTime = new Date(`${date} ${time}`);

      // Calculate the end time by adding the duration to the start time
      let endTime = new Date(startTime.getTime() + duration * 60000); // Convert duration to milliseconds

      // Check if endTime exceeds 24 hours, then increment the date by 1
      if (endTime.getDate() !== startTime.getDate()) {
        endTime.setDate(endTime.getDate() + 1);
      }

      // Format the end time as HH:mm
      const formattedEndTime = endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const startslot = `${date} ${time}`;
      const endslot = `${endTime.toISOString().split("T")[0]} ${formattedEndTime}`;

      const slotBooked = {
        start: startslot,
        end: endslot,
      };
      console.log(meetingIdformate)
      const response = await fetch("http://localhost:8000/slotbooked", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userToken}`,
        },
        body: JSON.stringify({
          meetingSettingsId: meetingIdformate,
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
      setUserName("");
      setUserEmail("");
      setTimeSlots([]);
      setMeetingSuccess(true);
    } catch (error) {
      console.error("Error scheduling meeting:", error.message);
    }
  };



  const handleEventPageNavigation = () => {
    navigate("/event");
  };

  const handleMeetingSettingsNavigation = () => {
    if (meetingId) {
      // Split the meetingId by '/' and get the first element
      const extractedId = meetingId.split("/")[0];
      navigate(`/meetingsetting?id=${extractedId}`);
    } else {
      console.error("Meeting ID not available");
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
      {meetingSuccess ? (
        <div className="container-fuild meeting-success-container">
          <row>
            <div className="col-12 d-flex align-items-center bg-soft-secondary vh-100">
              <div className="container create-preview meetingpagediv">
                <div className="row d-flex ">
                  <div className="col-12 d-flex flex-column p-4 align-items-center">
                    <h3>
                      <span class="mdi mdi-check-circle-outline"></span>You are
                      scheduled
                    </h3>
                    <label>
                      A calendar invitation has been sent to your email address.
                    </label>
                    <div className="meeting-success">
                      <div>
                        <label>
                          <b>
                            {meetingDetails.name
                              ? meetingDetails.name
                              : "Event name here"}
                          </b>
                        </label>
                      </div>
                      <div>
                        <label>
                          <span class="mdi mdi-account-outline"></span>
                          {userFullName ? userFullName : "UserName name here"}
                        </label>
                      </div>
                      {/* <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    {meetingDetails.duration
                      ? meetingDetails.duration
                      : "30min"}{" "}
                    min
                  </label> */}
                      <div>
                        <label>
                          <span className="mdi mdi-calendar-blank-outline"></span>
                          {formattedDateTime
                            ? formattedDateTime
                            : "9:00am - 9:30am, Wednesday, January 31, 2024"}
                        </label>
                      </div>
                      <div>
                        <label>
                          <span className="mdi mdi-earth"></span>
                          {timezone || "India Standard Time"}
                        </label>
                      </div>
                      <div>
                        <label>
                          <span className="mdi mdi-video-outline"></span>
                          {meetingDetails.location
                            ? meetingDetails.location
                            : "Google Meeting"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </row>
        </div>
      ) : (
        <div className="container-fuild meeting-detail-container">
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
                      {formattedDateTime
                        ? formattedDateTime
                        : "9:00am - 9:30am, Wednesday, January 31, 2024"}
                    </label>
                    <label>
                      <span className="mdi mdi-earth"></span>
                      {timezone || "India Standard Time"}
                    </label>
                  </div>
                  <div className="col-6 d-flex align-items-center h-550 preview-right">
                    <div className="w-100">
                      <h5>Enter Details</h5>
                      <label>Name *</label>
                      <input
                        type="text"
                        className={`form-control nametextbox ${errors.userName || (userNameFocused && !userName)
                          ? "is-invalid"
                          : ""
                          }`}
                        value={userName}
                        onChange={(e) => {
                          handleNameChange(e);
                        }}
                        onFocus={() => setuserNameFocused(true)}
                        onBlur={() => setuserNameFocused(false)}
                      />
                      {(errors.userName || (userNameFocused && !userName)) && (
                        <div className="invalid-feedback">
                          {errors.userName || "Name is required"}
                        </div>
                      )}

                      <label>Email *</label>
                      <input
                        type="email"
                        className={`form-control mb-3 w-100 emailtextbox ${errors.userEmail ? "is-invalid" : ""}`}
                        value={userEmail}
                        onChange={handleEmailChange}
                      />
                      {errors.userEmail && <div className="invalid-feedback">{errors.userEmail}</div>}

                      <button
                        className="btn btn-primary"
                        onClick={handleScheduleMeeting}
                        disabled={isButtonDisabled} // Use the button disabled state
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
      )}
    </>
  );
};

export default Meeting;