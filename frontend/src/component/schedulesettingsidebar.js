// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import { useDispatch } from 'react-redux';
// // // import { setScheduleData } from './actions/meetingActions';
// // // import { useSelector } from 'react-redux';
// // // import { setSelectedSchedule as setSelectedSchedule1 } from './actions/meetingActions';
// // // import { SET_SELECTED_SCHEDULE } from './actions/type';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';

// // // const Schedulesettingsidebar = ({ onScheduleChange }) => {
// // //   const scheduleData = useSelector(state => state.meetings.scheduleData);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const dispatch = useDispatch();
// // //   const [selectedSchedule, setSelectedSchedule] = useState("");
// // //   const [fetchedWeeklyName, setFetchedWeeklyName] = useState("");
// // //   const [scheduleNames, setScheduleNames] = useState([]);
// // //   const [textboxCounts, setTextboxCounts] = useState({
// // //     SUN: { count: 1, isChecked: true, timeSlots: [] },
// // //     MON: { count: 1, isChecked: true, timeSlots: [] },
// // //     TUE: { count: 1, isChecked: true, timeSlots: [] },
// // //     WED: { count: 1, isChecked: true, timeSlots: [] },
// // //     THU: { count: 1, isChecked: true, timeSlots: [] },
// // //     FRI: { count: 1, isChecked: true, timeSlots: [] },
// // //     SAT: { count: 1, isChecked: true, timeSlots: [] },
// // //   });

// // //   const [selectedScheduleId, setSelectedScheduleId] = useState(null);
// // //   const [selectedScheduleName, setSelectedScheduleName] = useState("");
// // //   const [schedules, setSchedules] = useState([]);
// // //   const navigate = useNavigate();

// // //   const mapApiDayToDisplayOrder = (apiDay) => {
// // //     const displayOrder = [0, 1, 2, 3, 4, 5, 6];
// // //     return displayOrder.indexOf(apiDay);
// // //   };

// // //   const generateTimeSlot = () => {
// // //     return { id: Date.now(), start: "09:00", end: "18:00" };
// // //   };

// // //   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// // //   useEffect(() => {
// // //     const token = sessionStorage.getItem('userToken');

// // //     if (token) {
// // //       const [header, payload, signature] = token.split('.');
// // //       const decodedHeader = JSON.parse(atob(header));
// // //       const decodedPayload = JSON.parse(atob(payload));

// // //       const UserId = decodedPayload.id;

// // //       fetch(`http://localhost:8000/schedule/${UserId}`, {
// // //         method: 'GET',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `${token}`,
// // //         },
// // //       })
// // //         .then(response => {
// // //           if (!response.ok) {
// // //             throw new Error('Failed to fetch data');
// // //           }
// // //           return response.json();
// // //         })
// // //         .then(data => {
// // //           setLoading(false);
// // //           if (Array.isArray(data) && data.length > 0) {
// // //             const fetchedWeeklyHours = data[0].weeklyhours;
// // //             const scheduleData = fetchedWeeklyHours;
// // //             dispatch(setScheduleData(scheduleData));
// // //             const fetchedWeeklyName = data[0].name;
// // //             setFetchedWeeklyName(fetchedWeeklyName);
// // //             setScheduleNames(data.map(schedule => schedule.name));

// // //             setTextboxCounts((prevCounts) => ({
// // //               ...prevCounts,
// // //               ...Object.fromEntries(
// // //                 daysOfWeek.map((day) => {
// // //                   const apiDayIndex = fetchedWeeklyHours.findIndex(
// // //                     (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
// // //                   );

// // //                   if (apiDayIndex !== -1) {
// // //                     const apiDay = fetchedWeeklyHours[apiDayIndex];
// // //                     return [
// // //                       day,
// // //                       {
// // //                         count: apiDay.slots.length,
// // //                         isChecked: apiDay.slots.length > 0,
// // //                         timeSlots: apiDay.slots.map((slot, index) => ({
// // //                           id: index,
// // //                           start: `${slot.start.hour}:${slot.start.minute}`,
// // //                           end: `${slot.end.hour}:${slot.end.minute}`,
// // //                         })),
// // //                       },
// // //                     ];
// // //                   } else {
// // //                     return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
// // //                   }
// // //                 })
// // //               ),
// // //             }));

// // //             setSelectedScheduleId(data[0].id);
// // //           } else {
// // //             console.warn('Invalid data format or empty array');
// // //           }
// // //           setSchedules(data);
// // //         })
// // //         .catch(error => {
// // //           console.error('Error fetching schedules:', error);
// // //           setLoading(false);
// // //           setError('Failed to fetch data. Please try again later.');
// // //         });
// // //     } else {
// // //       console.error('Token not found');
// // //     }
// // //   }, []);

// // //   const handleUpdateButtonClick = () => {
// // //     const token = sessionStorage.getItem("userToken");

// // //     if (token && selectedScheduleId !== null) {
// // //       const weeklyhours = daysOfWeek.map((day) => {
// // //         return {
// // //           day: daysOfWeek.indexOf(day) + 0,
// // //           slots: textboxCounts[day].isChecked
// // //             ? textboxCounts[day].timeSlots.map((slot) => ({
// // //               start: {
// // //                 hour: slot.start.split(":")[0],
// // //                 minute: slot.start.split(":")[1],
// // //               },
// // //               end: {
// // //                 hour: slot.end.split(":")[0],
// // //                 minute: slot.end.split(":")[1],
// // //               },
// // //             }))
// // //             : [],
// // //         };
// // //       });

// // //       const requestBody = {
// // //         weeklyhours,
// // //       };

// // //       fetch(`http://localhost:8000/schedules/${selectedScheduleId}`, {
// // //         method: "PATCH",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `${token}`,
// // //         },
// // //         body: JSON.stringify(requestBody),
// // //       })
// // //         .then((response) => response.json())
// // //         .then((data) => {
// // //           console.log("Schedule updated successfully:", data);
// // //           toast.success('Schedule updated successfully.', { position: 'top-center', autoClose: 1000 });
// // //           dispatch(setScheduleData(weeklyhours));
// // //         })
// // //         .catch((error) => {
// // //           console.error("Error updating schedule:", error);
// // //           toast.error('Error updating schedule. Please try again later.', { position: 'top-center', autoClose: 1000 });
// // //         });
// // //     } else {
// // //       console.error("Token or selected schedule ID not found");
// // //     }
// // //   };


// // //   const handleScheduleChange = (selectedSchedule) => {
// // //     dispatch(setSelectedSchedule1(selectedSchedule));
// // //     onScheduleChange(selectedSchedule);
// // //     const selectedScheduleData = schedules.find(
// // //       (schedule) => schedule.name === selectedSchedule
// // //     );

// // //     if (selectedScheduleData) {
// // //       setSelectedScheduleId(selectedScheduleData.id);
// // //       const fetchedWeeklyHours = selectedScheduleData.weeklyhours;
// // //       setFetchedWeeklyName(selectedSchedule);

// // //       dispatch(setScheduleData(fetchedWeeklyHours));

// // //       setTextboxCounts((prevCounts) => ({
// // //         ...prevCounts,
// // //         ...Object.fromEntries(
// // //           daysOfWeek.map((day) => {
// // //             const apiDayIndex = fetchedWeeklyHours.findIndex(
// // //               (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
// // //             );

// // //             if (apiDayIndex !== -1) {
// // //               const apiDay = fetchedWeeklyHours[apiDayIndex];
// // //               return [
// // //                 day,
// // //                 {
// // //                   count: apiDay.slots.length,
// // //                   isChecked: apiDay.slots.length > 0,
// // //                   timeSlots: apiDay.slots.map((slot, index) => ({
// // //                     id: index,
// // //                     start: `${slot.start.hour}:${slot.start.minute}`,
// // //                     end: `${slot.end.hour}:${slot.end.minute}`,
// // //                   })),
// // //                 },
// // //               ];
// // //             } else {
// // //               return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
// // //             }
// // //           })
// // //         ),
// // //       }));
// // //     }
// // //   };

// // //   const timeOptions = [];
// // //   for (let hour = 0; hour <= 23; hour++) {
// // //     for (let minute = 0; minute < 60; minute += 15) {
// // //       const formattedHour = hour.toString().padStart(2, "0");
// // //       const formattedMinute = minute.toString().padStart(2, "0");
// // //       const time = `${formattedHour}:${formattedMinute}`;
// // //       timeOptions.push(time);
// // //     }
// // //   }
// // //   timeOptions.push("24:00");

// // //   const handleCheckboxChange = (day) => {
// // //     setTextboxCounts((prevCounts) => {
// // //       const updatedTimeSlots = prevCounts[day].isChecked
// // //         ? prevCounts[day].timeSlots.map((slot) => ({
// // //           ...slot,
// // //           start: "15:00",
// // //           end: "16:00",
// // //         }))
// // //         : [generateTimeSlot()];

// // //       return {
// // //         ...prevCounts,
// // //         [day]: {
// // //           ...prevCounts[day],
// // //           isChecked: !prevCounts[day].isChecked,
// // //           timeSlots: updatedTimeSlots,
// // //           count: updatedTimeSlots.length,
// // //         },
// // //       };
// // //     });
// // //   };

// // //   const handleAddTextbox = (day) => {
// // //     setTextboxCounts((prevCounts) => {
// // //       const lastTimeSlot = prevCounts[day].timeSlots[prevCounts[day].count - 1];
// // //       const newStartHour = lastTimeSlot.end.split(":")[0];
// // //       const newStartMinute = lastTimeSlot.end.split(":")[1];

// // //       const newEndHour = (parseInt(newStartHour) + 1).toString().padStart(2, "0");
// // //       const newEndMinute = newStartMinute;

// // //       const newTimeSlot = generateTimeSlot();
// // //       newTimeSlot.start = `${newStartHour}:${newStartMinute}`;
// // //       newTimeSlot.end = `${newEndHour}:${newEndMinute}`;

// // //       return {
// // //         ...prevCounts,
// // //         [day]: {
// // //           ...prevCounts[day],
// // //           count: prevCounts[day].count + 1,
// // //           timeSlots: [...prevCounts[day].timeSlots, newTimeSlot],
// // //         },
// // //       };
// // //     });
// // //   };

// // //   const handleRemoveTimeSlot = (day, id) => {
// // //     setTextboxCounts((prevCounts) => {
// // //       const newCounts = { ...prevCounts };
// // //       newCounts[day].timeSlots = newCounts[day].timeSlots.filter(
// // //         (slot) => slot.id !== id
// // //       );
// // //       newCounts[day].count = newCounts[day].timeSlots.length;

// // //       if (newCounts[day].count === 0) {
// // //         newCounts[day].isChecked = false;
// // //       }

// // //       return newCounts;
// // //     });
// // //   };

// // //   const handleTimeSlotChange = (day, id, field, value) => {
// // //     setTextboxCounts((prevCounts) => {
// // //       const newCounts = { ...prevCounts };
// // //       const index = newCounts[day].timeSlots.findIndex(
// // //         (slot) => slot.id === id
// // //       );
// // //       newCounts[day].timeSlots[index][field] = value;
// // //       return newCounts;
// // //     });
// // //   };

// // //   const location = useLocation();

// // //   const goToMeetingSettings = () => {
// // //     const urlParams = new URLSearchParams(location.search);
// // //     const meetingId = urlParams.get('id');

// // //     if (meetingId) {
// // //       navigate(`/meetingsetting?id=${meetingId}`);
// // //     } else {
// // //       console.error('Meeting ID not found in URL params');
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <ToastContainer />
// // //       <div className="sidebar-block">
// // //         <nav id="sidebar" className="sidebar-wrapper toggled">
// // //           <div
// // //             className="sidebar-content"
// // //             data-simplebar=""
// // //             style={{ height: "calc(100% - 60px)" }}
// // //           >
// // //             <div className="create-meeting mt-3 p-3">
// // //               <button className="meeting-cancel" onClick={goToMeetingSettings}>
// // //                 <span className="mdi mdi-arrow-left-thick back"></span>Event Type
// // //                 Summary
// // //               </button>
// // //               <h4 className="mt-3">Scheduling settings</h4>
// // //             </div>
// // //             <hr />
// // //             <div className="d-flex flex-column meeting-detail p-3">
// // //               <div>
// // //                 <select
// // //                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
// // //                   value={
// // //                     fetchedWeeklyName ||
// // //                     (scheduleNames.length > 0 ? scheduleNames[0] : "")
// // //                   }
// // //                   onChange={(e) => handleScheduleChange(e.target.value)}
// // //                 >
// // //                   {scheduleNames.map((name, i) => (
// // //                     <option key={i} value={name}>
// // //                       {name}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               <h6>Weekly hours</h6>
// // //               <div className="d-flex flex-column ">
// // //                 {daysOfWeek.map((day) => (
// // //                   <div
// // //                     key={day}
// // //                     className="weeklyhours-container d-flex align-items-baseline"
// // //                   >
// // //                     <div className="checkbox-input mb-2 me-2">
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={textboxCounts[day].isChecked}
// // //                         onChange={() => handleCheckboxChange(day)}
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="weekly-hour">{day}</label>
// // //                     </div>
// // //                     {textboxCounts[day].isChecked ? (
// // //                       <>
// // //                         <div className="textbox-input">
// // //                           {textboxCounts[day].timeSlots.map((timeSlot) => (
// // //                             <React.Fragment key={timeSlot.id}>
// // //                               <div className="d-flex">
// // //                                 <select
// // //                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
// // //                                   value={timeSlot.start}
// // //                                   onChange={(e) =>
// // //                                     handleTimeSlotChange(
// // //                                       day,
// // //                                       timeSlot.id,
// // //                                       "start",
// // //                                       e.target.value
// // //                                     )
// // //                                   }
// // //                                 >
// // //                                   {timeOptions.map((option, i) => (
// // //                                     <option key={i} value={option}>
// // //                                       {option}
// // //                                     </option>
// // //                                   ))}
// // //                                 </select>
// // //                                 <label className="mt-2">-</label>
// // //                                 <select
// // //                                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
// // //                                   value={timeSlot.end}
// // //                                   onChange={(e) =>
// // //                                     handleTimeSlotChange(
// // //                                       day,
// // //                                       timeSlot.id,
// // //                                       "end",
// // //                                       e.target.value
// // //                                     )
// // //                                   }
// // //                                 >
// // //                                   {timeOptions.map((option, i) => (
// // //                                     <option key={i} value={option}>
// // //                                       {option}
// // //                                     </option>
// // //                                   ))}
// // //                                 </select>
// // //                                 <span
// // //                                   className="mdi mdi-close mt-2"
// // //                                   onClick={() =>
// // //                                     handleRemoveTimeSlot(day, timeSlot.id)
// // //                                   }
// // //                                 ></span>
// // //                               </div>
// // //                             </React.Fragment>
// // //                           ))}
// // //                         </div>

// // //                         <div>
// // //                           <span
// // //                             className="mdi mdi-plus mb-3"
// // //                             onClick={() => handleAddTextbox(day)}
// // //                           ></span>
// // //                         </div>
// // //                       </>
// // //                     ) : (
// // //                       <div>
// // //                         <label className="unavailable-label">Unavailable</label>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //                 <div className="meeting-controller d-flex justify-content-start me-4">
// // //                   <button
// // //                     className="btn btn-primary"
// // //                     onClick={handleUpdateButtonClick}
// // //                   >
// // //                     Update
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </nav>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default Schedulesettingsidebar;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { useDispatch } from 'react-redux';
// // import { setScheduleData } from './actions/meetingActions';
// // import { useSelector } from 'react-redux';
// // import { setSelectedSchedule as setSelectedSchedule1 } from './actions/meetingActions';
// // import { SET_SELECTED_SCHEDULE } from './actions/type';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const Schedulesettingsidebar = ({ onScheduleChange }) => {
// //   const scheduleData = useSelector(state => state.meetings.scheduleData);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [globalErrors, setGlobalErrors] = useState(false);

// //   const dispatch = useDispatch();
// //   const [selectedSchedule, setSelectedSchedule] = useState("");
// //   const [fetchedWeeklyName, setFetchedWeeklyName] = useState("");
// //   const [scheduleNames, setScheduleNames] = useState([]);
// //   const [textboxCounts, setTextboxCounts] = useState({
// //     SUN: { count: 1, isChecked: true, timeSlots: [] },
// //     MON: { count: 1, isChecked: true, timeSlots: [] },
// //     TUE: { count: 1, isChecked: true, timeSlots: [] },
// //     WED: { count: 1, isChecked: true, timeSlots: [] },
// //     THU: { count: 1, isChecked: true, timeSlots: [] },
// //     FRI: { count: 1, isChecked: true, timeSlots: [] },
// //     SAT: { count: 1, isChecked: true, timeSlots: [] },
// //   });

// //   const [selectedScheduleId, setSelectedScheduleId] = useState(null);
// //   const [selectedScheduleName, setSelectedScheduleName] = useState("");
// //   const [schedules, setSchedules] = useState([]);
// //   const navigate = useNavigate();

// //   const mapApiDayToDisplayOrder = (apiDay) => {
// //     const displayOrder = [0, 1, 2, 3, 4, 5, 6];
// //     return displayOrder.indexOf(apiDay);
// //   };

// //   const generateTimeSlot = () => {
// //     return { id: Date.now(), start: "09:00", end: "18:00" };
// //   };

// //   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// //   useEffect(() => {
// //     const token = sessionStorage.getItem('userToken');

// //     if (token) {
// //       const [header, payload, signature] = token.split('.');
// //       const decodedHeader = JSON.parse(atob(header));
// //       const decodedPayload = JSON.parse(atob(payload));

// //       const UserId = decodedPayload.id;

// //       fetch(`http://localhost:8000/schedule/${UserId}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `${token}`,
// //         },
// //       })
// //         .then(response => {
// //           if (!response.ok) {
// //             throw new Error('Failed to fetch data');
// //           }
// //           return response.json();
// //         })
// //         .then(data => {
// //           setLoading(false);
// //           if (Array.isArray(data) && data.length > 0) {
// //             const fetchedWeeklyHours = data[0].weeklyhours;
// //             const scheduleData = fetchedWeeklyHours;
// //             dispatch(setScheduleData(scheduleData));
// //             const fetchedWeeklyName = data[0].name;
// //             setFetchedWeeklyName(fetchedWeeklyName);
// //             setScheduleNames(data.map(schedule => schedule.name));

// //             setTextboxCounts((prevCounts) => ({
// //               ...prevCounts,
// //               ...Object.fromEntries(
// //                 daysOfWeek.map((day) => {
// //                   const apiDayIndex = fetchedWeeklyHours.findIndex(
// //                     (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
// //                   );

// //                   if (apiDayIndex !== -1) {
// //                     const apiDay = fetchedWeeklyHours[apiDayIndex];
// //                     return [
// //                       day,
// //                       {
// //                         count: apiDay.slots.length,
// //                         isChecked: apiDay.slots.length > 0,
// //                         timeSlots: apiDay.slots.map((slot, index) => ({
// //                           id: index,
// //                           start: `${slot.start.hour}:${slot.start.minute}`,
// //                           end: `${slot.end.hour}:${slot.end.minute}`,
// //                         })),
// //                       },
// //                     ];
// //                   } else {
// //                     return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
// //                   }
// //                 })
// //               ),
// //             }));

// //             setSelectedScheduleId(data[0].id);
// //           } else {
// //             console.warn('Invalid data format or empty array');
// //           }
// //           setSchedules(data);
// //         })
// //         .catch(error => {
// //           console.error('Error fetching schedules:', error);
// //           setLoading(false);
// //           setError('Failed to fetch data. Please try again later.');
// //         });
// //     } else {
// //       console.error('Token not found');
// //     }
// //   }, []);

// //   const handleUpdateButtonClick = () => {
// //     const token = sessionStorage.getItem("userToken");

// //     if (token && selectedScheduleId !== null) {
// //       const weeklyhours = daysOfWeek.map((day) => {
// //         return {
// //           day: daysOfWeek.indexOf(day) + 0,
// //           slots: textboxCounts[day].isChecked
// //             ? textboxCounts[day].timeSlots.map((slot) => ({
// //               start: {
// //                 hour: slot.start.split(":")[0],
// //                 minute: slot.start.split(":")[1],
// //               },
// //               end: {
// //                 hour: slot.end.split(":")[0],
// //                 minute: slot.end.split(":")[1],
// //               },
// //             }))
// //             : [],
// //         };
// //       });

// //       const requestBody = {
// //         weeklyhours,
// //       };

// //       fetch(`http://localhost:8000/schedules/${selectedScheduleId}`, {
// //         method: "PATCH",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `${token}`,
// //         },
// //         body: JSON.stringify(requestBody),
// //       })
// //         .then((response) => response.json())
// //         .then((data) => {
// //           console.log("Schedule updated successfully:", data);
// //           toast.success('Schedule updated successfully.', { position: 'top-center', autoClose: 1000 });
// //           dispatch(setScheduleData(weeklyhours));
// //         })
// //         .catch((error) => {
// //           console.error("Error updating schedule:", error);
// //           toast.error('Error updating schedule. Please try again later.', { position: 'top-center', autoClose: 1000 });
// //         });
// //     } else {
// //       console.error("Token or selected schedule ID not found");
// //     }
// //   };


// //   const handleScheduleChange = (selectedSchedule) => {
// //     dispatch(setSelectedSchedule1(selectedSchedule));
// //     onScheduleChange(selectedSchedule);
// //     const selectedScheduleData = schedules.find(
// //       (schedule) => schedule.name === selectedSchedule
// //     );

// //     if (selectedScheduleData) {
// //       setSelectedScheduleId(selectedScheduleData.id);
// //       const fetchedWeeklyHours = selectedScheduleData.weeklyhours;
// //       setFetchedWeeklyName(selectedSchedule);

// //       dispatch(setScheduleData(fetchedWeeklyHours));

// //       setTextboxCounts((prevCounts) => ({
// //         ...prevCounts,
// //         ...Object.fromEntries(
// //           daysOfWeek.map((day) => {
// //             const apiDayIndex = fetchedWeeklyHours.findIndex(
// //               (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
// //             );

// //             if (apiDayIndex !== -1) {
// //               const apiDay = fetchedWeeklyHours[apiDayIndex];
// //               return [
// //                 day,
// //                 {
// //                   count: apiDay.slots.length,
// //                   isChecked: apiDay.slots.length > 0,
// //                   timeSlots: apiDay.slots.map((slot, index) => ({
// //                     id: index,
// //                     start: `${slot.start.hour}:${slot.start.minute}`,
// //                     end: `${slot.end.hour}:${slot.end.minute}`,
// //                   })),
// //                 },
// //               ];
// //             } else {
// //               return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
// //             }
// //           })
// //         ),
// //       }));
// //     }
// //   };

// //   const timeOptions = [];
// //   for (let hour = 0; hour <= 23; hour++) {
// //     for (let minute = 0; minute < 60; minute += 15) {
// //       const formattedHour = hour.toString().padStart(2, "0");
// //       const formattedMinute = minute.toString().padStart(2, "0");
// //       const time = `${formattedHour}:${formattedMinute}`;
// //       timeOptions.push(time);
// //     }
// //   }
// //   timeOptions.push("24:00");

// //   const handleCheckboxChange = (day) => {
// //     setTextboxCounts((prevCounts) => {
// //       const updatedTimeSlots = prevCounts[day].isChecked
// //         ? prevCounts[day].timeSlots.map((slot) => ({
// //           ...slot,
// //           start: "15:00",
// //           end: "16:00",
// //         }))
// //         : [generateTimeSlot()];

// //       return {
// //         ...prevCounts,
// //         [day]: {
// //           ...prevCounts[day],
// //           isChecked: !prevCounts[day].isChecked,
// //           timeSlots: updatedTimeSlots,
// //           count: updatedTimeSlots.length,
// //         },
// //       };
// //     });
// //   };

// //   const handleAddTextbox = (day) => {
// //     setTextboxCounts((prevCounts) => {
// //       const lastTimeSlot = prevCounts[day].timeSlots[prevCounts[day].count - 1];
// //       const newStartHour = lastTimeSlot.end.split(":")[0];
// //       const newStartMinute = lastTimeSlot.end.split(":")[1];

// //       const newEndHour = (parseInt(newStartHour) + 1).toString().padStart(2, "0");
// //       const newEndMinute = newStartMinute;

// //       const newTimeSlot = generateTimeSlot();
// //       newTimeSlot.start = `${newStartHour}:${newStartMinute}`;
// //       newTimeSlot.end = `${newEndHour}:${newEndMinute}`;

// //       return {
// //         ...prevCounts,
// //         [day]: {
// //           ...prevCounts[day],
// //           count: prevCounts[day].count + 1,
// //           timeSlots: [...prevCounts[day].timeSlots, newTimeSlot],
// //         },
// //       };
// //     });
// //   };

// //   const handleRemoveTimeSlot = (day, id) => {
// //     setTextboxCounts((prevCounts) => {
// //       const newCounts = { ...prevCounts };
// //       newCounts[day].timeSlots = newCounts[day].timeSlots.filter(
// //         (slot) => slot.id !== id
// //       );
// //       newCounts[day].count = newCounts[day].timeSlots.length;

// //       if (newCounts[day].count === 0) {
// //         newCounts[day].isChecked = false;
// //       }

// //       return newCounts;
// //     });
// //   };

// //   const checkForTimeSlotOverlap = (timeSlots) => {
// //     for (let i = 0; i < timeSlots.length - 1; i++) {
// //       for (let j = i + 1; j < timeSlots.length; j++) {
// //         const startTime1 = timeSlots[i].start;
// //         const endTime1 = timeSlots[i].end;
// //         const startTime2 = timeSlots[j].start;
// //         const endTime2 = timeSlots[j].end;

// //         // Check for overlap
// //         if (
// //           (startTime1 <= startTime2 && endTime1 >= startTime2) ||
// //           (startTime2 <= startTime1 && endTime2 >= startTime1)
// //         ) {
// //           return true; // Overlapping time slots found
// //         }
// //       }
// //     }

// //     return false; // No overlapping time slots
// //   };

// //   // Inside handleTimeSlotChange function
// //   const handleTimeSlotChange = (day, id, field, value) => {
// //     setTextboxCounts((prevCounts) => {
// //       const newCounts = { ...prevCounts };
// //       const index = newCounts[day].timeSlots.findIndex(
// //         (slot) => slot.id === id
// //       );
// //       newCounts[day].timeSlots[index][field] = value;

// //       // Compare start and end times
// //       const startTime = newCounts[day].timeSlots[index].start;
// //       const endTime = newCounts[day].timeSlots[index].end;
// //       const hasOverlap = checkForTimeSlotOverlap(newCounts[day].timeSlots);

// //       if (endTime === startTime) {
// //         newCounts[day].timeSlots[index].error = "Start and End time cannot be the same";
// //       }
// //       // Validation 2: End time cannot be less than Start time
// //       else if (endTime < startTime) {
// //         newCounts[day].timeSlots[index].error = "End time cannot be less than Start time";
// //       }
// //       // Validation 3: Additional custom validation
// //       else if (hasOverlap) {
// //         newCounts[day].timeSlots[index].error = "Times overlap with another set of times";
// //       }
// //       // Clear error if no issue
// //       else {
// //         newCounts[day].timeSlots[index].error = null;
// //       }

// //       const hasGlobalErrors = Object.values(newCounts).some((day) =>
// //         day.timeSlots.some((slot) => slot.error)
// //       );

// //       setGlobalErrors(hasGlobalErrors);

// //       return newCounts;
// //     });
// //   };



// //   const location = useLocation();

// //   const goToMeetingSettings = () => {
// //     const urlParams = new URLSearchParams(location.search);
// //     const meetingId = urlParams.get('id');

// //     if (meetingId) {
// //       navigate(`/meetingsetting?id=${meetingId}`);
// //     } else {
// //       console.error('Meeting ID not found in URL params');
// //     }
// //   };

// //   return (
// //     <>
// //       <ToastContainer />
// //       <div className="sidebar-block">
// //         <nav id="sidebar" className="sidebar-wrapper toggled">
// //           <div
// //             className="sidebar-content"
// //             data-simplebar=""
// //             style={{ height: "calc(100% - 60px)" }}
// //           >
// //             <div className="create-meeting mt-3 p-3">
// //               <button className="meeting-cancel" onClick={goToMeetingSettings}>
// //                 <span className="mdi mdi-arrow-left-thick"></span>Event Type
// //                 Summary
// //               </button>
// //               <h4 className="mt-3">Scheduling settings</h4>
// //             </div>
// //             <hr />
// //             <div className="d-flex flex-column meeting-detail p-3">
// //               <div>
// //                 <select
// //                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
// //                   value={
// //                     fetchedWeeklyName ||
// //                     (scheduleNames.length > 0 ? scheduleNames[0] : "")
// //                   }
// //                   onChange={(e) => handleScheduleChange(e.target.value)}
// //                 >
// //                   {scheduleNames.map((name, i) => (
// //                     <option key={i} value={name}>
// //                       {name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <h6>Weekly hours</h6>
// //               <div className="d-flex flex-column ">
// //                 {daysOfWeek.map((day) => (
// //                   <div
// //                     key={day}
// //                     className="weeklyhours-container d-flex align-items-baseline"
// //                   >
// //                     <div className="checkbox-input mb-2 me-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={textboxCounts[day].isChecked}
// //                         onChange={() => handleCheckboxChange(day)}
// //                       />
// //                     </div>
// //                     <div className="w-10">
// //                       <label className="weekly-hour">{day}</label>
// //                     </div>
// //                     {textboxCounts[day].isChecked ? (
// //                       <>
// //                         <div className="textbox-input dropdown-width-se">
// //                           {textboxCounts[day].timeSlots.map((timeSlot) => (
// //                             <React.Fragment key={timeSlot.id}>
// //                               <div className="d-flex">
// //                                 <select
// //                                   className="form-control weekly-hour-textbox d-inline-block w-50"
// //                                   value={timeSlot.start}
// //                                   onChange={(e) =>
// //                                     handleTimeSlotChange(
// //                                       day,
// //                                       timeSlot.id,
// //                                       "start",
// //                                       e.target.value
// //                                     )
// //                                   }
// //                                 >
// //                                   {timeOptions.map((option, i) => (
// //                                     <option key={i} value={option}>
// //                                       {option}
// //                                     </option>
// //                                   ))}
// //                                 </select>
// //                                 <label className="mt-2 mx-2">-</label>
// //                                 <select
// //                                   className={`form-control mb-3 weekly-hour-textbox d-inline-block w-50 ${textboxCounts[day].error ? "" : ""
// //                                     }`}
// //                                   value={timeSlot.end}
// //                                   onChange={(e) =>
// //                                     handleTimeSlotChange(
// //                                       day,
// //                                       timeSlot.id,
// //                                       "end",
// //                                       e.target.value
// //                                     )
// //                                   }
// //                                 >
// //                                   {timeOptions.map((option, i) => (
// //                                     <option key={i} value={option}>
// //                                       {option}
// //                                     </option>
// //                                   ))}
// //                                 </select>

// //                                 <span
// //                                   className="mdi mdi-close mt-2 mx-2"
// //                                   onClick={() =>
// //                                     handleRemoveTimeSlot(day, timeSlot.id)
// //                                   }
// //                                 ></span>
// //                               </div>

// //                               {timeSlot.error && (
// //                                 <label className="error-label text-danger">
// //                                   {timeSlot.error}
// //                                 </label>
// //                               )}
// //                             </React.Fragment>
// //                           ))}
// //                         </div>

// //                         <div>
// //                           <span
// //                             className="mdi mdi-plus mb-3"
// //                             onClick={() => handleAddTextbox(day)}
// //                           ></span>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <div>
// //                         <label className="unavailable-label">Unavailable</label>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //                 <div className="meeting-controller d-flex justify-content-start me-4">
// //                   <button
// //                     className="btn btn-primary"
// //                     onClick={handleUpdateButtonClick}
// //                     disabled={globalErrors}
// //                   >
// //                     Update
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //     </>
// //   );
// // };

// // export default Schedulesettingsidebar;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { useDispatch } from 'react-redux';
// // import { setScheduleData } from './actions/meetingActions';
// // import { useSelector } from 'react-redux';
// // import { setSelectedSchedule as setSelectedSchedule1 } from './actions/meetingActions';
// // import { SET_SELECTED_SCHEDULE } from './actions/type';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const Schedulesettingsidebar = ({ onScheduleChange, scheduleId, weeklyhours }) => {
// //   const scheduleData = useSelector(state => state.meetings.scheduleData);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [globalErrors, setGlobalErrors] = useState(false);

// //   const dispatch = useDispatch();
// //   const [selectedSchedule, setSelectedSchedule] = useState("");
// //   const [fetchedWeeklyName, setFetchedWeeklyName] = useState("");
// //   const [scheduleNames, setScheduleNames] = useState([]);
// //   const [textboxCounts, setTextboxCounts] = useState({
// //     SUN: { count: 1, isChecked: true, timeSlots: [] },
// //     MON: { count: 1, isChecked: true, timeSlots: [] },
// //     TUE: { count: 1, isChecked: true, timeSlots: [] },
// //     WED: { count: 1, isChecked: true, timeSlots: [] },
// //     THU: { count: 1, isChecked: true, timeSlots: [] },
// //     FRI: { count: 1, isChecked: true, timeSlots: [] },
// //     SAT: { count: 1, isChecked: true, timeSlots: [] },
// //   });

// //   const [selectedScheduleId, setSelectedScheduleId] = useState(null);
// //   const [selectedScheduleName, setSelectedScheduleName] = useState("");
// //   const [schedules, setSchedules] = useState([]);
// //   const navigate = useNavigate();

// //   const mapApiDayToDisplayOrder = (apiDay) => {
// //     const displayOrder = [0, 1, 2, 3, 4, 5, 6];
// //     return displayOrder.indexOf(apiDay);
// //   };

// //   const generateTimeSlot = () => {
// //     return { id: Date.now(), start: "09:00", end: "18:00" };
// //   };

// //   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// //   useEffect(() => {
// //     const token = sessionStorage.getItem('userToken');

// //     if (token) {
// //       const [header, payload, signature] = token.split('.');
// //       const decodedHeader = JSON.parse(atob(header));
// //       const decodedPayload = JSON.parse(atob(payload));

// //       const UserId = decodedPayload.id;

// //       fetch(`http://localhost:8000/schedule/${UserId}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `${token}`,
// //         },
// //       })
// //         .then(response => {
// //           if (!response.ok) {
// //             throw new Error('Failed to fetch data');
// //           }
// //           return response.json();
// //         })
// //         .then(data => {
// //           setLoading(false);
// //           if (Array.isArray(data) && data.length > 0) {
// //             const fetchedWeeklyHours = data[0].weeklyhours;
// //             const scheduleData = fetchedWeeklyHours;
// //             dispatch(setScheduleData(scheduleData));
// //             const fetchedWeeklyName = data[0].name;
// //             setFetchedWeeklyName(fetchedWeeklyName);
// //             setScheduleNames(data.map(schedule => schedule.name));

// //             setTextboxCounts((prevCounts) => ({
// //               ...prevCounts,
// //               ...Object.fromEntries(
// //                 daysOfWeek.map((day) => {
// //                   const apiDayIndex = fetchedWeeklyHours.findIndex(
// //                     (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
// //                   );

// //                   if (apiDayIndex !== -1) {
// //                     const apiDay = fetchedWeeklyHours[apiDayIndex];
// //                     return [
// //                       day,
// //                       {
// //                         count: apiDay.slots.length,
// //                         isChecked: apiDay.slots.length > 0,
// //                         timeSlots: apiDay.slots.map((slot, index) => ({
// //                           id: index,
// //                           start: `${slot.start.hour}:${slot.start.minute}`,
// //                           end: `${slot.end.hour}:${slot.end.minute}`,
// //                         })),
// //                       },
// //                     ];
// //                   } else {
// //                     return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
// //                   }
// //                 })
// //               ),
// //             }));

// //             setSelectedScheduleId(data[0].id);
// //             console.log("Selected Schedule ID:", data[0].id); // Log the ID to the console
// //           } else {
// //             console.warn('Invalid data format or empty array');
// //           }
// //           setSchedules(data);
// //         })
// //         .catch(error => {
// //           console.error('Error fetching schedules:', error);
// //           setLoading(false);
// //           setError('Failed to fetch data. Please try again later.');
// //         });
// //     } else {
// //       console.error('Token not found');
// //     }
// //   }, []);

// //   const handleUpdateButtonClick = () => {
// //     const token = sessionStorage.getItem("userToken");

// //     if (token && selectedScheduleId !== null) {
// //       const weeklyhours = daysOfWeek.map((day) => {
// //         return {
// //           day: daysOfWeek.indexOf(day) + 0,
// //           slots: textboxCounts[day].isChecked
// //             ? textboxCounts[day].timeSlots.map((slot) => ({
// //               start: {
// //                 hour: slot.start.split(":")[0],
// //                 minute: slot.start.split(":")[1],
// //               },
// //               end: {
// //                 hour: slot.end.split(":")[0],
// //                 minute: slot.end.split(":")[1],
// //               },
// //             }))
// //             : [],
// //         };
// //       });

// //       const requestBody = {
// //         weeklyhours,
// //       };

// //       fetch(`http://localhost:8000/schedules/${selectedScheduleId}`, {
// //         method: "PATCH",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `${token}`,
// //         },
// //         body: JSON.stringify(requestBody),
// //       })
// //         .then((response) => response.json())
// //         .then((data) => {
// //           console.log("Schedule updated successfully:", data);
// //           toast.success('Schedule updated successfully.', { position: 'top-center', autoClose: 1000 });
// //           dispatch(setScheduleData(weeklyhours));
// //         })
// //         .catch((error) => {
// //           console.error("Error updating schedule:", error);
// //           toast.error('Error updating schedule. Please try again later.', { position: 'top-center', autoClose: 1000 });
// //         });
// //     } else {
// //       console.error("Token or selected schedule ID not found");
// //     }
// //   };


// //   const handleScheduleChange = (selectedSchedule) => {
// //     dispatch(setSelectedSchedule1(selectedSchedule));
// //     onScheduleChange(selectedSchedule);
// //     const selectedScheduleData = schedules.find(
// //       (schedule) => schedule.name === selectedSchedule
// //     );

// //     if (selectedScheduleData) {
// //       setSelectedScheduleId(selectedScheduleData.id);
// //       console.log("Selected Schedule ID:", selectedScheduleData.id); // Log the ID to the console

// //       const fetchedWeeklyHours = selectedScheduleData.weeklyhours;
// //       setFetchedWeeklyName(selectedSchedule);

// //       dispatch(setScheduleData(fetchedWeeklyHours));

// //       setTextboxCounts((prevCounts) => ({
// //         ...prevCounts,
// //         ...Object.fromEntries(
// //           daysOfWeek.map((day) => {
// //             const apiDayIndex = fetchedWeeklyHours.findIndex(
// //               (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
// //             );

// //             if (apiDayIndex !== -1) {
// //               const apiDay = fetchedWeeklyHours[apiDayIndex];
// //               return [
// //                 day,
// //                 {
// //                   count: apiDay.slots.length,
// //                   isChecked: apiDay.slots.length > 0,
// //                   timeSlots: apiDay.slots.map((slot, index) => ({
// //                     id: index,
// //                     start: `${slot.start.hour}:${slot.start.minute}`,
// //                     end: `${slot.end.hour}:${slot.end.minute}`,
// //                   })),
// //                 },
// //               ];
// //             } else {
// //               return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
// //             }
// //           })
// //         ),
// //       }));
// //     }
// //   };


// //   const timeOptions = [];
// //   for (let hour = 0; hour <= 23; hour++) {
// //     for (let minute = 0; minute < 60; minute += 15) {
// //       const formattedHour = hour.toString().padStart(2, "0");
// //       const formattedMinute = minute.toString().padStart(2, "0");
// //       const time = `${formattedHour}:${formattedMinute}`;
// //       timeOptions.push(time);
// //     }
// //   }
// //   timeOptions.push("24:00");

// //   const handleCheckboxChange = (day) => {
// //     setTextboxCounts((prevCounts) => {
// //       const updatedTimeSlots = prevCounts[day].isChecked
// //         ? prevCounts[day].timeSlots.map((slot) => ({
// //           ...slot,
// //           start: "15:00",
// //           end: "16:00",
// //         }))
// //         : [generateTimeSlot()];

// //       return {
// //         ...prevCounts,
// //         [day]: {
// //           ...prevCounts[day],
// //           isChecked: !prevCounts[day].isChecked,
// //           timeSlots: updatedTimeSlots,
// //           count: updatedTimeSlots.length,
// //         },
// //       };
// //     });
// //   };

// //   const handleAddTextbox = (day) => {
// //     setTextboxCounts((prevCounts) => {
// //       const lastTimeSlot = prevCounts[day].timeSlots[prevCounts[day].count - 1];
// //       const newStartHour = lastTimeSlot.end.split(":")[0];
// //       const newStartMinute = lastTimeSlot.end.split(":")[1];

// //       const newEndHour = (parseInt(newStartHour) + 1).toString().padStart(2, "0");
// //       const newEndMinute = newStartMinute;

// //       const newTimeSlot = generateTimeSlot();
// //       newTimeSlot.start = `${newStartHour}:${newStartMinute}`;
// //       newTimeSlot.end = `${newEndHour}:${newEndMinute}`;

// //       return {
// //         ...prevCounts,
// //         [day]: {
// //           ...prevCounts[day],
// //           count: prevCounts[day].count + 1,
// //           timeSlots: [...prevCounts[day].timeSlots, newTimeSlot],
// //         },
// //       };
// //     });
// //   };

// //   const handleRemoveTimeSlot = (day, id) => {
// //     setTextboxCounts((prevCounts) => {
// //       const newCounts = { ...prevCounts };
// //       newCounts[day].timeSlots = newCounts[day].timeSlots.filter(
// //         (slot) => slot.id !== id
// //       );
// //       newCounts[day].count = newCounts[day].timeSlots.length;

// //       if (newCounts[day].count === 0) {
// //         newCounts[day].isChecked = false;
// //       }

// //       return newCounts;
// //     });
// //   };

// //   const checkForTimeSlotOverlap = (timeSlots) => {
// //     for (let i = 0; i < timeSlots.length - 1; i++) {
// //       for (let j = i + 1; j < timeSlots.length; j++) {
// //         const startTime1 = timeSlots[i].start;
// //         const endTime1 = timeSlots[i].end;
// //         const startTime2 = timeSlots[j].start;
// //         const endTime2 = timeSlots[j].end;

// //         // Check for overlap
// //         if (
// //           (startTime1 <= startTime2 && endTime1 >= startTime2) ||
// //           (startTime2 <= startTime1 && endTime2 >= startTime1)
// //         ) {
// //           return true; // Overlapping time slots found
// //         }
// //       }
// //     }

// //     return false; // No overlapping time slots
// //   };

// //   // Inside handleTimeSlotChange function
// //   const handleTimeSlotChange = (day, id, field, value) => {
// //     setTextboxCounts((prevCounts) => {
// //       const newCounts = { ...prevCounts };
// //       const index = newCounts[day].timeSlots.findIndex(
// //         (slot) => slot.id === id
// //       );
// //       newCounts[day].timeSlots[index][field] = value;

// //       // Compare start and end times
// //       const startTime = newCounts[day].timeSlots[index].start;
// //       const endTime = newCounts[day].timeSlots[index].end;
// //       const hasOverlap = checkForTimeSlotOverlap(newCounts[day].timeSlots);

// //       if (endTime === startTime) {
// //         newCounts[day].timeSlots[index].error = "Start and End time cannot be the same";
// //       }
// //       // Validation 2: End time cannot be less than Start time
// //       else if (endTime < startTime) {
// //         newCounts[day].timeSlots[index].error = "End time cannot be less than Start time";
// //       }
// //       // Validation 3: Additional custom validation
// //       else if (hasOverlap) {
// //         newCounts[day].timeSlots[index].error = "Times overlap with another set of times";
// //       }
// //       // Clear error if no issue
// //       else {
// //         newCounts[day].timeSlots[index].error = null;
// //       }

// //       const hasGlobalErrors = Object.values(newCounts).some((day) =>
// //         day.timeSlots.some((slot) => slot.error)
// //       );

// //       setGlobalErrors(hasGlobalErrors);

// //       return newCounts;
// //     });
// //   };



// //   const location = useLocation();

// //   const goToMeetingSettings = () => {
// //     const urlParams = new URLSearchParams(location.search);
// //     const meetingId = urlParams.get('id');

// //     if (meetingId) {
// //       navigate(`/meetingsetting?id=${meetingId}`);
// //     } else {
// //       console.error('Meeting ID not found in URL params');
// //     }
// //   };

// //   return (
// //     <>
// //       <ToastContainer />
// //       <div className="sidebar-block">
// //         <nav id="sidebar" className="sidebar-wrapper toggled">
// //           <div
// //             className="sidebar-content"
// //             data-simplebar=""
// //             style={{ height: "calc(100% - 60px)" }}
// //           >
// //             <div className="create-meeting mt-3 p-3">
// //               <button className="meeting-cancel" onClick={goToMeetingSettings}>
// //                 <span className="mdi mdi-arrow-left-thick"></span>Event Type
// //                 Summary
// //               </button>
// //               <h4 className="mt-3">Scheduling settings</h4>
// //             </div>
// //             <hr />
// //             <div className="d-flex flex-column meeting-detail p-3">
// //               <div>
// //                 <select
// //                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
// //                   value={
// //                     fetchedWeeklyName ||
// //                     (scheduleNames.length > 0 ? scheduleNames[0] : "")
// //                   }
// //                   onChange={(e) => handleScheduleChange(e.target.value)}
// //                 >
// //                   {scheduleNames.map((name, i) => (
// //                     <option key={i} value={name}>
// //                       {name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <h6>Weekly hours</h6>
// //               <div className="d-flex flex-column ">
// //                 {daysOfWeek.map((day) => (
// //                   <div
// //                     key={day}
// //                     className="weeklyhours-container d-flex align-items-baseline"
// //                   >
// //                     <div className="checkbox-input mb-2 me-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={textboxCounts[day].isChecked}
// //                         onChange={() => handleCheckboxChange(day)}
// //                       />
// //                     </div>
// //                     <div className="w-10">
// //                       <label className="weekly-hour">{day}</label>
// //                     </div>
// //                     {textboxCounts[day].isChecked ? (
// //                       <>
// //                         <div className="textbox-input dropdown-width-se">
// //                           {textboxCounts[day].timeSlots.map((timeSlot) => (
// //                             <React.Fragment key={timeSlot.id}>
// //                               <div className="d-flex">
// //                                 <select
// //                                   className="form-control weekly-hour-textbox d-inline-block w-50"
// //                                   value={timeSlot.start}
// //                                   onChange={(e) =>
// //                                     handleTimeSlotChange(
// //                                       day,
// //                                       timeSlot.id,
// //                                       "start",
// //                                       e.target.value
// //                                     )
// //                                   }
// //                                 >
// //                                   {timeOptions.map((option, i) => (
// //                                     <option key={i} value={option}>
// //                                       {option}
// //                                     </option>
// //                                   ))}
// //                                 </select>
// //                                 <label className="mt-2 mx-2">-</label>
// //                                 <select
// //                                   className={`form-control mb-3 weekly-hour-textbox d-inline-block w-50 ${textboxCounts[day].error ? "" : ""
// //                                     }`}
// //                                   value={timeSlot.end}
// //                                   onChange={(e) =>
// //                                     handleTimeSlotChange(
// //                                       day,
// //                                       timeSlot.id,
// //                                       "end",
// //                                       e.target.value
// //                                     )
// //                                   }
// //                                 >
// //                                   {timeOptions.map((option, i) => (
// //                                     <option key={i} value={option}>
// //                                       {option}
// //                                     </option>
// //                                   ))}
// //                                 </select>

// //                                 <span
// //                                   className="mdi mdi-close mt-2 mx-2"
// //                                   onClick={() =>
// //                                     handleRemoveTimeSlot(day, timeSlot.id)
// //                                   }
// //                                 ></span>
// //                               </div>

// //                               {timeSlot.error && (
// //                                 <label className="error-label text-danger">
// //                                   {timeSlot.error}
// //                                 </label>
// //                               )}
// //                             </React.Fragment>
// //                           ))}
// //                         </div>

// //                         <div>
// //                           <span
// //                             className="mdi mdi-plus mb-3"
// //                             onClick={() => handleAddTextbox(day)}
// //                           ></span>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <div>
// //                         <label className="unavailable-label">Unavailable</label>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //                 <div className="meeting-controller d-flex justify-content-start me-4">
// //                   <button
// //                     className="btn btn-primary"
// //                     onClick={handleUpdateButtonClick}
// //                     disabled={globalErrors}
// //                   >
// //                     Update
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //     </>
// //   );
// // };

// // export default Schedulesettingsidebar;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { setScheduleData } from './actions/meetingActions';
// import { useSelector } from 'react-redux';
// import { setSelectedSchedule as setSelectedSchedule1 } from './actions/meetingActions';
// import { SET_SELECTED_SCHEDULE } from './actions/type';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Schedulesettingsidebar = ({ onScheduleChange, scheduleId, weeklyhours }) => {
//   const scheduleData = useSelector(state => state.meetings.scheduleData);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [globalErrors, setGlobalErrors] = useState(false);

//   const dispatch = useDispatch();
//   const [selectedSchedule, setSelectedSchedule] = useState("");
//   const [fetchedWeeklyName, setFetchedWeeklyName] = useState("");
//   const [scheduleNames, setScheduleNames] = useState([]);
//   const [textboxCounts, setTextboxCounts] = useState({
//     SUN: { count: 1, isChecked: true, timeSlots: [] },
//     MON: { count: 1, isChecked: true, timeSlots: [] },
//     TUE: { count: 1, isChecked: true, timeSlots: [] },
//     WED: { count: 1, isChecked: true, timeSlots: [] },
//     THU: { count: 1, isChecked: true, timeSlots: [] },
//     FRI: { count: 1, isChecked: true, timeSlots: [] },
//     SAT: { count: 1, isChecked: true, timeSlots: [] },
//   });

//   const [selectedScheduleId, setSelectedScheduleId] = useState(null);
//   const [selectedScheduleName, setSelectedScheduleName] = useState("");
//   const [schedules, setSchedules] = useState([]);
//   const navigate = useNavigate();

//   const mapApiDayToDisplayOrder = (apiDay) => {
//     const displayOrder = [0, 1, 2, 3, 4, 5, 6];
//     return displayOrder.indexOf(apiDay);
//   };

//   const generateTimeSlot = () => {
//     return { id: Date.now(), start: "09:00", end: "18:00" };
//   };

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   useEffect(() => {
//     const token = sessionStorage.getItem('userToken');

//     if (token) {
//       const [header, payload, signature] = token.split('.');
//       const decodedHeader = JSON.parse(atob(header));
//       const decodedPayload = JSON.parse(atob(payload));

//       const UserId = decodedPayload.id;

//       fetch(`http://localhost:8000/schedule/${UserId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `${token}`,
//         },
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
//           return response.json();
//         })
//         .then(data => {
//           setLoading(false);
//           if (Array.isArray(data) && data.length > 0) {
//             const fetchedWeeklyHours = data[0].weeklyhours;
//             const scheduleData = fetchedWeeklyHours;
//             dispatch(setScheduleData(scheduleData));
//             const fetchedWeeklyName = data[0].name;
//             setFetchedWeeklyName(fetchedWeeklyName);
//             setScheduleNames(data.map(schedule => schedule.name));

//             setTextboxCounts((prevCounts) => ({
//               ...prevCounts,
//               ...Object.fromEntries(
//                 daysOfWeek.map((day) => {
//                   const apiDayIndex = fetchedWeeklyHours.findIndex(
//                     (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
//                   );

//                   if (apiDayIndex !== -1) {
//                     const apiDay = fetchedWeeklyHours[apiDayIndex];
//                     return [
//                       day,
//                       {
//                         count: apiDay.slots.length,
//                         isChecked: apiDay.slots.length > 0,
//                         timeSlots: apiDay.slots.map((slot, index) => ({
//                           id: index,
//                           start: `${slot.start.hour}:${slot.start.minute}`,
//                           end: `${slot.end.hour}:${slot.end.minute}`,
//                         })),
//                       },
//                     ];
//                   } else {
//                     return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
//                   }
//                 })
//               ),
//             }));

//             setSelectedScheduleId(data[0].id);
//             console.log("Selected Schedule ID:", data[0].id); // Log the ID to the console

//             // Update URL params with default selected schedule data
//             const urlParams = new URLSearchParams(location.search);
//             urlParams.set('SId', data[0].id);
//             navigate(`?${urlParams.toString()}`);
//           } else {
//             console.warn('Invalid data format or empty array');
//           }
//           setSchedules(data);
//           console.log(data);
//         })
//         .catch(error => {
//           console.error('Error fetching schedules:', error);
//           setLoading(false);
//           setError('Failed to fetch data. Please try again later.');
//         });
//     } else {
//       console.error('Token not found');
//     }
//   }, []);




//   const handleUpdateButtonClick = () => {
//     const token = sessionStorage.getItem("userToken");

//     if (token && selectedScheduleId !== null) {
//       const weeklyhours = daysOfWeek.map((day) => {
//         return {
//           day: daysOfWeek.indexOf(day) + 0,
//           slots: textboxCounts[day].isChecked
//             ? textboxCounts[day].timeSlots.map((slot) => ({
//               start: {
//                 hour: slot.start.split(":")[0],
//                 minute: slot.start.split(":")[1],
//               },
//               end: {
//                 hour: slot.end.split(":")[0],
//                 minute: slot.end.split(":")[1],
//               },
//             }))
//             : [],
//         };
//       });

//       const requestBody = {
//         weeklyhours,
//       };

//       fetch(`http://localhost:8000/schedules/${selectedScheduleId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Schedule updated successfully:", data);
//           toast.success('Schedule updated successfully.', { position: 'top-center', autoClose: 1000 });
//           dispatch(setScheduleData(weeklyhours));
//         })
//         .catch((error) => {
//           console.error("Error updating schedule:", error);
//           toast.error('Error updating schedule. Please try again later.', { position: 'top-center', autoClose: 1000 });
//         });
//     } else {
//       console.error("Token or selected schedule ID not found");
//     }
//   };


//   const handleScheduleChange = (selectedSchedule) => {
//     dispatch(setSelectedSchedule1(selectedSchedule));
//     onScheduleChange(selectedSchedule);
//     const selectedScheduleData = schedules.find(
//       (schedule) => schedule.name === selectedSchedule
//     );

//     if (selectedScheduleData) {
//       setSelectedScheduleId(selectedScheduleData.id);
//       console.log("Selected Schedule ID:", selectedScheduleData.id); // Log the ID to the console

//       const fetchedWeeklyHours = selectedScheduleData.weeklyhours;
//       setFetchedWeeklyName(selectedSchedule);

//       dispatch(setScheduleData(fetchedWeeklyHours));

//       setTextboxCounts((prevCounts) => ({
//         ...prevCounts,
//         ...Object.fromEntries(
//           daysOfWeek.map((day) => {
//             const apiDayIndex = fetchedWeeklyHours.findIndex(
//               (item) => mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
//             );

//             if (apiDayIndex !== -1) {
//               const apiDay = fetchedWeeklyHours[apiDayIndex];
//               return [
//                 day,
//                 {
//                   count: apiDay.slots.length,
//                   isChecked: apiDay.slots.length > 0,
//                   timeSlots: apiDay.slots.map((slot, index) => ({
//                     id: index,
//                     start: `${slot.start.hour}:${slot.start.minute}`,
//                     end: `${slot.end.hour}:${slot.end.minute}`,
//                   })),
//                 },
//               ];
//             } else {
//               return [day, { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] }];
//             }
//           })
//         ),
//       }));

//       // Update URL params with both schedule name and ID
//       const urlParams = new URLSearchParams(location.search);
//       urlParams.set('SId', selectedScheduleData.id);
//       navigate(`?${urlParams.toString()}`);
//     }
//   };




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
//     setTextboxCounts((prevCounts) => {
//       const updatedTimeSlots = prevCounts[day].isChecked
//         ? prevCounts[day].timeSlots.map((slot) => ({
//           ...slot,
//           start: "15:00",
//           end: "16:00",
//         }))
//         : [generateTimeSlot()];

//       return {
//         ...prevCounts,
//         [day]: {
//           ...prevCounts[day],
//           isChecked: !prevCounts[day].isChecked,
//           timeSlots: updatedTimeSlots,
//           count: updatedTimeSlots.length,
//         },
//       };
//     });
//   };

//   const handleAddTextbox = (day) => {
//     setTextboxCounts((prevCounts) => {
//       const lastTimeSlot = prevCounts[day].timeSlots[prevCounts[day].count - 1];
//       const newStartHour = lastTimeSlot.end.split(":")[0];
//       const newStartMinute = lastTimeSlot.end.split(":")[1];

//       const newEndHour = (parseInt(newStartHour) + 1).toString().padStart(2, "0");
//       const newEndMinute = newStartMinute;

//       const newTimeSlot = generateTimeSlot();
//       newTimeSlot.start = `${newStartHour}:${newStartMinute}`;
//       newTimeSlot.end = `${newEndHour}:${newEndMinute}`;

//       return {
//         ...prevCounts,
//         [day]: {
//           ...prevCounts[day],
//           count: prevCounts[day].count + 1,
//           timeSlots: [...prevCounts[day].timeSlots, newTimeSlot],
//         },
//       };
//     });
//   };

//   const handleRemoveTimeSlot = (day, id) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       newCounts[day].timeSlots = newCounts[day].timeSlots.filter(
//         (slot) => slot.id !== id
//       );
//       newCounts[day].count = newCounts[day].timeSlots.length;

//       if (newCounts[day].count === 0) {
//         newCounts[day].isChecked = false;
//       }

//       return newCounts;
//     });
//   };

//   const checkForTimeSlotOverlap = (timeSlots) => {
//     for (let i = 0; i < timeSlots.length - 1; i++) {
//       for (let j = i + 1; j < timeSlots.length; j++) {
//         const startTime1 = timeSlots[i].start;
//         const endTime1 = timeSlots[i].end;
//         const startTime2 = timeSlots[j].start;
//         const endTime2 = timeSlots[j].end;

//         // Check for overlap
//         if (
//           (startTime1 <= startTime2 && endTime1 >= startTime2) ||
//           (startTime2 <= startTime1 && endTime2 >= startTime1)
//         ) {
//           return true; // Overlapping time slots found
//         }
//       }
//     }

//     return false; // No overlapping time slots
//   };

//   // Inside handleTimeSlotChange function
//   const handleTimeSlotChange = (day, id, field, value) => {
//     setTextboxCounts((prevCounts) => {
//       const newCounts = { ...prevCounts };
//       const index = newCounts[day].timeSlots.findIndex(
//         (slot) => slot.id === id
//       );
//       newCounts[day].timeSlots[index][field] = value;

//       // Compare start and end times
//       const startTime = newCounts[day].timeSlots[index].start;
//       const endTime = newCounts[day].timeSlots[index].end;
//       const hasOverlap = checkForTimeSlotOverlap(newCounts[day].timeSlots);

//       if (endTime === startTime) {
//         newCounts[day].timeSlots[index].error = "Start and End time cannot be the same";
//       }
//       // Validation 2: End time cannot be less than Start time
//       else if (endTime < startTime) {
//         newCounts[day].timeSlots[index].error = "End time cannot be less than Start time";
//       }
//       // Validation 3: Additional custom validation
//       else if (hasOverlap) {
//         newCounts[day].timeSlots[index].error = "Times overlap with another set of times";
//       }
//       // Clear error if no issue
//       else {
//         newCounts[day].timeSlots[index].error = null;
//       }

//       const hasGlobalErrors = Object.values(newCounts).some((day) =>
//         day.timeSlots.some((slot) => slot.error)
//       );

//       setGlobalErrors(hasGlobalErrors);

//       return newCounts;
//     });
//   };



//   const location = useLocation();

//   const goToMeetingSettings = () => {
//     const urlParams = new URLSearchParams(location.search);
//     const meetingId = urlParams.get('id');

//     if (meetingId) {
//       navigate(`/meetingsetting?id=${meetingId}`);
//     } else {
//       console.error('Meeting ID not found in URL params');
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="sidebar-block">
//         <nav id="sidebar" className="sidebar-wrapper toggled">
//           <div
//             className="sidebar-content"
//             data-simplebar=""
//             style={{ height: "calc(100% - 60px)" }}
//           >
//             <div className="create-meeting mt-3 p-3">
//               <button className="meeting-cancel" onClick={goToMeetingSettings}>
//                 <span className="mdi mdi-arrow-left-thick"></span>Event Type
//                 Summary
//               </button>
//               <h4 className="mt-3">Scheduling settings</h4>
//             </div>
//             <hr />
//             <div className="d-flex flex-column meeting-detail p-3">
//               <div>
//                 <select
//                   className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
//                   value={
//                     fetchedWeeklyName ||
//                     (scheduleNames.length > 0 ? scheduleNames[0] : "")
//                   }
//                   onChange={(e) => handleScheduleChange(e.target.value)}
//                 >
//                   {scheduleNames.map((name, i) => (
//                     <option key={i} value={name}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <h6>Weekly hours</h6>
//               <div className="d-flex flex-column ">
//                 {daysOfWeek.map((day) => (
//                   <div
//                     key={day}
//                     className="weeklyhours-container d-flex align-items-baseline"
//                   >
//                     <div className="checkbox-input mb-2 me-2">
//                       <input
//                         type="checkbox"
//                         checked={textboxCounts[day].isChecked}
//                         onChange={() => handleCheckboxChange(day)}
//                       />
//                     </div>
//                     <div className="w-10">
//                       <label className="weekly-hour">{day}</label>
//                     </div>
//                     {textboxCounts[day].isChecked ? (
//                       <>
//                         <div className="textbox-input dropdown-width-se">
//                           {textboxCounts[day].timeSlots.map((timeSlot) => (
//                             <React.Fragment key={timeSlot.id}>
//                               <div className="d-flex">
//                                 <select
//                                   className="form-control weekly-hour-textbox d-inline-block w-50"
//                                   value={timeSlot.start}
//                                   onChange={(e) =>
//                                     handleTimeSlotChange(
//                                       day,
//                                       timeSlot.id,
//                                       "start",
//                                       e.target.value
//                                     )
//                                   }
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <label className="mt-2 mx-2">-</label>
//                                 <select
//                                   className={`form-control mb-3 weekly-hour-textbox d-inline-block w-50 ${textboxCounts[day].error ? "" : ""
//                                     }`}
//                                   value={timeSlot.end}
//                                   onChange={(e) =>
//                                     handleTimeSlotChange(
//                                       day,
//                                       timeSlot.id,
//                                       "end",
//                                       e.target.value
//                                     )
//                                   }
//                                 >
//                                   {timeOptions.map((option, i) => (
//                                     <option key={i} value={option}>
//                                       {option}
//                                     </option>
//                                   ))}
//                                 </select>

//                                 <span
//                                   className="mdi mdi-close mt-2 mx-2"
//                                   onClick={() =>
//                                     handleRemoveTimeSlot(day, timeSlot.id)
//                                   }
//                                 ></span>
//                               </div>

//                               {timeSlot.error && (
//                                 <label className="error-label text-danger">
//                                   {timeSlot.error}
//                                 </label>
//                               )}
//                             </React.Fragment>
//                           ))}
//                         </div>

//                         <div>
//                           <span
//                             className="mdi mdi-plus mb-3"
//                             onClick={() => handleAddTextbox(day)}
//                           ></span>
//                         </div>
//                       </>
//                     ) : (
//                       <div>
//                         <label className="unavailable-label">Unavailable</label>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <div className="meeting-controller d-flex justify-content-start me-4">
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleUpdateButtonClick}
//                     disabled={globalErrors}
//                   >
//                     Update
//                   </button>
//                 </div>
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
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setScheduleData } from "./actions/meetingActions";
import { useSelector } from "react-redux";
import { setSelectedSchedule as setSelectedSchedule1 } from "./actions/meetingActions";
import { SET_SELECTED_SCHEDULE } from "./actions/type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Schedulesettingsidebar = ({
  onScheduleChange,
  scheduleId,
  weeklyhours,
}) => {
  const scheduleData = useSelector((state) => state.meetings.scheduleData);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalErrors, setGlobalErrors] = useState(false);

  const dispatch = useDispatch();
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [fetchedWeeklyName, setFetchedWeeklyName] = useState("");
  const [scheduleNames, setScheduleNames] = useState([]);
  const [textboxCounts, setTextboxCounts] = useState({
    SUN: { count: 1, isChecked: true, timeSlots: [] },
    MON: { count: 1, isChecked: true, timeSlots: [] },
    TUE: { count: 1, isChecked: true, timeSlots: [] },
    WED: { count: 1, isChecked: true, timeSlots: [] },
    THU: { count: 1, isChecked: true, timeSlots: [] },
    FRI: { count: 1, isChecked: true, timeSlots: [] },
    SAT: { count: 1, isChecked: true, timeSlots: [] },
  });

  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [selectedScheduleName, setSelectedScheduleName] = useState("");
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  const mapApiDayToDisplayOrder = (apiDay) => {
    const displayOrder = [0, 1, 2, 3, 4, 5, 6];
    return displayOrder.indexOf(apiDay);
  };

  const generateTimeSlot = () => {
    return { id: Date.now(), start: "09:00", end: "18:00" };
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");

    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));

      const UserId = decodedPayload.id;

      fetch(`http://localhost:8000/schedule/${UserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          if (Array.isArray(data) && data.length > 0) {
            const fetchedWeeklyHours = data[0].weeklyhours;
            const scheduleData = fetchedWeeklyHours;
            dispatch(setScheduleData(scheduleData));
            const fetchedWeeklyName = data[0].name;
            setFetchedWeeklyName(fetchedWeeklyName);
            setScheduleNames(data.map((schedule) => schedule.name));

            setTextboxCounts((prevCounts) => ({
              ...prevCounts,
              ...Object.fromEntries(
                daysOfWeek.map((day) => {
                  const apiDayIndex = fetchedWeeklyHours.findIndex(
                    (item) =>
                      mapApiDayToDisplayOrder(item.day) ===
                      daysOfWeek.indexOf(day)
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
                    return [
                      day,
                      {
                        count: 1,
                        isChecked: false,
                        timeSlots: [generateTimeSlot()],
                      },
                    ];
                  }
                })
              ),
            }));

            setSelectedScheduleId(data[0].id);
            // console.log("Selected Schedule ID:", data[0].id); // Log the ID to the console

            // Update URL params with default selected schedule data
            const urlParams = new URLSearchParams(location.search);
            urlParams.set("SId", data[0].id);
            navigate(`?${urlParams.toString()}`);
          } else {
            console.warn("Invalid data format or empty array");
          }
          setSchedules(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching schedules:", error);
          setLoading(false);
          setError("Failed to fetch data. Please try again later.");
        });
    } else {
      console.error("Token not found");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleUpdateButtonClick = () => {
    const token = sessionStorage.getItem("userToken");

    if (token && selectedScheduleId !== null) {
      const weeklyhours = daysOfWeek.map((day) => {
        return {
          day: daysOfWeek.indexOf(day) + 0,
          slots: textboxCounts[day].isChecked
            ? textboxCounts[day].timeSlots.map((slot) => ({
              start: {
                hour: slot.start.split(":")[0],
                minute: slot.start.split(":")[1],
              },
              end: {
                hour: slot.end.split(":")[0],
                minute: slot.end.split(":")[1],
              },
            }))
            : [],
        };
      });

      const requestBody = {
        weeklyhours,
      };

      fetch(`http://localhost:8000/schedules/${selectedScheduleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Schedule updated successfully:", data);
          toast.success("Schedule updated successfully.", {
            position: "top-center",
            autoClose: 1000,
          });
          dispatch(setScheduleData(weeklyhours));
        })
        .catch((error) => {
          console.error("Error updating schedule:", error);
          toast.error("Error updating schedule. Please try again later.", {
            position: "top-center",
            autoClose: 1000,
          });
        });
    } else {
      console.error("Token or selected schedule ID not found");
    }
  };

  const handleScheduleChange = (selectedSchedule) => {
    dispatch(setSelectedSchedule1(selectedSchedule));
    onScheduleChange(selectedSchedule);
    const selectedScheduleData = schedules.find(
      (schedule) => schedule.name === selectedSchedule
    );

    if (selectedScheduleData) {
      setSelectedScheduleId(selectedScheduleData.id);
      console.log("Selected Schedule ID:", selectedScheduleData.id); // Log the ID to the console

      const fetchedWeeklyHours = selectedScheduleData.weeklyhours;
      setFetchedWeeklyName(selectedSchedule);

      dispatch(setScheduleData(fetchedWeeklyHours));

      setTextboxCounts((prevCounts) => ({
        ...prevCounts,
        ...Object.fromEntries(
          daysOfWeek.map((day) => {
            const apiDayIndex = fetchedWeeklyHours.findIndex(
              (item) =>
                mapApiDayToDisplayOrder(item.day) === daysOfWeek.indexOf(day)
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
              return [
                day,
                { count: 1, isChecked: false, timeSlots: [generateTimeSlot()] },
              ];
            }
          })
        ),
      }));

      // Update URL params with both schedule name and ID
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("SId", selectedScheduleData.id);
      navigate(`?${urlParams.toString()}`);
    }
  };

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
    setTextboxCounts((prevCounts) => {
      const updatedTimeSlots = prevCounts[day].isChecked
        ? prevCounts[day].timeSlots.map((slot) => ({
          ...slot,
          start: "15:00",
          end: "16:00",
        }))
        : [generateTimeSlot()];

      return {
        ...prevCounts,
        [day]: {
          ...prevCounts[day],
          isChecked: !prevCounts[day].isChecked,
          timeSlots: updatedTimeSlots,
          count: updatedTimeSlots.length,
        },
      };
    });
  };

  const handleAddTextbox = (day) => {
    setTextboxCounts((prevCounts) => {
      const lastTimeSlot = prevCounts[day].timeSlots[prevCounts[day].count - 1];
      const newStartHour = lastTimeSlot.end.split(":")[0];
      const newStartMinute = lastTimeSlot.end.split(":")[1];

      const newEndHour = (parseInt(newStartHour) + 1)
        .toString()
        .padStart(2, "0");
      const newEndMinute = newStartMinute;

      const newTimeSlot = generateTimeSlot();
      newTimeSlot.start = `${newStartHour}:${newStartMinute}`;
      newTimeSlot.end = `${newEndHour}:${newEndMinute}`;

      return {
        ...prevCounts,
        [day]: {
          ...prevCounts[day],
          count: prevCounts[day].count + 1,
          timeSlots: [...prevCounts[day].timeSlots, newTimeSlot],
        },
      };
    });
  };

  const handleRemoveTimeSlot = (day, id) => {
    setTextboxCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[day].timeSlots = newCounts[day].timeSlots.filter(
        (slot) => slot.id !== id
      );
      newCounts[day].count = newCounts[day].timeSlots.length;

      if (newCounts[day].count === 0) {
        newCounts[day].isChecked = false;
      }

      return newCounts;
    });
  };

  const checkForTimeSlotOverlap = (timeSlots) => {
    for (let i = 0; i < timeSlots.length - 1; i++) {
      for (let j = i + 1; j < timeSlots.length; j++) {
        const startTime1 = timeSlots[i].start;
        const endTime1 = timeSlots[i].end;
        const startTime2 = timeSlots[j].start;
        const endTime2 = timeSlots[j].end;

        // Check for overlap
        if (
          (startTime1 <= startTime2 && endTime1 >= startTime2) ||
          (startTime2 <= startTime1 && endTime2 >= startTime1)
        ) {
          return true; // Overlapping time slots found
        }
      }
    }

    return false; // No overlapping time slots
  };

  // Inside handleTimeSlotChange function
  const handleTimeSlotChange = (day, id, field, value) => {
    setTextboxCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      const index = newCounts[day].timeSlots.findIndex(
        (slot) => slot.id === id
      );
      newCounts[day].timeSlots[index][field] = value;

      // Compare start and end times
      const startTime = newCounts[day].timeSlots[index].start;
      const endTime = newCounts[day].timeSlots[index].end;
      const hasOverlap = checkForTimeSlotOverlap(newCounts[day].timeSlots);

      if (endTime === startTime) {
        newCounts[day].timeSlots[index].error =
          "Start and End time cannot be the same";
      }
      // Validation 2: End time cannot be less than Start time
      else if (endTime < startTime) {
        newCounts[day].timeSlots[index].error =
          "End time cannot be less than Start time";
      }
      // Validation 3: Additional custom validation
      else if (hasOverlap) {
        newCounts[day].timeSlots[index].error =
          "Times overlap with another set of times";
      }
      // Clear error if no issue
      else {
        newCounts[day].timeSlots[index].error = null;
      }

      const hasGlobalErrors = Object.values(newCounts).some((day) =>
        day.timeSlots.some((slot) => slot.error)
      );

      setGlobalErrors(hasGlobalErrors);

      return newCounts;
    });
  };

  // const location = useLocation();

  const goToMeetingSettings = () => {
    const urlParams = new URLSearchParams(location.search);
    const meetingId = urlParams.get("id");

    if (meetingId) {
      navigate(`/meetingsetting?id=${meetingId}`);
    } else {
      console.error("Meeting ID not found in URL params");
    }
  };

  return (
    <>
      <ToastContainer />
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
              <div>
                <select
                  className="form-control mb-3 weekly-hour-textbox d-inline-block w-50"
                  value={
                    fetchedWeeklyName ||
                    (scheduleNames.length > 0 ? scheduleNames[0] : "")
                  }
                  onChange={(e) => handleScheduleChange(e.target.value)}
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
                    <div className="w-10">
                      <label className="weekly-hour">{day}</label>
                    </div>
                    {textboxCounts[day].isChecked ? (
                      <>
                        <div className="textbox-input dropdown-width-se">
                          {textboxCounts[day].timeSlots.map((timeSlot) => (
                            <React.Fragment key={timeSlot.id}>
                              <div className="d-flex">
                                <select
                                  className="form-control weekly-hour-textbox d-inline-block w-50"
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
                                <label className="mt-2 mx-2">-</label>
                                <select
                                  className={`form-control mb-3 weekly-hour-textbox d-inline-block w-50 ${textboxCounts[day].error ? "" : ""
                                    }`}
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
                                  className="mdi mdi-close mt-2 mx-2"
                                  onClick={() =>
                                    handleRemoveTimeSlot(day, timeSlot.id)
                                  }
                                ></span>
                              </div>

                              {timeSlot.error && (
                                <label className="error-label text-danger">
                                  {timeSlot.error}
                                </label>
                              )}
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
                <div className="meeting-controller d-flex justify-content-start me-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateButtonClick}
                    disabled={globalErrors}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Schedulesettingsidebar;