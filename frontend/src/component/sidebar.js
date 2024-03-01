// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ isToggled, handleToggle }) => {
//   return (
//     <>
//       <nav id="sidebar" className={`sidebar-wrapper ${isToggled ? '' : 'toggled'}`}>
//         <div
//           className="sidebar-content"
//           data-simplebar=""
//           style={{ height: "calc(100% - 60px)" }}
//         >
//           <div className="sidebar-brand">
//             <img
//               src="Logo.png"
//               height={100}
//               className="logo-light-mode"
//               alt=""
//             />
//           </div>
//           <ul className="sidebar-menu">
//             <div>
//               <Link className='create_meeting_btn_link' to="/createmeeting">
//                 <button className="create_meeting_btn">
//                   <span className="mdi mdi-plus" />Create
//                 </button>
//               </Link>
//             </div>
//             <li className="sidebar">
//               <Link to="/event">
//                 <i className="mdi mdi-link-variant" />
//                 Event
//               </Link>
//             </li>
//             {/* <li className="sidebar">
//               <Link to="/scheduledevents">
//                 <i className="mdi mdi-calendar-range" />
//                 Scheduled events
//               </Link>
//             </li> */}
//             <li className="sidebar">
//               <Link to="/availabilityschedules">
//                 <i className="mdi mdi-clock-time-five-outline" />
//                 Availability
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isToggled, handleToggle }) => {
  const location = useLocation();

  // Function to determine if a menu item should be active
  const isMenuItemActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav id="sidebar" className={`sidebar-wrapper ${isToggled ? '' : 'toggled'}`}>
        <div
          className="sidebar-content"
          data-simplebar=""
          style={{ height: "calc(100% - 60px)" }}
        >
          <div className="sidebar-brand">
            <img
              src="Logo.png"
              height={100}
              className="logo-light-mode"
              alt=""
            />
          </div>
          <ul className="sidebar-menu">
            <div>
              <Link className={`create_meeting_btn_link ${isMenuItemActive('/createmeeting') ? 'active' : ''}`} to="/createmeeting">
                <button className="create_meeting_btn">
                  <span className="mdi mdi-plus" />Create
                </button>
              </Link>
            </div>
            <li className={`mt-4 my-2 sidebar ${isMenuItemActive('/event') ? 'active' : ''}`}>
              <Link to="/event">
                <i className={`mdi mdi-link-variant ${isMenuItemActive('/event') ? 'active' : ''}`} />
                <label className={`my-0 mx-3 ${isMenuItemActive('/event') ? 'active' : ''}`}>Event</label>
              </Link>
            </li>
            <li className={`sidebar ${isMenuItemActive('/availabilityschedules') ? 'active' : ''}`}>
              <Link to="/availabilityschedules">
                <i className={`mdi mdi-clock-time-five-outline ${isMenuItemActive('/availabilityschedules') ? 'active' : ''}`} />
                <label className={`my-0 mx-3 ${isMenuItemActive('/availabilityschedules') ? 'active' : ''}`}>Availability</label>
              </Link>
            </li>
            {/* Add similar logic for other menu items */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;