import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Sidebar from "./sidebar";
import Topheader from "./topheader";
import { Timezones_List } from "./timezones";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Availabilityschedules = () => {
    const [scheduleNames, setScheduleNames] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedScheduleName, setSelectedScheduleName] = useState("");
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedTimezone, setSelectedTimezone] = useState("");
    const [newScheduleName, setNewScheduleName] = useState("");
    const [isToggled, setToggled] = useState(true);
    const [showErrorLabel, setShowErrorLabel] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editedScheduleName, setEditedScheduleName] = useState("");
    const [timeSlotErrors, setTimeSlotErrors] = useState({});

    const handleToggle = () => {
        setToggled(!isToggled);
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const generateTimeSlot = () => {
        return { id: Date.now(), start: "15:00", end: "16:00" };
    };

    const handleEditSchedule = () => {
        setEditedScheduleName(selectedScheduleName);
        setEditModalShow(true);
    };

    const handleEditedScheduleNameChange = (e) => {
        setEditedScheduleName(e.target.value);
    };

    const handleSaveEditedScheduleName = async () => {
        // Perform any necessary validation or checks

        if (!editedScheduleName.trim()) {
            // Show an error toast for empty schedule name
            toast.error("Schedule name cannot be empty.", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }

        // Update the dropdown value with the edited schedule name
        setSelectedScheduleName(editedScheduleName);

        // Update the schedule names
        setScheduleNames((prevNames) =>
            prevNames.map((name) =>
                name === selectedScheduleName ? editedScheduleName : name
            )
        );

        // Wait for the state to update before proceeding
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Update the database
        const token = sessionStorage.getItem("userToken");
        if (token && selectedScheduleId !== null) {
            try {
                const response = await fetch(
                    `http://localhost:8000/schedules/${selectedScheduleId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                        },
                        body: JSON.stringify({ name: editedScheduleName }),
                    }
                );

                if (response.ok) {
                    console.log("Schedule name updated in the database");

                    // Show a success toast
                    toast.success("Schedule name updated", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                } else {
                    console.error("Error updating schedule name in the database");

                    // Show an error toast
                    toast.error("Error updating schedule name. Please try again later.", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                console.error("Error updating schedule name in the database:", error);

                // Show an error toast
                toast.error("Error updating schedule name. Please try again later.", {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        }

        // Close the modal
        setEditModalShow(false);
    };

    const handleCancelEdit = () => {
        setEditModalShow(false);
    };

    const handleCreateSchedule = () => {
        if (!newScheduleName.trim()) {
            setShowErrorLabel(true);
            return;
        }

        // Check if the new schedule name already exists in the dropdown options
        if (scheduleNames.includes(newScheduleName)) {
            toast.error("Schedule name already exists. Please choose a different name.", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }

        const token = sessionStorage.getItem("userToken");

        if (token) {
            const [header, payload, signature] = token.split(".");
            const decodedHeader = JSON.parse(atob(header));
            const decodedPayload = JSON.parse(atob(payload));

            const UserId = decodedPayload.id;
            console.log(UserId);

            const isDefault = 0;
            const timezone = "Asia/Kolkata";
            const weeklyhours = [
                {
                    day: 1,
                    slots: [
                        {
                            end: { hour: "18", minute: "00" },
                            start: { hour: "17", minute: "00" },
                        },
                    ],
                },
                {
                    day: 2,
                    slots: [
                        {
                            end: { hour: "17", minute: "00" },
                            start: { hour: "17", minute: "00" },
                        },
                    ],
                },
                {
                    day: 3,
                    slots: [
                        {
                            end: { hour: "17", minute: "00" },
                            start: { hour: "17", minute: "00" },
                        },
                    ],
                },
                {
                    day: 4,
                    slots: [
                        {
                            end: { hour: "17", minute: "00" },
                            start: { hour: "17", minute: "00" },
                        },
                    ],
                },
                {
                    day: 5,
                    slots: [
                        {
                            end: { hour: "17", minute: "00" },
                            start: { hour: "17", minute: "00" },
                        },
                    ],
                },
            ];
            const requestBody = {
                isDefault,
                name: newScheduleName,
                timezone,
                weeklyhours,
            };

            fetch(`http://localhost:8000/schedules`, {
                method: "POST", // Change this to the appropriate HTTP method for your API
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(requestBody),
            })
                .then((response) => {
                    if (response.ok) {
                        // Schedule created successfully
                        return response.json().then((data) => {
                            console.log("Schedule created successfully:", data);
                            toast.success("Schedule created successfully.", {
                                position: "top-center",
                                autoClose: 1000,
                            });

                            // Clear the input box after successful creation
                            setNewScheduleName("");

                            // Close the modal after making the API call
                            handleClose();
                        });
                    } else {
                        // Error creating schedule
                        console.error("Error creating schedule:", response.statusText);
                        toast.error("Error creating schedule. Please try again later.", {
                            position: "top-center",
                            autoClose: 1000,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error creating schedule:", error);
                    toast.error("Error creating schedule. Please try again later.", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                });
        } else {
            console.error("Token not found");
        }
    };


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
        const displayOrder = [0, 1, 2, 3, 4, 5, 6];
        return displayOrder.indexOf(apiDay);
    };

    const getIdFromName = (name) => {
        const schedule = schedules.find((schedule) => schedule.name === name);

        if (schedule) {
            return schedule.id;
        } else {
            console.error(`Schedule with name ${name} not found`);
            return null;
        }
    };

    const handleDeleteSchedule = async () => {
        const token = sessionStorage.getItem("userToken");

        if (token && selectedScheduleId !== null) {
            try {
                const response = await fetch(
                    `http://localhost:8000/schedules/${selectedScheduleId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                        },
                    }
                );

                if (response.ok) {
                    // Update the schedules state
                    const updatedSchedules = schedules.filter(
                        (schedule) => schedule.id !== selectedScheduleId
                    );
                    setSchedules(updatedSchedules);

                    // Update the scheduleNames state without the deleted schedule name
                    const updatedNames = scheduleNames.filter(
                        (name) => name !== selectedScheduleName
                    );
                    setScheduleNames(updatedNames);

                    // Reset the selected schedule if there are remaining schedules
                    if (updatedSchedules.length > 0) {
                        handleScheduleNameChange(updatedSchedules[0].name);
                    } else {
                        // If no schedules left, reset all related states
                        setSelectedScheduleName("");
                        setSelectedTimezone("");
                        setSelectedScheduleId(null);
                        setTextboxCounts((prevCounts) => ({
                            SUN: {
                                count: 1,
                                isChecked: true,
                                timeSlots: [generateTimeSlot()],
                            },
                            MON: {
                                count: 1,
                                isChecked: true,
                                timeSlots: [generateTimeSlot()],
                            },
                            TUE: {
                                count: 1,
                                isChecked: true,
                                timeSlots: [generateTimeSlot()],
                            },
                            WED: {
                                count: 1,
                                isChecked: true,
                                timeSlots: [generateTimeSlot()],
                            },
                            THU: {
                                count: 1,
                                isChecked: true,
                                timeSlots: [generateTimeSlot()],
                            },
                            FRI: {
                                count: 1,
                                isChecked: true,
                                timeSlots: [generateTimeSlot()],
                            },
                            SAT: {
                                count: 1,
                                isChecked: true,
                                timeSlots: [generateTimeSlot()],
                            },
                        }));
                    }

                    console.log("Schedule deleted successfully");
                    toast.success("Schedule Deleted successfully.", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                } else {
                    console.error("Error deleting schedule");
                    toast.error("Error Deleting schedule. Please try again later.", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                console.error("Error deleting schedule:", error);
            }
        } else {
            console.error("Token or selected schedule ID not found");
        }
    };

    const handleScheduleNameChange = (selectedSchedule) => {
        const selectedScheduleData = schedules.find(
            (schedule) => schedule.name === selectedSchedule
        );

        if (selectedScheduleData) {
            const selectedScheduleId = selectedScheduleData.id;

            // Set the selected schedule's weeklyhours and time slots
            const fetchedWeeklyHours = selectedScheduleData.weeklyhours;

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

            // Set other related states
            setSelectedScheduleName(selectedSchedule);
            setSelectedTimezone(selectedScheduleData.timezone);
            setSelectedScheduleId(selectedScheduleId);
        }
    };

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
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                        const fetchedWeeklyHours = data[0].weeklyhours;

                        const scheduleNamesArray = data.map((schedule) => schedule.name);
                        setScheduleNames(scheduleNamesArray);

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

                        setSchedules(data);
                        setSelectedTimezone(data[0].timezone);
                        // Set the default selected schedule to the first one
                        setSelectedScheduleName(scheduleNamesArray[0]);
                        setSelectedScheduleId(data[0].id);
                    } else {
                        console.warn("Invalid data format or empty array");
                    }
                })
                .catch((error) => console.error("Error fetching schedules:", error));
        } else {
            console.error("Token not found");
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

            // If it's the last time slot, uncheck the checkbox and hide the elements
            if (newCounts[day].count === 0) {
                newCounts[day].isChecked = false;
            }

            return newCounts;
        });
    };

    const checkForTimeSlotOverlap = (timeSlots, currentIndex) => {
        const currentSlot = timeSlots[currentIndex];

        for (let i = 0; i < timeSlots.length; i++) {
            if (i !== currentIndex) {
                const otherSlot = timeSlots[i];

                // Check for overlap
                const startsBeforeOtherEnds = currentSlot.start < otherSlot.end;
                const endsAfterOtherStarts = currentSlot.end > otherSlot.start;

                if (startsBeforeOtherEnds && endsAfterOtherStarts) {
                    return true; // Overlapping time slots found
                }
            }
        }

        return false; // No overlap
    };

    const handleTimeSlotChange = (day, id, field, value) => {
        setTextboxCounts((prevCounts) => {
            const newCounts = { ...prevCounts };

            // Find the index of the time slot being edited
            const index = newCounts[day].timeSlots.findIndex(
                (slot) => slot.id === id
            );

            // Update the field value
            newCounts[day].timeSlots[index][field] = value;

            // Check for errors
            const isSameTime =
                newCounts[day].timeSlots[index].start ===
                newCounts[day].timeSlots[index].end;
            const isLessThanStartTime =
                newCounts[day].timeSlots[index].end <
                newCounts[day].timeSlots[index].start;
            const hasOverlap = checkForTimeSlotOverlap(
                newCounts[day].timeSlots,
                index
            );
            // Update the error states
            newCounts[day].timeSlots[index].hasSameTimeError = isSameTime;
            newCounts[day].timeSlots[index].hasLessThanStartTimeError =
                isLessThanStartTime;
            newCounts[day].timeSlots[index].hasOverlapError = hasOverlap;
            // Update the time slot errors
            setTimeSlotErrors((prevErrors) => ({
                ...prevErrors,
                [`${day}_${id}_sameTimeError`]: isSameTime,
                [`${day}_${id}_lessThanStartTimeError`]: isLessThanStartTime,
                [`${day}_${id}_overlapError`]: hasOverlap,
            }));

            return newCounts;
        });
    };

    const handleUpdate = () => {
        const token = sessionStorage.getItem("userToken");

        if (token && selectedScheduleId !== null) {
            const updatedTimezone = selectedTimezone; // Get the updated timezone value from the selectbox
            const timezone = updatedTimezone || selectedTimezone || "Asia/Kolkata"; // Use selectedTimezone if available, otherwise default to "Asia/Kolkata"
            const weeklyhours = daysOfWeek.map((day) => {
                return {
                    day: daysOfWeek.indexOf(day) + 0, // Adjust day index as your API expects
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
                name: selectedScheduleName, // Use the current selected schedule name
                timezone,
                weeklyhours,
            };

            fetch(`http://localhost:8000/schedules/${selectedScheduleId}`, {
                method: "PATCH", // Use PUT to update an existing schedule
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(requestBody),
            })
                .then((response) => {
                    if (response.ok) {
                        // Schedule updated successfully
                        return response.json().then((data) => {
                            console.log("Schedule updated successfully:", data);
                            toast.success("Schedule updated successfully.", {
                                position: "top-center",
                                autoClose: 2000,
                            });
                        });
                    } else {
                        // Error updating schedule
                        return response.json().then((error) => {
                            console.error("Error updating schedule:", error);
                            toast.error("Error updating schedule. Please try again later.", {
                                position: "top-center",
                                autoClose: 2000,
                            });
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error updating schedule:", error);
                    toast.error("Error updating schedule. Please try again later.", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                });
        } else {
            console.error("Token or selected schedule ID not found");
        }
    };

    // const goToMeetingSettings = () => {
    //     navigate("/meetingsetting");
    // };

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
        <>
            <ToastContainer />
            <div className={`page-wrapper ${isToggled ? "toggled" : ""}`}>
                <Sidebar isToggled={isToggled} handleToggle={handleToggle} />
                <main className="page-content bg-light">
                    <Topheader isToggled={isToggled} handleToggle={handleToggle} />
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div>
                                <h4 className="mb-3">Availability</h4>
                                <hr></hr>
                            </div>
                            <div className="row col-9">
                                <div className="card border-0 rounded shadow p-4 test">
                                    <div className="d-flex align-items-baseline">
                                        <h5>Schedule</h5>
                                        <select
                                            className="form-control mb-3 mx-3 weekly-hour-textbox d-inline-block"
                                            value={selectedScheduleName}
                                            name="schedule-name"
                                            onChange={(e) => handleScheduleNameChange(e.target.value)}
                                        >
                                            {scheduleNames.map((name, index) => (
                                                <option key={index} value={name}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>

                                        <h5>Time zone</h5>
                                        <select
                                            className="form-control mb-3 mx-3 weekly-hour-textbox d-inline-block"
                                            value={selectedTimezone}
                                            name="time-zone"
                                            onChange={(e) => setSelectedTimezone(e.target.value)}
                                        >
                                            {Timezones_List.map((timezone, index) => (
                                                <option key={index} value={timezone.timezone}>
                                                    {timezone.timezone}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            href="#"
                                            className="btn btn-outline-primary"
                                            onClick={handleShow}
                                        >
                                            Create schedule
                                        </button>

                                        <Modal show={show} onHide={handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>New schedule</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Schedule name
                                                <input
                                                    type="text"
                                                    className={`form-control`}
                                                    placeholder="Working Hours, Exclusive Hours, etc..."
                                                    value={newScheduleName}
                                                    onChange={(e) => setNewScheduleName(e.target.value)}
                                                    onFocus={() => setShowErrorLabel(false)} // Hide error label on focus
                                                />
                                                {showErrorLabel && !newScheduleName.trim() && (
                                                    <label className="error-label text-danger">
                                                        Schedule name cannot be empty
                                                    </label>
                                                )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={handleClose}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleCreateSchedule}
                                                >
                                                    Create
                                                </button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Modal show={editModalShow} onHide={handleCancelEdit}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Schedule Name</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <label>Schedule Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedScheduleName}
                                                    onChange={handleEditedScheduleNameChange}
                                                />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleSaveEditedScheduleName}
                                                >
                                                    Save
                                                </button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Dropdown className="index-dropdown mx-2">
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                <span className="mdi mdi-cog" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <span
                                                        className="mdi mdi-pencil"
                                                        onClick={handleEditSchedule}
                                                    >
                                                        Edit
                                                    </span>
                                                </Dropdown.Item>
                                                {scheduleNames.length > 1 && (
                                                    <Dropdown.Item>
                                                        <span
                                                            className="mdi mdi-delete"
                                                            onClick={handleDeleteSchedule}
                                                        >
                                                            Delete
                                                        </span>
                                                    </Dropdown.Item>
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <hr />
                                    <div className="d-flex flex-column ">
                                        <h5 className="mb-4">Weekly hours</h5>
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
                                                <div className="w-4">
                                                    <label className="weekly-hour">{day}</label>
                                                </div>
                                                {textboxCounts[day].isChecked ? (
                                                    <>
                                                        <div className="textbox-input dropdown-width">
                                                            {textboxCounts[day].timeSlots.map((timeSlot) => (
                                                                <React.Fragment key={timeSlot.id}>
                                                                    {timeSlot.hidden ? null : (
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
                                                                            <label className="mt-2 mx-2">-</label>
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
                                                                                className="mdi mdi-close mt-2 mx-2"
                                                                                onClick={() =>
                                                                                    handleRemoveTimeSlot(day, timeSlot.id)
                                                                                }
                                                                            ></span>
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        {timeSlot.hasSameTimeError && (
                                                                            <label className="error-label text-danger">
                                                                                Start and End time cannot be the same
                                                                            </label>
                                                                        )}
                                                                        {timeSlot.hasLessThanStartTimeError && (
                                                                            <label className="error-label text-danger">
                                                                                End time cannot be less than Start time
                                                                            </label>
                                                                        )}
                                                                        {timeSlot.hasOverlapError && (
                                                                            <label className="error-label text-danger">
                                                                                Times overlap with another set of times.
                                                                            </label>
                                                                        )}
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
                                                        <label className="unavailable-label">
                                                            Unavailable
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="meeting-controller d-flex justify-content-start me-4">
                                        {/* <button className="meeting-cancel">Cancel</button> */}
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleUpdate}
                                            disabled={Object.values(timeSlotErrors).some(
                                                (error) => error
                                            )}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Availabilityschedules;
