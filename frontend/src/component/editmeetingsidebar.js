// // import React, { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { setMeetingDetails } from './actions/meetingActions';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const EditMeetingsidebar = ({ initialMeetingName, initialSelectedDuration, initialMeetingLocation, setMeetingName, setSelectedDuration, setMeetingLocation, meetingId }) => {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const location = useLocation();

// //     const currentMeeting = useSelector(state => state.meetings.currentMeeting);

// //     const [meetingName, setLocalMeetingName] = useState(initialMeetingName || "");
// //     const [selectedDuration, setLocalSelectedDuration] = useState(initialSelectedDuration || "15");
// //     const [meetingLocation, setLocalMeetingLocation] = useState(initialMeetingLocation || "googlemeet");
// //     const [showCustomDuration, setShowCustomDuration] = useState(false);
// //     const [customDuration, setCustomDuration] = useState("");
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         if (currentMeeting) {
// //             setLocalMeetingName(currentMeeting.name || "");
// //             setLocalSelectedDuration(currentMeeting.duration || "15");
// //             setLocalMeetingLocation(currentMeeting.location || "googlemeet");
// //         } else {
// //             fetchMeetingDetails();
// //         }
// //     }, [currentMeeting]);

// //     const fetchMeetingDetails = async () => {
// //         try {
// //             const userToken = sessionStorage.getItem("userToken");

// //             if (!userToken) {
// //                 throw new Error("Token not found");
// //             }

// //             const response = await fetch(
// //                 `http://localhost:8000/meetingSettings/${meetingId}`,
// //                 {
// //                     method: "GET",
// //                     headers: {
// //                         Authorization: userToken,
// //                     },
// //                 }
// //             );

// //             if (!response.ok) {
// //                 throw new Error("Failed to fetch meeting details");
// //             }

// //             const meetingDetailsData = await response.json();
// //             dispatch(setMeetingDetails(meetingDetailsData));

// //             setLocalMeetingName(meetingDetailsData.name || "");
// //             setLocalSelectedDuration(meetingDetailsData.duration || "15");
// //             setLocalMeetingLocation(meetingDetailsData.location || "googlemeet");
// //         } catch (error) {
// //             console.error("Error fetching meeting details:", error);
// //         }
// //     };

// //     const handleDurationChange = (event) => {
// //         const duration = event.target.value;
// //         if (duration === "Custom") {
// //             setShowCustomDuration(true);
// //         } else {
// //             setShowCustomDuration(false);
// //             setLocalSelectedDuration(duration);
// //             setSelectedDuration(duration);
// //         }
// //     };

// //     const handleCustomDurationChange = (event) => {
// //         const duration = event.target.value;
// //         if (duration && !Number(duration)) {
// //             setError("Please enter a valid number for duration.");
// //         } else if (Number(duration) > 300) {
// //             setError("Maximum time limit is 300 minutes.");
// //         } else {
// //             setError(null);
// //             setCustomDuration(duration);
// //             setSelectedDuration(duration);
// //         }
// //     };

// //     const handleContinue = async () => {
// //         try {
// //             const userToken = sessionStorage.getItem("userToken");

// //             if (!userToken) {
// //                 throw new Error("Token not found");
// //             }

// //             const meetingData = {
// //                 userId: meetingId,
// //                 scheduleId: null,
// //                 name: meetingName,
// //                 duration: showCustomDuration ? customDuration : selectedDuration,
// //                 location: "google_meet",
// //                 link: null,
// //             };

// //             const response = await fetch(
// //                 `http://localhost:8000/meetingSettings/${meetingId}`,
// //                 {
// //                     method: "PATCH",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                         Authorization: userToken,
// //                     },
// //                     body: JSON.stringify(meetingData),
// //                 }
// //             );

// //             if (response.status === 200) {
// //                 const data = await response.json();
// //                 dispatch(setMeetingDetails(data));
// //                 navigate(`/meetingsetting?id=${meetingId}`);
// //                 toast.success('Meeting updated successfully.', { position: 'top-center', autoClose: 1000 });
// //             } else {
// //                 console.error("Failed to update meeting:", response.data.error);
// //             }
// //         } catch (error) {
// //             console.error("Error updating meeting:", error);
// //         }
// //     };

// //     const handleCancel = () => {
// //         navigate(`/meetingsetting?id=${meetingId}`);
// //     };

// //     return (
// //         <>
// //             {error && <div>Error: {error}</div>}
// //             <div className="sidebar-block">
// //                 <nav id="sidebar" className="sidebar-wrapper toggled">
// //                     <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
// //                         <div className="create-meeting mt-3 p-3">
// //                             <button className="meeting-cancel" onClick={handleCancel}>
// //                                 <span className="mdi mdi-arrow-left-thick"></span>Cancel
// //                             </button>
// //                             <h4 className="mt-3">Edit Meeting</h4>
// //                         </div>
// //                         <hr />
// //                         <div className="d-flex flex-column meeting-detail p-4">
// //                             <label>Meeting name</label>
// //                             <input
// //                                 type="text"
// //                                 className="form-control mb-3"
// //                                 placeholder="Name your meeting"
// //                                 value={meetingName}
// //                                 onChange={(e) => {
// //                                     setLocalMeetingName(e.target.value);
// //                                     setMeetingName(e.target.value); // Update the meeting name in the main component
// //                                 }}
// //                             />

// //                             <label>Duration</label>
// //                             <select
// //                                 id="duration"
// //                                 className="custom-select"
// //                                 value={selectedDuration}
// //                                 onChange={handleDurationChange}
// //                             >
// //                                 <option value="15">15 min</option>
// //                                 <option value="30">30 min</option>
// //                                 <option value="45">45 min</option>
// //                                 <option value="60">60 min</option>
// //                                 <option value="Custom">Custom</option>
// //                             </select>
// //                             <br />

// //                             {showCustomDuration && (
// //                                 <div>
// //                                     <label>Custom Duration</label>
// //                                     <input
// //                                         type="textbox"
// //                                         className="form-control mb-3"
// //                                         placeholder="Enter custom duration"
// //                                         value={customDuration}
// //                                         onChange={handleCustomDurationChange}
// //                                     />
// //                                     {error && <div className="text-danger">{error}</div>}
// //                                 </div>
// //                             )}

// //                             <label>Location</label>
// //                             <select
// //                                 id="location"
// //                                 className="custom-select"
// //                                 value={meetingLocation}
// //                                 onChange={(e) => {
// //                                     setLocalMeetingLocation(e.target.value);
// //                                     setMeetingLocation(e.target.value); // Update the meeting location in the main component
// //                                 }}
// //                             >
// //                                 <option value="googlemeet">Google Meet</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                     <div className="meeting-controller d-flex justify-content-end me-4">
// //                         <button className="meeting-cancel" onClick={handleCancel}>
// //                             Cancel
// //                         </button>
// //                         <button className="btn btn-primary" onClick={handleContinue}>
// //                             Save and close
// //                         </button>
// //                     </div>
// //                 </nav>
// //             </div>
// //         </>
// //     );
// // };

// // export default EditMeetingsidebar;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from "react-router-dom";
// import { setMeetingDetails } from './actions/meetingActions';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const EditMeetingsidebar = ({ initialMeetingName, initialSelectedDuration, initialMeetingLocation, setMeetingName, setSelectedDuration, setMeetingLocation, meetingId }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const currentMeeting = useSelector(state => state.meetings.currentMeeting);

//     const [meetingName, setLocalMeetingName] = useState(initialMeetingName || "");
//     const [selectedDuration, setLocalSelectedDuration] = useState(initialSelectedDuration || "15");
//     const [meetingLocation, setLocalMeetingLocation] = useState(initialMeetingLocation || "googlemeet");
//     const [showCustomDuration, setShowCustomDuration] = useState(false);
//     const [customDuration, setCustomDuration] = useState("");
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (currentMeeting) {
//             setLocalMeetingName(currentMeeting.name || "");
//             setLocalSelectedDuration(currentMeeting.duration || "15");
//             setLocalMeetingLocation(currentMeeting.location || "googlemeet");
//         } else {
//             fetchMeetingDetails();
//         }
//     }, [currentMeeting]);

//     const fetchMeetingDetails = async () => {
//         try {
//             const userToken = sessionStorage.getItem("userToken");

//             if (!userToken) {
//                 throw new Error("Token not found");
//             }

//             const response = await fetch(
//                 `http://localhost:8000/meetingSettings/${meetingId}`,
//                 {
//                     method: "GET",
//                     headers: {
//                         Authorization: userToken,
//                     },
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to fetch meeting details");
//             }

//             const meetingDetailsData = await response.json();
//             dispatch(setMeetingDetails(meetingDetailsData));

//             setLocalMeetingName(meetingDetailsData.name || "");
//             setLocalSelectedDuration(meetingDetailsData.duration || "15");
//             setLocalMeetingLocation(meetingDetailsData.location || "googlemeet");
//         } catch (error) {
//             console.error("Error fetching meeting details:", error);
//         }
//     };

//     const handleDurationChange = (event) => {
//         const duration = event.target.value;
//         if (duration === "Custom") {
//             setShowCustomDuration(true);
//         } else {
//             setShowCustomDuration(false);
//             setLocalSelectedDuration(duration);
//             setSelectedDuration(duration);
//         }
//     };

//     const handleCustomDurationChange = (event) => {
//         const duration = event.target.value;
//         if (duration && !Number(duration)) {
//             setError("Please enter a valid number for duration.");
//         } else if (Number(duration) > 300) {
//             setError("Maximum time limit is 300 minutes.");
//         } else {
//             setError(null);
//             setCustomDuration(duration);
//             setSelectedDuration(duration);
//         }
//     };

// const handleContinue = async () => {
//     try {
//         const userToken = sessionStorage.getItem("userToken");

//         if (!userToken) {
//             throw new Error("Token not found");
//         }

//         const meetingData = {
//             userId: meetingId,
//             scheduleId: null,
//             name: meetingName,
//             duration: showCustomDuration ? customDuration : selectedDuration,
//             location: "google_meet",
//             link: null,
//         };

//         const response = await fetch(
//             `http://localhost:8000/meetingSettings/${meetingId}`,
//             {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: userToken,
//                 },
//                 body: JSON.stringify(meetingData),
//             }
//         );

//         if (response.status === 200) {
//             const data = await response.json();
//             dispatch(setMeetingDetails(data));
//             navigate(`/meetingsetting?id=${meetingId}&message=Meeting%20updated%20successfully.`);
//         } else {
//             console.error("Failed to update meeting:", response.data.error);
//             toast.error('Failed to update meeting. Please try again later.', { position: 'top-center', autoClose: 1000 });
//         }
//     } catch (error) {
//         console.error("Error updating meeting:", error);
//         toast.error('Error updating meeting. Please try again later.', { position: 'top-center', autoClose: 1000 });
//     }
// };

//     const handleCancel = () => {
//         navigate(`/meetingsetting?id=${meetingId}`);
//     };

//     return (
//         <>
//             <ToastContainer />
//             {error && <div>Error: {error}</div>}
//             <div className="sidebar-block">
//                 <nav id="sidebar" className="sidebar-wrapper toggled">
//                     <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
//                         <div className="create-meeting mt-3 p-3">
//                             <button className="meeting-cancel" onClick={handleCancel}>
//                                 <span className="mdi mdi-arrow-left-thick"></span>Cancel
//                             </button>
//                             <h4 className="mt-3">Edit Meeting</h4>
//                         </div>
//                         <hr />
//                         <div className="d-flex flex-column meeting-detail p-4">
//                             <label>Meeting name</label>
//                             <input
//                                 type="text"
//                                 className="form-control mb-3"
//                                 placeholder="Name your meeting"
//                                 value={meetingName}
//                                 onChange={(e) => {
//                                     setLocalMeetingName(e.target.value);
//                                     setMeetingName(e.target.value); // Update the meeting name in the main component
//                                 }}
//                             />

//                             <label>Duration</label>
//                             <select
//                                 id="duration"
//                                 className="custom-select"
//                                 value={selectedDuration}
//                                 onChange={handleDurationChange}
//                             >
//                                 <option value="15">15 min</option>
//                                 <option value="30">30 min</option>
//                                 <option value="45">45 min</option>
//                                 <option value="60">60 min</option>
//                                 <option value="Custom">Custom</option>
//                             </select>
//                             <br />

//                             {showCustomDuration && (
//                                 <div>
//                                     <label>Custom Duration</label>
//                                     <input
//                                         type="textbox"
//                                         className="form-control mb-3"
//                                         placeholder="Enter custom duration"
//                                         value={customDuration}
//                                         onChange={handleCustomDurationChange}
//                                     />
//                                     {error && <div className="text-danger">{error}</div>}
//                                 </div>
//                             )}

//                             <label>Location</label>
//                             <select
//                                 id="location"
//                                 className="custom-select"
//                                 value={meetingLocation}
//                                 onChange={(e) => {
//                                     setLocalMeetingLocation(e.target.value);
//                                     setMeetingLocation(e.target.value); // Update the meeting location in the main component
//                                 }}
//                             >
//                                 <option value="googlemeet">Google Meet</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="meeting-controller d-flex justify-content-end me-4">
//                         <button className="meeting-cancel" onClick={handleCancel}>
//                             Cancel
//                         </button>
//                         <button className="btn btn-primary" onClick={handleContinue}>
//                             Save and close
//                         </button>
//                     </div>
//                 </nav>
//             </div>
//         </>
//     );
// };

// export default EditMeetingsidebar;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setMeetingDetails } from './actions/meetingActions';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const EditMeetingsidebar = ({ initialMeetingName, initialSelectedDuration, initialMeetingLocation, setMeetingName, setSelectedDuration, setMeetingLocation, meetingId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();

    const currentMeeting = useSelector(state => state.meetings.currentMeeting);

    const [meetingName, setLocalMeetingName] = useState(initialMeetingName || "");
    const [selectedDuration, setLocalSelectedDuration] = useState(initialSelectedDuration || "15");
    const [meetingLocation, setLocalMeetingLocation] = useState(initialMeetingLocation || "googlemeet");
    const [showCustomDuration, setShowCustomDuration] = useState(false);
    const [customDuration, setCustomDuration] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentMeeting) {
            setLocalMeetingName(currentMeeting.name || "");
            setLocalSelectedDuration(currentMeeting.duration || "15");
            setLocalMeetingLocation(currentMeeting.location || "googlemeet");
        } else {
            fetchMeetingDetails();
        }
    }, [currentMeeting]);

    const fetchMeetingDetails = async () => {
        try {
            const userToken = sessionStorage.getItem("userToken");

            if (!userToken) {
                throw new Error("Token not found");
            }

            const response = await fetch(
                `http://localhost:8000/meetingSettings/${meetingId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: userToken,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch meeting details");
            }

            const meetingDetailsData = await response.json();
            dispatch(setMeetingDetails(meetingDetailsData));

            setLocalMeetingName(meetingDetailsData.name || "");
            setLocalSelectedDuration(meetingDetailsData.duration || "15");
            setLocalMeetingLocation(meetingDetailsData.location || "googlemeet");
        } catch (error) {
            console.error("Error fetching meeting details:", error);
        }
    };

    const handleDurationChange = (event) => {
        const duration = event.target.value;
        if (duration === "Custom") {
            setShowCustomDuration(true);
        } else {
            setShowCustomDuration(false);
            setLocalSelectedDuration(duration);
            setSelectedDuration(duration);
        }
    };

    const handleCustomDurationChange = (event) => {
        const duration = event.target.value;
        if (duration && !Number(duration)) {
            setError("Please enter a valid number for duration.");
        } else if (Number(duration) > 300) {
            setError("Maximum time limit is 300 minutes.");
        } else {
            setError(null);
            setCustomDuration(duration);
            setSelectedDuration(duration);
        }
    };

    const handleContinue = async () => {
        try {
            const userToken = sessionStorage.getItem("userToken");

            if (!userToken) {
                throw new Error("Token not found");
            }

            const meetingData = {
                userId: meetingId,
                scheduleId: null,
                name: meetingName,
                duration: showCustomDuration ? customDuration : selectedDuration,
                location: "google_meet",
                link: null,
            };

            const response = await fetch(
                `http://localhost:8000/meetingSettings/${meetingId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: userToken,
                    },
                    body: JSON.stringify(meetingData),
                }
            );

            if (response.status === 200) {
                const data = await response.json();
                dispatch(setMeetingDetails(data));
                navigate(`/meetingsetting?id=${meetingId}`);
            } else {
                console.error("Failed to update meeting:", response.data.error);
                // toast.error('Failed to update meeting. Please try again later.', { position: 'top-center', autoClose: 1000 });
            }
        } catch (error) {
            console.error("Error updating meeting:", error);
            // toast.error('Error updating meeting. Please try again later.', { position: 'top-center', autoClose: 1000 });
        }
    };

    const handleCancel = () => {
        navigate(`/meetingsetting?id=${meetingId}`);
    };

    return (
        <>
            {error && <div>Error: {error}</div>}
            <div className="sidebar-block">
                <nav id="sidebar" className="sidebar-wrapper toggled">
                    <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
                        <div className="create-meeting mt-3 p-3">
                            <button className="meeting-cancel" onClick={handleCancel}>
                                <span className="mdi mdi-arrow-left-thick"></span>Cancel
                            </button>
                            <h4 className="mt-3">Edit Meeting</h4>
                        </div>
                        <hr />
                        <div className="d-flex flex-column meeting-detail p-4">
                            <label>Meeting name</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Name your meeting"
                                value={meetingName}
                                onChange={(e) => {
                                    setLocalMeetingName(e.target.value);
                                    setMeetingName(e.target.value);
                                }}
                            />

                            <label>Duration</label>
                            <select
                                id="duration"
                                className="custom-select"
                                value={selectedDuration}
                                onChange={handleDurationChange}
                            >
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="45">45 min</option>
                                <option value="60">60 min</option>
                                <option value="Custom">Custom</option>
                            </select>
                            <br />

                            {showCustomDuration && (
                                <div>
                                    <label>Custom Duration</label>
                                    <input
                                        type="textbox"
                                        className="form-control mb-3"
                                        placeholder="Enter custom duration"
                                        value={customDuration}
                                        onChange={handleCustomDurationChange}
                                    />
                                    {error && <div className="text-danger">{error}</div>}
                                </div>
                            )}

                            <label>Location</label>
                            <select
                                id="location"
                                className="custom-select"
                                value={meetingLocation}
                                onChange={(e) => {
                                    setLocalMeetingLocation(e.target.value);
                                    setMeetingLocation(e.target.value); // Update the meeting location in the main component
                                }}
                            >
                                <option value="googlemeet">Google Meet</option>
                            </select>
                        </div>
                    </div>
                    <div className="meeting-controller d-flex justify-content-end me-4">
                        <button className="meeting-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleContinue}>
                            Save and close
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default EditMeetingsidebar;