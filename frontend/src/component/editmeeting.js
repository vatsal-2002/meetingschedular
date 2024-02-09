import React, { useState, useEffect } from 'react';
import EditMeetingsidebar from './editmeetingsidebar';
import { useLocation } from "react-router-dom";

const Editmeeting = () => {
    const [meetingName, setMeetingName] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("15");
    const [meetingLocation, setMeetingLocation] = useState("google_meet");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const meetingId = queryParams.get("id");

    useEffect(() => {
        const fetchData = async () => {
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
                setMeetingName(meetingDetailsData.name || "");
                setSelectedDuration(meetingDetailsData.duration || "15");
                setMeetingLocation(meetingDetailsData.location || "googlemeet");
            } catch (error) {
                console.error("Error fetching meeting details:", error);
            }
        };

        fetchData();
    }, []); // Ensure this effect runs only once

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex">
                    <div className="col-3">
                        <div className="page-wrapper toggled">
                            <EditMeetingsidebar
                                initialMeetingName={meetingName}
                                initialSelectedDuration={selectedDuration}
                                initialMeetingLocation={meetingLocation}
                                setMeetingName={setMeetingName}
                                setSelectedDuration={setSelectedDuration}
                                setMeetingLocation={setMeetingLocation}
                                meetingId={meetingId} // Pass the meetingId to EditMeetingsidebar
                            />
                        </div>
                    </div>

                    <div className="col-9 d-flex align-items-center bg-soft-secondary">
                        <div className="container create-preview">
                            <div className='row d-flex'>
                                <p>
                                    This is a preview. To book an event, share the link with your invitees.
                                </p>
                                <div className="col-6 d-flex flex-column p-4">
                                    <label>MEET PATEL</label>
                                    <h3>{meetingName}</h3>
                                    <label><span className="mdi mdi-clock-time-five-outline"></span>{selectedDuration} min</label>
                                    <label><span className="mdi mdi-map-marker"></span>{meetingLocation}</label>
                                </div>
                                <div className="col-6 d-flex align-items-center justify-content-center h-550 preview-right">
                                    <h5 className='text-center'>A preview of your availability will show on the next step</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Editmeeting;