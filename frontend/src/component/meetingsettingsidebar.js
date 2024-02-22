// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { setCurrentMeeting } from './actions/meetingActions';

// const Meetingsettingsidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [meetingDetails, setMeetingDetails] = useState(null);

//   // Get the current meeting from the Redux store
//   const currentMeeting = useSelector(state => state.meetings.currentMeeting);

//   // Extract the meetingId from the query parameters
//   const meetingId = new URLSearchParams(location.search).get('id');

//   useEffect(() => {
//     const fetchMeetingDetails = async () => {
//       try {
//         const userToken = sessionStorage.getItem("userToken");

//         const response = await fetch(
//           `http://localhost:8000/meetingSettings/${meetingId}`, // Use the meetingId from query parameters
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

//         const meetingDetailsData = await response.json();
//         setMeetingDetails(meetingDetailsData);
//       } catch (error) {
//         console.error("Error fetching meeting details:", error.message);
//       }
//     };

//     if (meetingId) {
//       fetchMeetingDetails();
//     }
//   }, [meetingId]); // Include meetingId in the dependency array

//   const handleMeetingDetailsClick = () => {
//     if (meetingDetails) {
//       dispatch(setCurrentMeeting(meetingDetails)); // Dispatch action to set current meeting details in Redux store
//       // Navigate to EditMeetingsidebar with the id in query parameters
//       navigate(`/editmeeting?id=${meetingId}`);
//     }
//   };

//   return (
//     <div className="sidebar-block">
//       <nav id="sidebar" className="sidebar-wrapper toggled">
//         <div
//           className="sidebar-content"
//           data-simplebar=""
//           style={{ height: "calc(100% - 60px)" }}
//         >
//           <div className="create-meeting mt-3 p-3">
//             <Link to={`/index`}>
//               <button className="meeting-cancel">
//                 <span className="mdi mdi-arrow-left-thick"></span>Cancel
//               </button>
//             </Link>
//             <h4 className="mt-3">{meetingDetails ? meetingDetails.name : ""}</h4>
//           </div>
//           <hr />
//           <div className="d-flex flex-column meeting-detail p-4">
//             <div
//               className="meetingsetting-meetingdetail  meetingsettingondetail"
//               onClick={handleMeetingDetailsClick}
//             >
//               <h5>
//                 <span className="mdi mdi-view-headline"></span> Meeting
//                 Details
//               </h5>
//               <h6 className="mx-4">{meetingDetails ? meetingDetails.duration + " min" : ""}</h6>
//             </div>
//             <hr />
//             <Link
//               to={`/schedulesetting`} // Include meetingId in the query parameters
//               className="meetingsetting-SchedulingSettings"
//             >
//               <h5>
//                 <span className="mdi mdi-calendar-text"></span> Scheduling
//                 settings
//               </h5>
//               <h6 className="mx-4">30 rolling calendar days</h6>
//               <h6 className="mx-4">Weekdays, hours vary</h6>
//             </Link>

//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Meetingsettingsidebar;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { setCurrentMeeting } from './actions/meetingActions';

const Meetingsettingsidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [meetingDetails, setMeetingDetails] = useState(null);


  const currentMeeting = useSelector(state => state.meetings.currentMeeting);


  const meetingId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchMeetingDetails = async () => {
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

        const meetingDetailsData = await response.json();
        setMeetingDetails(meetingDetailsData);
      } catch (error) {
        console.error("Error fetching meeting details:", error.message);
      }
    };

    if (meetingId) {
      fetchMeetingDetails();
    }
  }, [meetingId]);

  const handleMeetingDetailsClick = () => {
    if (meetingDetails) {
      dispatch(setCurrentMeeting(meetingDetails));

      navigate(`/editmeeting?id=${meetingId}`);
    }
  };

  return (
    <div className="sidebar-block">
      <nav id="sidebar" className="sidebar-wrapper toggled">
        <div
          className="sidebar-content"
          data-simplebar=""
          style={{ height: "calc(100% - 60px)" }}
        >
          <div className="create-meeting mt-3 p-3">
            <Link to={`/event`}>
              <button className="meeting-cancel">
                <span className="mdi mdi-arrow-left-thick"></span>Cancel
              </button>
            </Link>
            <h4 className="mt-3">{meetingDetails ? meetingDetails.name : ""}</h4>
          </div>
          <hr />
          <div className="d-flex flex-column meeting-detail p-4">
            <div
              className="meetingsetting-meetingdetail  meetingsettingondetail"
              onClick={handleMeetingDetailsClick}
            >
              <h5>
                <span className="mdi mdi-view-headline"></span> Meeting
                Details
              </h5>
              <h6 className="mx-4">{meetingDetails ? meetingDetails.duration + " min" : ""}</h6>
            </div>
            <hr />
            <Link
              to={`/schedulesetting?id=${meetingId}`}
              className="meetingsetting-SchedulingSettings"
            >
              <h5>
                <span className="mdi mdi-calendar-text"></span> Scheduling
                settings
              </h5>
              <h6 className="mx-4">30 rolling calendar days</h6>
              <h6 className="mx-4">Weekdays, hours vary</h6>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Meetingsettingsidebar;
