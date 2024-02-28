// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';

// const Meeting = () => {
//   const [userFullName, setUserFullName] = useState('');
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const meetingDetails = location.state;


//   useEffect(() => {
//     console.log("Meeting details:", meetingDetails);
//   }, [meetingDetails]);

//   const decodeToken = (token) => {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
//   };

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
//   }, [dispatch]);
//   return (
//     <>
//       <div className="container-fuild">
//         <row>
//           <div className="col-12 d-flex align-items-center bg-soft-secondary vh-100">
//             <div className="container create-preview">
//               <div className="row d-flex">

//                 <div className="col-6 d-flex flex-column p-4">
//                   <label>
//                     {userFullName ? userFullName : "UserName name here"}
//                   </label>
//                   <h3>Event name here</h3>
//                   <label>
//                     <span className="mdi mdi-clock-time-five-outline"></span>
//                     30 min
//                   </label>
//                   <label>
//                     <span className="mdi mdi-calendar-blank-outline"></span>9:00am - 9:30am, Wednesday, January 31, 2024
//                   </label>
//                   <label>
//                     <span className="mdi mdi-earth"></span>India Standard Time
//                   </label>
//                 </div>
//                 <div className="col-6 d-flex align-items-center h-550 preview-right">
//                   <div className="w-100">
//                     <h5>Enter Details</h5>
//                     <label>
//                       Name *
//                     </label>
//                     <input type="textbox" className="form-control mb-3 w-100" />
//                     <label>Email *</label>
//                     <input type="email" className="form-control mb-3 w-100" />
//                     <button className="btn btn-primary">
//                       Schedule Meeting
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </row>
//       </div>
//     </>
//   );
// };

// export default Meeting;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Meeting = () => {
  const dispatch = useDispatch();
  const [userFullName, setUserFullName] = useState('');
  const location = useLocation();
  const { meetingDetails, selectedSlot, timezone } = location.state;


  useEffect(() => {
    console.log("Meeting details:", meetingDetails);
    console.log("Selected Slot:", selectedSlot);
    console.log("Timezone:", timezone);

  }, [meetingDetails, selectedSlot, timezone]);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

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
  }, [dispatch]);
  return (
    <>
      <div className="container-fuild">
        <row>
          <div className="col-12 d-flex align-items-center bg-soft-secondary vh-100">
            <div className="container create-preview">
              <div className="row d-flex">

                <div className="col-6 d-flex flex-column p-4">
                  <label>
                    {userFullName ? userFullName : "UserName name here"}
                  </label>
                  <h3>Event name here</h3>
                  <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    30 min
                  </label>
                  <label>
                    <span className="mdi mdi-calendar-blank-outline"></span>9:00am - 9:30am, Wednesday, January 31, 2024
                  </label>
                  <label>
                    <span className="mdi mdi-earth"></span>India Standard Time
                  </label>
                </div>
                <div className="col-6 d-flex align-items-center h-550 preview-right">
                  <div className="w-100">
                    <h5>Enter Details</h5>
                    <label>
                      Name *
                    </label>
                    <input type="textbox" className="form-control mb-3 w-100" />
                    <label>Email *</label>
                    <input type="email" className="form-control mb-3 w-100" />
                    <button className="btn btn-primary">
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </row>
      </div>
    </>
  );
};

export default Meeting;
