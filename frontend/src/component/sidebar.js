import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isToggled, handleToggle }) => {
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
              <Link className='create_meeting_btn_link' to="/createmeeting">
                <button className="create_meeting_btn">
                  <span className="mdi mdi-plus" />Create
                </button>
              </Link>
            </div>
            <li className="sidebar">
              <Link to="/index">
                <i className="mdi mdi-link-variant" />
                Event
              </Link>
            </li>
            {/* <li className="sidebar">
              <Link to="/scheduledevents">
                <i className="mdi mdi-calendar-range" />
                Scheduled events
              </Link>
            </li> */}
            <li className="sidebar">
              <Link to="/availabilityschedules">
                <i className="mdi mdi-clock-time-five-outline" />
                Availability
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar;
