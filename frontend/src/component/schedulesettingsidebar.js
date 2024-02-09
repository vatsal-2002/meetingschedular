// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Schedulesettingsidebar = () => {

//   const generateTimeSlot = () => {
//     return { id: Date.now(), start: "00:00", end: "00:00" };
//   };

//   const [textboxCounts, setTextboxCounts] = useState({
//     SUN: { count: 1, isChecked: true, timeSlots: [{ id: Date.now(), start: "00:00", end: "00:00" }] },
//     MON: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     TUE: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     WED: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     THU: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     FRI: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     SAT: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//   });

//   const [schedules, setSchedules] = useState([]);
//   const navigate = useNavigate();


//   useEffect(() => {

//     // Fetch the JWT from your session or wherever it's stored
//     const token = sessionStorage.getItem('userToken'); // Replace with the actual key

//     if (token) {
//       // Decode the JWT manually
//       const [header, payload, signature] = token.split('.');

//       const decodedHeader = JSON.parse(atob(header));
//       const decodedPayload = JSON.parse(atob(payload));

//       console.log('Decoded Header:', decodedHeader);
//       console.log('Decoded Payload:', decodedPayload);

//       // Now you can access the decoded information and use it as needed
//       // For example, you might extract user information from the payload
//       const UserId = decodedPayload.id;
//       console.log(UserId);

//       // Perform the fetch with the decoded user ID

//       fetch(`http://localhost:8000/schedule/${UserId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `${token}`,
//         },
//       })
//       .then(response => {
//         console.log('Response Status:', response.status);
//         return response.json();
//       })
//       .then(data => {
//         console.log('Response Data:', data);
//         if (Array.isArray(data) && data.length > 0) {
//           const weeklyHours = data[0].weeklyhours;
//           console.log('Weekly Hours:', weeklyHours);

//           // Now, you can use the weeklyHours array as needed
//         } else {
//           console.warn('Invalid data format or empty array');
//         }
//         setSchedules(data);
//       })
//       .catch(error => console.error('Error fetching schedules:', error));
//   } else {
//     console.error('Token not found');
//     }
//   }, []);



//   const timeOptions = [];
//   for (let hour = 0; hour <= 23; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       const formattedHour = hour.toString().padStart(2, "0");
//       const formattedMinute = minute.toString().padStart(2, "0");
//       const time = `${formattedHour}:${formattedMinute}`;
//       timeOptions.push(time);
//     }
//   }
//   timeOptions.push("24:00");

//   const handleCheckboxChange = (day) => {
//     setTextboxCounts((prevCounts) => ({
//       ...prevCounts,
//       [day]: {
//         ...prevCounts[day],
//         isChecked: !prevCounts[day].isChecked,
//       },
//     }));
//   };

//   const handleAddTextbox = (day) => {
//     setTextboxCounts((prevCounts) => ({
//       ...prevCounts,
//       [day]: {
//         ...prevCounts[day],
//         count: prevCounts[day].count + 1,
//         timeSlots: [...prevCounts[day].timeSlots, generateTimeSlot()],
//       },
//     }));
//   };

//   const handleRemoveTimeSlot = (day, id) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       newCounts[day].timeSlots = newCounts[day].timeSlots.filter((slot) => slot.id !== id);
//       newCounts[day].count = newCounts[day].timeSlots.length;
//       newCounts[day].isChecked = newCounts[day].count > 0;
//       return newCounts;
//     });
//   };

//   const handleTimeSlotChange = (day, id, field, value) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       const index = newCounts[day].timeSlots.findIndex((slot) => slot.id === id);
//       newCounts[day].timeSlots[index][field] = value;
//       return newCounts;
//     });
//   };

//   const goToMeetingSettings = () => {
//     navigate("/meetingsetting");
//   };

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   return (
//     <>
//       <div className="sidebar-block">
//         <nav id="sidebar" className="sidebar-wrapper toggled">
//           <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
//             <div className="create-meeting mt-3 p-3">
//               <button className="meeting-cancel" onClick={goToMeetingSettings}>
//                 <span className="mdi mdi-arrow-left-thick"></span>Event Type Summary
//               </button>
//               <h4 className="mt-3">Scheduling settings</h4>
//             </div>
//             <hr />
//             <div className="d-flex flex-column meeting-detail p-3">
//               <h6>Date range</h6>
//               <input type="textbox" className="form-control mb-3 w-50" placeholder="Enter Range Date " />
//               <hr />
//               <h6>Available hours</h6>
//               <p className="mx-4 schedulesetting-content">
//                 Set the times that people will be able to schedule these types of meetings with you.
//               </p>
//               <div>
//                 <select className="form-control mb-3 weekly-hour-textbox d-inline-block w-50" value="">
//                   <option>Select Schedule Time</option>
//                   <option>Hello</option>
//                   <option>Demo</option>
//                 </select>
//               </div>
//               <h6>Weekly hours</h6>
//               <div className="d-flex flex-column ">
//                 {daysOfWeek.map((day) => (
//                   <div key={day} className="weeklyhours-container d-flex align-items-baseline">
//                     <div className="checkbox-input mb-2 me-2">
//                       <input
//                         type="checkbox"
//                         checked={textboxCounts[day].isChecked}
//                         onChange={() => handleCheckboxChange(day)}
//                       />
//                     </div>
//                     <div>
//                       <label className="weekly-hour">{day}</label>
//                     </div>
//                     {textboxCounts[day].isChecked ? (
//                       <>
//                         <div className="textbox-input">
//                           {textboxCounts[day].timeSlots.map((timeSlot) => (
//                             <React.Fragment key={timeSlot.id}>
//                               <div className="d-flex">
//                                 <select
//                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
//                                   value={timeSlot.start}
//                                   onChange={(e) => handleTimeSlotChange(day, timeSlot.id, "start", e.target.value)}
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <label className="mt-2">-</label>
//                                 <select
//                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
//                                   value={timeSlot.end}
//                                   onChange={(e) => handleTimeSlotChange(day, timeSlot.id, "end", e.target.value)}
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <span
//                                   className="mdi mdi-close mb-3"
//                                   onClick={() => handleRemoveTimeSlot(day, timeSlot.id)}
//                                 ></span>
//                               </div>
//                             </React.Fragment>
//                           ))}
//                         </div>
//                         <div>
//                           <span className="mdi mdi-plus mb-3" onClick={() => handleAddTextbox(day)}></span>
//                         </div>
//                       </>
//                     ) : (
//                       <div>
//                         <label className="unavailable-label">Unavailable</label>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Schedulesettingsidebar;

// #####################

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Schedulesettingsidebar = () => {

//   const generateTimeSlot = () => {
//     return { id: Date.now(), start: "00:00", end: "00:00" };
//   };

//   const [textboxCounts, setTextboxCounts] = useState({
//     SUN: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     MON: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     TUE: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     WED: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     THU: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     FRI: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     SAT: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//   });

//   const [schedules, setSchedules] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem('userToken');

//     if (token) {
//       const [header, payload, signature] = token.split('.');
//       const decodedHeader = JSON.parse(atob(header));
//       const decodedPayload = JSON.parse(atob(payload));

//       const UserId = decodedPayload.id;
//       console.log(UserId)

//       fetch(`http://localhost:8000/schedule/${UserId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `${token}`,
//         },
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (Array.isArray(data) && data.length > 0) {
//           const fetchedWeeklyHours = data[0].weeklyhours;
//           console.log('Fetched Weekly Hours:', fetchedWeeklyHours);

//           setTextboxCounts((prevCounts) => ({
//             ...prevCounts,
//             ...Object.fromEntries(fetchedWeeklyHours.map(({ day, slots }) => [
//               daysOfWeek[day - 1], // Assuming day is 1-indexed
//               {
//                 count: slots.length,
//                 isChecked: slots.length > 0,
//                 timeSlots: slots.map((slot, index) => ({
//                   id: index,
//                   start: `${slot.start.hour}:${slot.start.minute}`,
//                   end: `${slot.end.hour}:${slot.end.minute}`,
//                 })),
//               },
//             ])),
//           }));
//         } else {
//           console.warn('Invalid data format or empty array');
//         }
//         setSchedules(data);
//       })
//       .catch(error => console.error('Error fetching schedules:', error));
//     } else {
//       console.error('Token not found');
//     }
//   }, []);

//   const timeOptions = [];
//   for (let hour = 0; hour <= 23; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       const formattedHour = hour.toString().padStart(2, "0");
//       const formattedMinute = minute.toString().padStart(2, "0");
//       const time = `${formattedHour}:${formattedMinute}`;
//       timeOptions.push(time);
//     }
//   }
//   timeOptions.push("24:00");

//   const handleCheckboxChange = (day) => {
//     setTextboxCounts((prevCounts) => ({
//       ...prevCounts,
//       [day]: {
//         ...prevCounts[day],
//         isChecked: !prevCounts[day].isChecked,
//       },
//     }));
//   };

//   const handleAddTextbox = (day) => {
//     setTextboxCounts((prevCounts) => ({
//       ...prevCounts,
//       [day]: {
//         ...prevCounts[day],
//         count: prevCounts[day].count + 1,
//         timeSlots: [...prevCounts[day].timeSlots, generateTimeSlot()],
//       },
//     }));
//   };

//   const handleRemoveTimeSlot = (day, id) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       newCounts[day].timeSlots = newCounts[day].timeSlots.filter((slot) => slot.id !== id);
//       newCounts[day].count = newCounts[day].timeSlots.length;
//       newCounts[day].isChecked = newCounts[day].count > 0;
//       return newCounts;
//     });
//   };

//   const handleTimeSlotChange = (day, id, field, value) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       const index = newCounts[day].timeSlots.findIndex((slot) => slot.id === id);
//       newCounts[day].timeSlots[index][field] = value;
//       return newCounts;
//     });
//   };

//   const goToMeetingSettings = () => {
//     navigate("/meetingsetting");
//   };

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   return (
//     <>
//       <div className="sidebar-block">
//         <nav id="sidebar" className="sidebar-wrapper toggled">
//           <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
//             <div className="create-meeting mt-3 p-3">
//               <button className="meeting-cancel" onClick={goToMeetingSettings}>
//                 <span className="mdi mdi-arrow-left-thick"></span>Event Type Summary
//               </button>
//               <h4 className="mt-3">Scheduling settings</h4>
//             </div>
//             <hr />
//             <div className="d-flex flex-column meeting-detail p-3">
//               <h6>Date range</h6>
//               <input type="textbox" className="form-control mb-3 w-50" placeholder="Enter Range Date " />
//               <hr />
//               <h6>Available hours</h6>
//               <p className="mx-4 schedulesetting-content">
//                 Set the times that people will be able to schedule these types of meetings with you.
//               </p>
//               <div>
//                 <select className="form-control mb-3 weekly-hour-textbox d-inline-block w-50" value="">
//                   <option>Select Schedule Time</option>
//                   <option>Hello</option>
//                   <option>Demo</option>
//                 </select>
//               </div>
//               <h6>Weekly hours</h6>
//               <div className="d-flex flex-column ">
//                 {daysOfWeek.map((day) => (
//                   <div key={day} className="weeklyhours-container d-flex align-items-baseline">
//                     <div className="checkbox-input mb-2 me-2">
//                       <input
//                         type="checkbox"
//                         checked={textboxCounts[day].isChecked}
//                         onChange={() => handleCheckboxChange(day)}
//                       />
//                     </div>
//                     <div>
//                       <label className="weekly-hour">{day}</label>
//                     </div>
//                     {textboxCounts[day].isChecked ? (
//                       <>
//                         <div className="textbox-input">
//                           {textboxCounts[day].timeSlots.map((timeSlot) => (
//                             <React.Fragment key={timeSlot.id}>
//                               <div className="d-flex">
//                                 <select
//                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
//                                   value={timeSlot.start}
//                                   onChange={(e) => handleTimeSlotChange(day, timeSlot.id, "start", e.target.value)}
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <label className="mt-2">-</label>
//                                 <select
//                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
//                                   value={timeSlot.end}
//                                   onChange={(e) => handleTimeSlotChange(day, timeSlot.id, "end", e.target.value)}
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <span
//                                   className="mdi mdi-close mb-3"
//                                   onClick={() => handleRemoveTimeSlot(day, timeSlot.id)}
//                                 ></span>
//                               </div>
//                             </React.Fragment>
//                           ))}
//                         </div>
//                         <div>
//                           <span className="mdi mdi-plus mb-3" onClick={() => handleAddTextbox(day)}></span>
//                         </div>
//                       </>
//                     ) : (
//                       <div>
//                         <label className="unavailable-label">Unavailable</label>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Schedulesettingsidebar;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Schedulesettingsidebar = () => {
//   const generateTimeSlot = () => {
//     return { id: Date.now(), start: "00:00", end: "00:00" };
//   };

//   const [textboxCounts, setTextboxCounts] = useState({
//     SUN: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     MON: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     TUE: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     WED: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     THU: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     FRI: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//     SAT: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
//   });

//   const [schedules, setSchedules] = useState([]);
//   const navigate = useNavigate();

//   const mapApiDayToDisplayOrder = (apiDay) => {
//     // Mapping API indexing (0-6) to desired display order (0-6 for Sunday to Saturday)
//     const displayOrder = [0, 1, 2, 3, 4, 5, 6];
//     return displayOrder.indexOf(apiDay);
//   };

//   useEffect(() => {
//     const token = sessionStorage.getItem('userToken');

//     if (token) {
//       const [header, payload, signature] = token.split('.');
//       const decodedHeader = JSON.parse(atob(header));
//       const decodedPayload = JSON.parse(atob(payload));

//       const UserId = decodedPayload.id;
//       console.log(UserId);

//       fetch(`http://localhost:8000/schedule/${UserId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `${token}`,
//         },
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (Array.isArray(data) && data.length > 0) {
//           const fetchedWeeklyHours = data[0].weeklyhours;
//           console.log('Fetched Weekly Hours:', fetchedWeeklyHours);

//           setTextboxCounts((prevCounts) => ({
//             ...prevCounts,
//             ...Object.fromEntries(
//               daysOfWeek.map((day) => {
//                 const apiDay = fetchedWeeklyHours.find((item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day));

//                 if (apiDay) {
//                   return [
//                     day,
//                     {
//                       count: apiDay.slots.length,
//                       isChecked: apiDay.slots.length > 0,
//                       timeSlots: apiDay.slots.map((slot, index) => ({
//                         id: index,
//                         start: `${slot.start.hour}:${slot.start.minute}`,
//                         end: `${slot.end.hour}:${slot.end.minute}`,
//                       })),
//                     },
//                   ];
//                 } else {
//                   // Day data not found in API, set as unchecked and unavailable
//                   return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
//                 }
//               })
//             ),
//           });
//         } else {
//           console.warn('Invalid data format or empty array');
//         }
//         setSchedules(data);
//       })
//       .catch(error => console.error('Error fetching schedules:', error));
//     } else {
//       console.error('Token not found');
//     }
//   }, []);

//   const timeOptions = [];
//   for (let hour = 0; hour <= 23; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       const formattedHour = hour.toString().padStart(2, "0");
//       const formattedMinute = minute.toString().padStart(2, "0");
//       const time = `${formattedHour}:${formattedMinute}`;
//       timeOptions.push(time);
//     }
//   }
//   timeOptions.push("24:00");

//   const handleCheckboxChange = (day) => {
//     setTextboxCounts((prevCounts) => ({
//       ...prevCounts,
//       [day]: {
//         ...prevCounts[day],
//         isChecked: !prevCounts[day].isChecked,
//       },
//     }));
//   };

//   const handleAddTextbox = (day) => {
//     setTextboxCounts((prevCounts) => ({
//       ...prevCounts,
//       [day]: {
//         ...prevCounts[day],
//         count: prevCounts[day].count + 1,
//         timeSlots: [...prevCounts[day].timeSlots, generateTimeSlot()],
//       },
//     }));
//   };

//   const handleRemoveTimeSlot = (day, id) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       newCounts[day].timeSlots = newCounts[day].timeSlots.filter((slot) => slot.id !== id);
//       newCounts[day].count = newCounts[day].timeSlots.length;
//       newCounts[day].isChecked = newCounts[day].count > 0;
//       return newCounts;
//     });
//   };

//   const handleTimeSlotChange = (day, id, field, value) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       const index = newCounts[day].timeSlots.findIndex((slot) => slot.id === id);
//       newCounts[day].timeSlots[index][field] = value;
//       return newCounts;
//     });
//   };

//   const goToMeetingSettings = () => {
//     navigate("/meetingsetting");
//   };

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   return (
//     <>
//       <div className="sidebar-block">
//         <nav id="sidebar" className="sidebar-wrapper toggled">
//           <div className="sidebar-content" data-simplebar="" style={{ height: "calc(100% - 60px)" }}>
//             <div className="create-meeting mt-3 p-3">
//               <button className="meeting-cancel" onClick={goToMeetingSettings}>
//                 <span className="mdi mdi-arrow-left-thick"></span>Event Type Summary
//               </button>
//               <h4 className="mt-3">Scheduling settings</h4>
//             </div>
//             <hr />
//             <div className="d-flex flex-column meeting-detail p-3">
//               <h6>Date range</h6>
//               <input type="textbox" className="form-control mb-3 w-50" placeholder="Enter Range Date " />
//               <hr />
//               <h6>Available hours</h6>
//               <p className="mx-4 schedulesetting-content">
//                 Set the times that people will be able to schedule these types of meetings with you.
//               </p>
//               <div>
//                 <select className="form-control mb-3 weekly-hour-textbox d-inline-block w-50" value="">
//                   <option>Select Schedule Time</option>
//                   <option>Hello</option>
//                   <option>Demo</option>
//                 </select>
//               </div>
//               <h6>Weekly hours</h6>
//               <div className="d-flex flex-column ">
//                 {daysOfWeek.map((day) => (
//                   <div key={day} className="weeklyhours-container d-flex align-items-baseline">
//                     <div className="checkbox-input mb-2 me-2">
//                       <input
//                         type="checkbox"
//                         checked={textboxCounts[day].isChecked}
//                         onChange={() => handleCheckboxChange(day)}
//                       />
//                     </div>
//                     <div>
//                       <label className="weekly-hour">{day}</label>
//                     </div>
//                     {textboxCounts[day].isChecked ? (
//                       <>
//                         <div className="textbox-input">
//                           {textboxCounts[day].timeSlots.map((timeSlot) => (
//                             <React.Fragment key={timeSlot.id}>
//                               <div className="d-flex">
//                                 <select
//                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
//                                   value={timeSlot.start}
//                                   onChange={(e) => handleTimeSlotChange(day, timeSlot.id, "start", e.target.value)}
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <label className="mt-2">-</label>
//                                 <select
//                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
//                                   value={timeSlot.end}
//                                   onChange={(e) => handleTimeSlotChange(day, timeSlot.id, "end", e.target.value)}
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <span
//                                   className="mdi mdi-close mb-3"
//                                   onClick={() => handleRemoveTimeSlot(day, timeSlot.id)}
//                                 ></span>
//                               </div>
//                             </React.Fragment>
//                           ))}
//                         </div>
//                         <div>
//                           <span className="mdi mdi-plus mb-3" onClick={() => handleAddTextbox(day)}></span>
//                         </div>
//                       </>
//                     ) : (
//                       <div>
//                         <label className="unavailable-label">Unavailable</label>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Schedulesettingsidebar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const handleScheduleChange = (selectedSchedule) => {
  // Use the selected schedule as needed
  console.log('Selected Schedule:', selectedSchedule);
  // You may want to update the state or perform any other actions here
};

const Schedulesettingsidebar = () => {
  const generateTimeSlot = () => {
    return { id: Date.now(), start: "00:00", end: "00:00" };
  };

  const [fetchedWeeklyName, setFetchedWeeklyName] = useState("");
  const [scheduleNames, setScheduleNames] = useState([]);


  const [textboxCounts, setTextboxCounts] = useState({
    SUN: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
    MON: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
    TUE: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
    WED: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
    THU: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
    FRI: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
    SAT: { count: 1, isChecked: true, timeSlots: [generateTimeSlot()] },
  });

  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  const mapApiDayToDisplayOrder = (apiDay) => {
    // Mapping API indexing (0-6) to desired display order (0-6 for Sunday to Saturday)
    const displayOrder = [0, 1, 2, 3, 4, 5, 6];
    return displayOrder.indexOf(apiDay);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('userToken');

    if (token) {
      const [header, payload, signature] = token.split('.');
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));

      const UserId = decodedPayload.id;

      fetch(`http://localhost:8000/schedule/${UserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const fetchedWeeklyHours = data[0].weeklyhours;
            const fetchedWeeklyName = data[0].name;
            setScheduleNames(data.map(schedule => schedule.name));

            setTextboxCounts((prevCounts) => ({
              ...prevCounts,
              ...Object.fromEntries(
                daysOfWeek.map((day) => {
                  const apiDayIndex = fetchedWeeklyHours.findIndex(
                    (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
                  );

                  if (apiDayIndex !== -1) {
                    const apiDay = fetchedWeeklyHours[apiDayIndex];
                    return [
                      day,
                      {
                        count: apiDay.slots.length,
                        isChecked: apiDay.slots.length > 0,
                        timeSlots: apiDay.slots.map((slot, index) => ({
                          id: index,
                          start: `${slot.start.hour}:${slot.start.minute}`,
                          end: `${slot.end.hour}:${slot.end.minute}`,
                        })),
                      },
                    ];
                  } else {
                    // Day data not found in API, set as unchecked and unavailable
                    return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
                  }
                })
              ),
            }));
          } else {
            console.warn('Invalid data format or empty array');
          }
          setSchedules(data);
        })
        .catch(error => console.error('Error fetching schedules:', error));
    } else {
      console.error('Token not found');
    }
  }, []);

  const timeOptions = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute}`;
      timeOptions.push(time);
    }
  }
  timeOptions.push("24:00");

  const handleCheckboxChange = (day) => {
    setTextboxCounts((prevCounts) => ({
      ...prevCounts,
      [day]: {
        ...prevCounts[day],
        isChecked: !prevCounts[day].isChecked,
      },
    }));
  };

  const handleAddTextbox = (day) => {
    setTextboxCounts((prevCounts) => ({
      ...prevCounts,
      [day]: {
        ...prevCounts[day],
        count: prevCounts[day].count + 1,
        timeSlots: [...prevCounts[day].timeSlots, generateTimeSlot()],
      },
    }));
  };

  const handleRemoveTimeSlot = (day, id) => {
    setTextboxCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[day].timeSlots = newCounts[day].timeSlots.filter((slot) => slot.id !== id);
      newCounts[day].count = newCounts[day].timeSlots.length;
      newCounts[day].isChecked = newCounts[day].count > 0;
      return newCounts;
    });
  };

  const handleTimeSlotChange = (day, id, field, value) => {
    setTextboxCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      const index = newCounts[day].timeSlots.findIndex((slot) => slot.id === id);
      newCounts[day].timeSlots[index][field] = value;
      return newCounts;
    });
  };

  const goToMeetingSettings = () => {
    navigate("/meetingsetting");
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <>
      <div className="sidebar-block">
        <nav id="sidebar" className="sidebar-wrapper toggled">
          <div
            className="sidebar-content"
            data-simplebar=""
            style={{ height: "calc(100% - 60px)" }}
          >
            <div className="create-meeting mt-3 p-3">
              <button className="meeting-cancel" onClick={goToMeetingSettings}>
                <span className="mdi mdi-arrow-left-thick"></span>Event Type
                Summary
              </button>
              <h4 className="mt-3">Scheduling settings</h4>
            </div>
            <hr />
            <div className="d-flex flex-column meeting-detail p-3">
              {/* <h6>Date range</h6>
              <input type="textbox" className="form-control mb-3 w-50" placeholder="Enter Range Date " />
              <hr /> */}
              <h6>Available hours</h6>
              <p className="mx-4 schedulesetting-content">
                Set the times that people will be able to schedule these types
                of meetings with you.
              </p>
              <div>
                <select
                  className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
                  value={fetchedWeeklyName} // Use the selected schedule name
                  onChange={(e) => handleScheduleChange(e.target.value)} // Add a handler for schedule change
                >

                  {scheduleNames.map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <h6>Weekly hours</h6>
              <div className="d-flex flex-column ">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="weeklyhours-container d-flex align-items-baseline"
                  >
                    <div className="checkbox-input mb-2 me-2">
                      <input
                        type="checkbox"
                        checked={textboxCounts[day].isChecked}
                        onChange={() => handleCheckboxChange(day)}
                      />
                    </div>
                    <div>
                      <label className="weekly-hour">{day}</label>
                    </div>
                    {textboxCounts[day].isChecked ? (
                      <>
                        <div className="textbox-input">
                          {textboxCounts[day].timeSlots.map((timeSlot) => (
                            <React.Fragment key={timeSlot.id}>
                              <div className="d-flex">
                                <select
                                  className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
                                  value={timeSlot.start}
                                  onChange={(e) =>
                                    handleTimeSlotChange(
                                      day,
                                      timeSlot.id,
                                      "start",
                                      e.target.value
                                    )
                                  }
                                >
                                  {timeOptions.map((option, i) => (
                                    <option key={i} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <label className="mt-2">-</label>
                                <select
                                  className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
                                  value={timeSlot.end}
                                  onChange={(e) =>
                                    handleTimeSlotChange(
                                      day,
                                      timeSlot.id,
                                      "end",
                                      e.target.value
                                    )
                                  }
                                >
                                  {timeOptions.map((option, i) => (
                                    <option key={i} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <span
                                  className="mdi mdi-close mt-2"
                                  onClick={() =>
                                    handleRemoveTimeSlot(day, timeSlot.id)
                                  }
                                ></span>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        <div>
                          <span
                            className="mdi mdi-plus mb-3"
                            onClick={() => handleAddTextbox(day)}
                          ></span>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="unavailable-label">Unavailable</label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Schedulesettingsidebar;
