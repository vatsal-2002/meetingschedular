// // import Schedulesettingsidebar from './schedulesettingsidebar';
// // import React, { useState } from 'react';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';

// // const Schedulesetting = () => {
// //   const [date, setDate] = useState(new Date());

// //   const onChange = (newDate) => {
// //     setDate(newDate);
// //   };

// //   const today = new Date();
// //   const [selectedDate, setSelectedDate] = useState(today);
// //   const [timezone] = useState([
// //     {
// //       userId: 32,
// //       id: 11,
// //       name: "Default",
// //       isDefault: 1,
// //       timezone: "Asia/Gaza",
// //       weeklyhours: [
// //         {
// //           day: 1,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //             {
// //               end: {
// //                 hour: "16",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "14",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 2,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 3,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 4,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 5,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "17",
// //                 minute: "30",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },

// //       ],
// //     },
// //     // Add more timezone data if needed
// //   ]);

// //   const timeDuration = 30; // Set the time duration in minutes

// //   const getWeeklyHoursForSelectedDay = () => {
// //     const selectedDay = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
// //     const selectedTimeZone = timezone.find(
// //       (tz) => tz.weeklyhours && tz.weeklyhours.some((day) => day.day === selectedDay)
// //     );

// //     if (selectedTimeZone) {
// //       const selectedDayData = selectedTimeZone.weeklyhours.find((day) => day.day === selectedDay);
// //       if (selectedDayData) {
// //         const slots = selectedDayData.slots || [];
// //         return slots.map((slot) => {
// //           const startTime = new Date(selectedDate);
// //           startTime.setHours(parseInt(slot.start.hour), parseInt(slot.start.minute), 0);

// //           const endTime = new Date(selectedDate);
// //           endTime.setHours(parseInt(slot.end.hour), parseInt(slot.end.minute), 0);

// //           const timeSlots = [];
// //           let currentSlot = new Date(startTime);

// //           while (currentSlot < endTime) {
// //             timeSlots.push({
// //               start: {
// //                 hour: currentSlot.getHours().toString().padStart(2, '0'),
// //                 minute: currentSlot.getMinutes().toString().padStart(2, '0'),
// //               },
// //               end: {
// //                 hour: currentSlot.getHours().toString().padStart(2, '0'),
// //                 minute: '00',
// //               },
// //             });

// //             currentSlot.setMinutes(currentSlot.getMinutes() + timeDuration);
// //           }

// //           return timeSlots;
// //         }).flat(); // Flatten the array of arrays
// //       }
// //     }

// //     return [];
// //   };

// //   const handleDateChange = (date) => {
// //     setSelectedDate(date);
// //   };

// //   const tileContent = ({ date, view }) => {
// //     const currentDate = new Date();
// //     const isAfterToday = date >= currentDate;

// //     const day = date.getDay();
// //     const hasData =
// //       timezone &&
// //       timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

// //     return hasData && isAfterToday && view === 'month' ? <div className="blue-dot"></div> : null;
// //   };

// //   const handleTileClick = ({ date, view }) => {
// //     if (!date) {
// //       return false; // Handle the case where date is undefined
// //     }

// //     const day = date.getDay();
// //     const hasData =
// //       timezone &&
// //       timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

// //     if (!hasData || view !== 'month') {
// //       return false; // Disable click for days without data or outside the month view
// //     }

// //     // Your logic for handling the click on valid days
// //     setSelectedDate(date);
// //     // Additional logic if needed

// //     return true; // Enable click for days with data in the month view
// //   };


// //   return (
// //     <>
// //       <style>
// //         {`
// //           .blue-dot {
// //             width: 10px;
// //             height: 10px;
// //             background-color: blue;
// //             border-radius: 50%;
// //             margin: 0 auto;
// //             margin-top: 3px;
// //           }

// //           .disabled-dot {
// //             width: 10px;
// //             height: 10px;
// //             background-color: lightgray;
// //             border-radius: 50%;
// //             margin: 0 auto;
// //             margin-top: 3px;
// //           }
// //         `}
// //       </style>
// //       <div className="container-fuild">
// //         <row className="d-flex">
// //           <div className="col-3">
// //             <div className="page-wrapper toggled">
// //               <Schedulesettingsidebar />
// //             </div>
// //           </div>

// //           <div className="col-9 d-flex align-items-center bg-soft-secondary">
// //             <div className="container create-preview">
// //               <div className="row d-flex">
// //                 <p>
// //                   This is a preview. To book an event, share the link with your
// //                   invitees.
// //                   <label>View live page</label>
// //                 </p>

// //                 <div className="col-5 d-flex flex-column p-4">
// //                   <label>VATSAL PRAJAPATI</label>
// //                   <h3>Event name here</h3>
// //                   <label>
// //                     <span className="mdi mdi-clock-time-five-outline"></span>
// //                     30 min
// //                   </label>
// //                   <label>
// //                     <span className="mdi mdi-map-marker"></span>Add a location
// //                     for it to show here
// //                   </label>
// //                 </div>
// //                 <div className="col-7 d-flex align-items-center justify-content-center h-550 preview-right">
// //                   <div>
// //                     <h4>Select Date & Times</h4>
// //                     <div className="d-flex">
// //                       <div>
// //                         <Calendar
// //                           onChange={handleDateChange}
// //                           value={selectedDate}
// //                           minDate={today} // Disable selection of dates before today
// //                           tileContent={tileContent}
// //                           onClickDay={handleTileClick} // Handle day click
// //                         />
// //                       </div>
// //                       <div>
// //                         <div className="days-slots d-flex flex-column">
// //                           {getWeeklyHoursForSelectedDay()
// //                             .sort((a, b) => {
// //                               // Convert start times to numbers for comparison
// //                               const timeA = parseInt(
// //                                 `${a.start.hour}${a.start.minute}`,
// //                                 10
// //                               );
// //                               const timeB = parseInt(
// //                                 `${b.start.hour}${b.start.minute}`,
// //                                 10
// //                               );
// //                               return timeA - timeB;
// //                             })
// //                             .map((slot, index) => (
// //                               <button
// //                                 key={index}
// //                               >{`${slot.start.hour}:${slot.start.minute}`}</button>
// //                             ))}
// //                         </div>
// //                       </div>

// //                       {/* <h2>Weekly Hours for Selected Day:</h2>
// //         <pre>{JSON.stringify(getWeeklyHoursForSelectedDay(), null, 2)}</pre> */}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </row>
// //       </div>
// //     </>
// //   );

// // }

// // export default Schedulesetting

// // import React, { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useLocation } from "react-router-dom";
// // import Schedulesettingsidebar from './schedulesettingsidebar';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import { fetchMeetingDetails } from './actions/meetingActions';

// // const Schedulesetting = () => {
// //   const dispatch = useDispatch();
// //   const location = useLocation();
// //   const [meetingDetails, setMeetingDetails] = useState(null);
// //   const [date, setDate] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());

// //   const meetingId = new URLSearchParams(location.search).get('id');
// //   const currentMeeting = useSelector(state => state.meetings.currentMeeting);

// //   useEffect(() => {
// //     const fetchMeeting = async () => {
// //       try {
// //         const userToken = sessionStorage.getItem("userToken");
// //         const response = await fetch(
// //           `http://localhost:8000/meetingSettings/${meetingId}`,
// //           {
// //             method: "GET",
// //             headers: {
// //               Authorization: `${userToken}`,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           throw new Error("Failed to fetch meeting details");
// //         }

// //         const meetingData = await response.json();
// //         setMeetingDetails(meetingData);
// //         // Dispatch action to fetch meeting details
// //         dispatch(fetchMeetingDetails(meetingId));
// //       } catch (error) {
// //         console.error("Error fetching meeting details:", error.message);
// //       }
// //     };

// //     if (meetingId) {
// //       fetchMeeting();
// //     }
// //   }, [meetingId, dispatch]);

// //   const [timezone] = useState([
// //     {
// //       userId: 32,
// //       id: 11,
// //       name: "Default",
// //       isDefault: 1,
// //       timezone: "Asia/Gaza",
// //       weeklyhours: [
// //         {
// //           day: 1,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //             {
// //               end: {
// //                 hour: "16",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "14",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 2,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 3,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 4,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "18",
// //                 minute: "00",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //         {
// //           day: 5,
// //           slots: [
// //             {
// //               end: {
// //                 hour: "17",
// //                 minute: "30",
// //               },
// //               start: {
// //                 hour: "17",
// //                 minute: "00",
// //               },
// //             },
// //           ],
// //         },
// //       ],
// //     },
// //   ]);

// //   const timeDuration = 30; // Set the time duration in minutes

// //   useEffect(() => {
// //     // Fetch meeting details based on meetingId from Redux store or API
// //     // For example:
// //     if (currentMeeting) {
// //       setMeetingDetails(currentMeeting);
// //     }
// //   }, [currentMeeting]);

// //   const getWeeklyHoursForSelectedDay = () => {
// //     const selectedDay = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
// //     const selectedTimeZone = timezone.find(
// //       (tz) => tz.weeklyhours && tz.weeklyhours.some((day) => day.day === selectedDay)
// //     );

// //     if (selectedTimeZone) {
// //       const selectedDayData = selectedTimeZone.weeklyhours.find((day) => day.day === selectedDay);
// //       if (selectedDayData) {
// //         const slots = selectedDayData.slots || [];
// //         return slots.map((slot) => {
// //           const startTime = new Date(selectedDate);
// //           startTime.setHours(parseInt(slot.start.hour), parseInt(slot.start.minute), 0);

// //           const endTime = new Date(selectedDate);
// //           endTime.setHours(parseInt(slot.end.hour), parseInt(slot.end.minute), 0);

// //           const timeSlots = [];
// //           let currentSlot = new Date(startTime);

// //           while (currentSlot < endTime) {
// //             timeSlots.push({
// //               start: {
// //                 hour: currentSlot.getHours().toString().padStart(2, '0'),
// //                 minute: currentSlot.getMinutes().toString().padStart(2, '0'),
// //               },
// //               end: {
// //                 hour: currentSlot.getHours().toString().padStart(2, '0'),
// //                 minute: '00',
// //               },
// //             });

// //             currentSlot.setMinutes(currentSlot.getMinutes() + timeDuration);
// //           }

// //           return timeSlots;
// //         }).flat(); // Flatten the array of arrays
// //       }
// //     }

// //     return [];
// //   };

// //   const handleDateChange = (date) => {
// //     setSelectedDate(date);
// //   };

// //   const tileContent = ({ date, view }) => {
// //     const currentDate = new Date();
// //     const isAfterToday = date >= currentDate;

// //     const day = date.getDay();
// //     const hasData =
// //       timezone &&
// //       timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

// //     return hasData && isAfterToday && view === 'month' ? <div className="blue-dot"></div> : null;
// //   };

// //   const handleTileClick = ({ date, view }) => {
// //     if (!date) {
// //       return false; // Handle the case where date is undefined
// //     }

// //     const day = date.getDay();
// //     const hasData =
// //       timezone &&
// //       timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

// //     if (!hasData || view !== 'month') {
// //       return false; // Disable click for days without data or outside the month view
// //     }

// //     // Your logic for handling the click on valid days
// //     setSelectedDate(date);
// //     // Additional logic if needed

// //     return true; // Enable click for days with data in the month view
// //   };

// //   return (
// //     <>
// //       <style>
// //         {`
// //           .blue-dot {
// //             width: 10px;
// //             height: 10px;
// //             background-color: blue;
// //             border-radius: 50%;
// //             margin: 0 auto;
// //             margin-top: 3px;
// //           }

// //           .disabled-dot {
// //             width: 10px;
// //             height: 10px;
// //             background-color: lightgray;
// //             border-radius: 50%;
// //             margin: 0 auto;
// //             margin-top: 3px;
// //           }
// //         `}
// //       </style>
// //       <div className="container-fuild">
// //         <div className="row d-flex">
// //           <div className="col-3">
// //             <div className="page-wrapper toggled">
// //               <Schedulesettingsidebar meetingDetails={meetingDetails} />
// //             </div>
// //           </div>

// //           <div className="col-9 d-flex align-items-center bg-soft-secondary">
// //             <div className="container create-preview">
// //               <div className="row d-flex">
// //                 <p>
// //                   This is a preview. To book an event, share the link with your
// //                   invitees.
// //                   <label>View live page</label>
// //                 </p>

// //                 <div className="col-5 d-flex flex-column p-4">
// //                   <label>VATSAL PRAJAPATI</label>
// //                   <h3>{meetingDetails ? meetingDetails.name : "Event name here"}</h3>
// //                   <label>
// //                     <span className="mdi mdi-clock-time-five-outline"></span>
// //                     {meetingDetails ? meetingDetails.duration + " min" : "30 min"}
// //                   </label>
// //                   <label>
// //                     <span className="mdi mdi-map-marker"></span>
// //                     {meetingDetails ? meetingDetails.location : "Add a location for it to show here"}
// //                   </label>
// //                 </div>
// //                 <div className="col-7 d-flex align-items-center justify-content-center h-550 preview-right">
// //                   <div>
// //                     <h4>Select Date & Times</h4>
// //                     <div className="d-flex">
// //                       <div>
// //                         <Calendar
// //                           onChange={handleDateChange}
// //                           value={selectedDate}
// //                           minDate={new Date()} // Disable selection of dates before today
// //                           tileContent={tileContent}
// //                           onClickDay={handleTileClick} // Handle day click
// //                         />
// //                       </div>
// //                       <div>
// //                         <div className="days-slots d-flex flex-column">
// //                           {getWeeklyHoursForSelectedDay()
// //                             .sort((a, b) => {
// //                               // Convert start times to numbers for comparison
// //                               const timeA = parseInt(
// //                                 `${a.start.hour}${a.start.minute}`,
// //                                 10
// //                               );
// //                               const timeB = parseInt(
// //                                 `${b.start.hour}${b.start.minute}`,
// //                                 10
// //                               );
// //                               return timeA - timeB;
// //                             })
// //                             .map((slot, index) => (
// //                               <button
// //                                 key={index}
// //                               >{`${slot.start.hour}:${slot.start.minute}`}</button>
// //                             ))}
// //                         </div>
// //                       </div>

// //                       {/* <h2>Weekly Hours for Selected Day:</h2>
// //         <pre>{JSON.stringify(getWeeklyHoursForSelectedDay(), null, 2)}</pre> */}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Schedulesetting;


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from "react-router-dom";
// import Schedulesettingsidebar from './schedulesettingsidebar';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { fetchMeetingDetails } from './actions/meetingActions';

// const Schedulesetting = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [meetingDetails, setMeetingDetails] = useState(null);
//   const [date, setDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [userFullName, setUserFullName] = useState('');

//   const meetingId = new URLSearchParams(location.search).get('id');
//   const currentMeeting = useSelector(state => state.meetings.currentMeeting);

//   useEffect(() => {
//     const fetchMeeting = async () => {
//       try {
//         const userToken = sessionStorage.getItem("userToken");
//         const response = await fetch(
//           `http://localhost:8000/meetingSettings/${meetingId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `${userToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch meeting details");
//         }

//         const meetingData = await response.json();
//         setMeetingDetails(meetingData);
//         dispatch(fetchMeetingDetails(meetingId));
//       } catch (error) {
//         console.error("Error fetching meeting details:", error.message);
//       }
//     };

//     if (meetingId) {
//       fetchMeeting();
//     }
//   }, [meetingId, dispatch]);

//   useEffect(() => {
//     const userToken = sessionStorage.getItem("userToken");
//     const decodedToken = decodeToken(userToken);
//     const userId = decodedToken.id;
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/users/${userId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `${userToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user details");
//         }

//         const userData = await response.json();
//         setUserFullName(`${userData.firstname} ${userData.lastname}`);
//       } catch (error) {
//         console.error("Error fetching user details:", error.message);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const decodeToken = (token) => {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
//   };

//   const [timezone] = useState([
//     {
//       userId: 32,
//       id: 11,
//       name: "Default",
//       isDefault: 1,
//       timezone: "Asia/Gaza",
//       weeklyhours: [
//         {
//           day: 1,
//           slots: [
//             {
//               end: {
//                 hour: "18",
//                 minute: "00",
//               },
//               start: {
//                 hour: "17",
//                 minute: "00",
//               },
//             },
//             {
//               end: {
//                 hour: "16",
//                 minute: "00",
//               },
//               start: {
//                 hour: "14",
//                 minute: "00",
//               },
//             },
//           ],
//         },
//         {
//           day: 2,
//           slots: [
//             {
//               end: {
//                 hour: "18",
//                 minute: "00",
//               },
//               start: {
//                 hour: "17",
//                 minute: "00",
//               },
//             },
//           ],
//         },
//         {
//           day: 3,
//           slots: [
//             {
//               end: {
//                 hour: "18",
//                 minute: "00",
//               },
//               start: {
//                 hour: "17",
//                 minute: "00",
//               },
//             },
//           ],
//         },
//         {
//           day: 4,
//           slots: [
//             {
//               end: {
//                 hour: "18",
//                 minute: "00",
//               },
//               start: {
//                 hour: "17",
//                 minute: "00",
//               },
//             },
//           ],
//         },
//         {
//           day: 5,
//           slots: [
//             {
//               end: {
//                 hour: "17",
//                 minute: "30",
//               },
//               start: {
//                 hour: "17",
//                 minute: "00",
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   const timeDuration = 30;

//   useEffect(() => {
//     if (currentMeeting) {
//       setMeetingDetails(currentMeeting);
//     }
//   }, [currentMeeting]);

//   const getWeeklyHoursForSelectedDay = () => {
//     const selectedDay = selectedDate.getDay();
//     const selectedTimeZone = timezone.find(
//       (tz) => tz.weeklyhours && tz.weeklyhours.some((day) => day.day === selectedDay)
//     );

//     if (selectedTimeZone) {
//       const selectedDayData = selectedTimeZone.weeklyhours.find((day) => day.day === selectedDay);
//       if (selectedDayData) {
//         const slots = selectedDayData.slots || [];
//         return slots.map((slot) => {
//           const startTime = new Date(selectedDate);
//           startTime.setHours(parseInt(slot.start.hour), parseInt(slot.start.minute), 0);

//           const endTime = new Date(selectedDate);
//           endTime.setHours(parseInt(slot.end.hour), parseInt(slot.end.minute), 0);

//           const timeSlots = [];
//           let currentSlot = new Date(startTime);

//           while (currentSlot < endTime) {
//             timeSlots.push({
//               start: {
//                 hour: currentSlot.getHours().toString().padStart(2, '0'),
//                 minute: currentSlot.getMinutes().toString().padStart(2, '0'),
//               },
//               end: {
//                 hour: currentSlot.getHours().toString().padStart(2, '0'),
//                 minute: '00',
//               },
//             });

//             currentSlot.setMinutes(currentSlot.getMinutes() + timeDuration);
//           }

//           return timeSlots;
//         }).flat();
//       }
//     }

//     return [];
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const tileContent = ({ date, view }) => {
//     const currentDate = new Date();
//     const isAfterToday = date >= currentDate;

//     const day = date.getDay();
//     const hasData =
//       timezone &&
//       timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

//     return hasData && isAfterToday && view === 'month' ? <div className="blue-dot"></div> : null;
//   };

//   const handleTileClick = ({ date, view }) => {
//     if (!date) {
//       return false;
//     }

//     const day = date.getDay();
//     const hasData =
//       timezone &&
//       timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

//     if (!hasData || view !== 'month') {
//       return false;
//     }

//     setSelectedDate(date);

//     return true;
//   };

//   return (
//     <>
//       <style>
//         {`
//           .blue-dot {
//             width: 10px;
//             height: 10px;
//             background-color: blue;
//             border-radius: 50%;
//             margin: 0 auto;
//             margin-top: 3px;
//           }

//           .disabled-dot {
//             width: 10px;
//             height: 10px;
//             background-color: lightgray;
//             border-radius: 50%;
//             margin: 0 auto;
//             margin-top: 3px;
//           }
//         `}
//       </style>
//       <div className="container-fuild">
//         <div className="row d-flex">
//           <div className="col-3">
//             <div className="page-wrapper toggled">
//               <Schedulesettingsidebar meetingDetails={meetingDetails} />
//             </div>
//           </div>

//           <div className="col-9 d-flex align-items-center bg-soft-secondary">
//             <div className="container create-preview">
//               <div className="row d-flex">
//                 <p>
//                   This is a preview. To book an event, share the link with your
//                   invitees.
//                   <label>View live page</label>
//                 </p>

//                 <div className="col-5 d-flex flex-column p-4">
//                   <label>{userFullName ? userFullName : "Event name here"}</label>
//                   <h3>{meetingDetails ? meetingDetails.name : "Event name here"}</h3>
//                   <label>
//                     <span className="mdi mdi-clock-time-five-outline"></span>
//                     {meetingDetails ? meetingDetails.duration + " min" : "30 min"}
//                   </label>
//                   <label>
//                     <span className="mdi mdi-map-marker"></span>
//                     {meetingDetails ? meetingDetails.location : "Add a location for it to show here"}
//                   </label>
//                 </div>
//                 <div className="col-7 d-flex align-items-center justify-content-center h-550 preview-right">
//                   <div>
//                     <h4>Select Date & Times</h4>
//                     <div className="d-flex">
//                       <div>
//                         <Calendar
//                           onChange={handleDateChange}
//                           value={selectedDate}
//                           minDate={new Date()} // Disable selection of dates before today
//                           tileContent={tileContent}
//                           onClickDay={handleTileClick} // Handle day click
//                         />
//                       </div>
//                       <div>
//                         <div className="days-slots d-flex flex-column">
//                           {getWeeklyHoursForSelectedDay()
//                             .sort((a, b) => {
//                               // Convert start times to numbers for comparison
//                               const timeA = parseInt(
//                                 `${a.start.hour}${a.start.minute}`,
//                                 10
//                               );
//                               const timeB = parseInt(
//                                 `${b.start.hour}${b.start.minute}`,
//                                 10
//                               );
//                               return timeA - timeB;
//                             })
//                             .map((slot, index) => (
//                               <button
//                                 key={index}
//                               >{`${slot.start.hour}:${slot.start.minute}`}</button>
//                             ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Schedulesetting;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import Schedulesettingsidebar from './schedulesettingsidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchMeetingDetails } from './actions/meetingActions';

const Schedulesetting = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userFullName, setUserFullName] = useState('');
  const [timeDuration, setTimeDuration] = useState(30); // Initialize with default duration

  const meetingId = new URLSearchParams(location.search).get('id');
  const currentMeeting = useSelector(state => state.meetings.currentMeeting);

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
        dispatch(fetchMeetingDetails(meetingId));
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
  }, []);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const [timezone] = useState([
    {
      userId: 32,
      id: 11,
      name: "Default",
      isDefault: 1,
      timezone: "Asia/Gaza",
      weeklyhours: [
        {
          day: 1,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
            {
              end: {
                hour: "16",
                minute: "00",
              },
              start: {
                hour: "14",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 2,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 3,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 4,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 5,
          slots: [
            {
              end: {
                hour: "17",
                minute: "30",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    if (currentMeeting) {
      setMeetingDetails(currentMeeting);
    }
  }, [currentMeeting]);

  useEffect(() => {
    // Check if meetingDetails exists and has duration
    if (meetingDetails && meetingDetails.duration) {
      // Convert duration to integer and set timeDuration
      setTimeDuration(parseInt(meetingDetails.duration));
    } else {
      // If meetingDetails or duration is not available, set default time duration
      setTimeDuration(30); // Default time duration
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
            timeSlots.push({
              start: {
                hour: currentSlot.getHours().toString().padStart(2, '0'),
                minute: currentSlot.getMinutes().toString().padStart(2, '0'),
              },
              end: {
                hour: currentSlot.getHours().toString().padStart(2, '0'),
                minute: '00',
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }) => {
    const currentDate = new Date();
    const isAfterToday = date >= currentDate;

    const day = date.getDay();
    const hasData =
      timezone &&
      timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

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
              <Schedulesettingsidebar meetingDetails={meetingDetails} />
            </div>
          </div>

          <div className="col-9 d-flex align-items-center bg-soft-secondary">
            <div className="container create-preview">
              <div className="row d-flex">
                <p>
                  This is a preview. To book an event, share the link with your
                  invitees.
                  <label>View live page</label>
                </p>

                <div className="col-5 d-flex flex-column p-4">
                  <label>{userFullName ? userFullName : "Event name here"}</label>
                  <h3>{meetingDetails ? meetingDetails.name : "Event name here"}</h3>
                  <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    {meetingDetails ? meetingDetails.duration + " min" : "30 min"}
                  </label>
                  <label>
                    <span className="mdi mdi-map-marker"></span>
                    {meetingDetails ? meetingDetails.location : "Add a location for it to show here"}
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
                          minDate={new Date()} // Disable selection of dates before today
                          tileContent={tileContent}
                          onClickDay={handleTileClick} // Handle day click
                        />
                      </div>
                      <div>
                        <div className="days-slots d-flex flex-column">
                          {getWeeklyHoursForSelectedDay()
                            .sort((a, b) => {
                              // Convert start times to numbers for comparison
                              const timeA = parseInt(
                                `${a.start.hour}${a.start.minute}`,
                                10
                              );
                              const timeB = parseInt(
                                `${b.start.hour}${b.start.minute}`,
                                10
                              );
                              return timeA - timeB;
                            })
                            .map((slot, index) => (
                              <button
                                key={index}
                              >{`${slot.start.hour}:${slot.start.minute}`}</button>
                            ))}
                        </div>
                      </div>
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
