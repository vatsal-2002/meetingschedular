
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from "react-router-dom";
// import { setMeetingDetails } from './actions/meetingActions';

// const Demo = ({ setMeetingName, setSelectedDuration, setMeetingLocation }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [meetingDetails, setMeetingDetails] = useState({
//     name: "",
//     duration: "15",
//     location: "google_meet"
//   });

//   // Handler function to update meeting details
//   const updateMeetingDetails = (newDetails) => {
//     setMeetingDetails(newDetails);
//   };

//   const queryParams = new URLSearchParams(location.search);
//   const meetingId = queryParams.get("id");

//   const currentMeeting = useSelector(state => state.meetings.currentMeeting);

//   const [meetingName, setLocalMeetingName] = useState("");
//   const [selectedDuration, setLocalSelectedDuration] = useState("15");
//   const [meetingLocation, setLocalMeetingLocation] = useState("googlemeet");

//   useEffect(() => {
//     if (currentMeeting) {
//       setLocalMeetingName(currentMeeting.name || "");
//       setLocalSelectedDuration(currentMeeting.duration || "15");
//       setLocalMeetingLocation(currentMeeting.location || "googlemeet");
//     } else {
//       fetchMeetingDetails();
//     }
//   }, [currentMeeting]);

//   const fetchMeetingDetails = async () => {
//     try {
//       const userToken = sessionStorage.getItem("userToken");

//       if (!userToken) {
//         throw new Error("Token not found");
//       }

//       const response = await fetch(
//         `http://localhost:8000/meetingSettings/${meetingId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: userToken,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch meeting details");
//       }

//       const meetingDetailsData = await response.json();
//       dispatch(setMeetingDetails(meetingDetailsData));

//       setLocalMeetingName(meetingDetailsData.name || "");
//       setLocalSelectedDuration(meetingDetailsData.duration || "15");
//       setLocalMeetingLocation(meetingDetailsData.location || "googlemeet");
//     } catch (error) {
//       console.error("Error fetching meeting details:", error);
//     }
//   };

//   const handleDurationChange = (event) => {
//     const duration = event.target.value;
//     setLocalSelectedDuration(duration);
//     setSelectedDuration(duration); // Update the duration in the main component
//   };

//   const handleContinue = async () => {
//     try {
//       const userToken = sessionStorage.getItem("userToken");

//       if (!userToken) {
//         throw new Error("Token not found");
//       }

//       const meetingData = {
//         userId: meetingId,
//         scheduleId: null,
//         name: meetingName,
//         duration: selectedDuration,
//         location: "google_meet",
//         link: null,
//       };

//       const response = await fetch(
//         `http://localhost:8000/meetingSettings/${meetingId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: userToken,
//           },
//           body: JSON.stringify(meetingData),
//         }
//       );

//       if (response.status === 200) {
//         const data = await response.json();
//         dispatch(setMeetingDetails(data));
//         navigate(`/meetingsetting?id=${meetingId}`);
//       } else {
//         console.error("Failed to update meeting:", response.data.error);
//       }
//     } catch (error) {
//       console.error("Error updating meeting:", error);
//     }
//   };

//   const handleCancel = () => {
//     navigate(`/meetingsetting?id=${meetingId}`);
//   };
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row d-flex">
//           <div className="col-3">
//             <div className="page-wrapper toggled">
//               {/* <EditMeetingsidebar
//                 meetingDetails={meetingDetails}
//                 updateMeetingDetails={updateMeetingDetails}
//               /> */}
//               <div className="sidebar-block">
//                 <nav id="sidebar" className="sidebar-wrapper toggled">
//                   <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
//                     <div className="create-meeting mt-3 p-3">
//                       <button className="meeting-cancel" onClick={handleCancel}>
//                         <span className="mdi mdi-arrow-left-thick"></span>Cancel
//                       </button>
//                       <h4 className="mt-3">Edit Meeting</h4>
//                     </div>
//                     <hr />
//                     <div className="d-flex flex-column meeting-detail p-4">
//                       <label>Meeting name</label>
//                       <input
//                         type="text"
//                         className="form-control mb-3"
//                         placeholder="Name your meeting"
//                         value={meetingName}
//                         onChange={(e) => {
//                           setLocalMeetingName(e.target.value);
//                           setMeetingName(e.target.value); // Update the meeting name in the main component
//                         }}
//                       />

//                       <label>Duration</label>
//                       <select
//                         id="duration"
//                         className="custom-select"
//                         value={selectedDuration}
//                         onChange={handleDurationChange}
//                       >
//                         <option value="15">15 min</option>
//                         <option value="30">30 min</option>
//                         <option value="45">45 min</option>
//                         <option value="60">60 min</option>
//                         <option value="Custom">Custom</option>
//                       </select>
//                       <br />

//                       <label>Location</label>
//                       <select
//                         id="location"
//                         className="custom-select"
//                         value={meetingLocation}
//                         onChange={(e) => {
//                           setLocalMeetingLocation(e.target.value);
//                           setMeetingLocation(e.target.value); // Update the meeting location in the main component
//                         }}
//                       >
//                         <option value="googlemeet">Google Meet</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="meeting-controller d-flex justify-content-end me-4">
//                     <button className="meeting-cancel" onClick={handleCancel}>
//                       Cancel
//                     </button>
//                     <button className="btn btn-primary" onClick={handleContinue}>
//                       Save and close
//                     </button>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </div>

//           <div className="col-9 d-flex align-items-center bg-soft-secondary">
//             <div className="container create-preview">
//               <div className='row d-flex'>
//                 <p>
//                   This is a preview. To book an event, share the link with your invitees.
//                 </p>
//                 <div className="col-6 d-flex flex-column p-4">
//                   <label>MEET PATEL</label>
//                   <h3>{meetingDetails.name}</h3>
//                   <label><span className="mdi mdi-clock-time-five-outline"></span>{meetingDetails.duration} min</label>
//                   <label><span className="mdi mdi-map-marker"></span>{meetingDetails.location}</label>
//                 </div>
//                 <div className="col-6 d-flex align-items-center justify-content-center h-550 preview-right">
//                   <h5 className='text-center'>A preview of your availability will show on the next step</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>

//   );
// };

// export default Demo;