import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import Dropdown from "react-bootstrap/Dropdown";

const Topheader = ({ isToggled, handleToggle }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Remove user token from session storage
    sessionStorage.removeItem("userToken");
    // Redirect to the sign-in page
    navigate("/login");
  };

  return (
    <>
      <div className={`top-header ${isToggled ? "" : "toggled"}`}>
        <div className="header-bar d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <a href="#" className="logo-icon me-3">
              <img
                src="assets/images/logo-icon.png"
                height={30}
                className="small"
                alt=""
              />
              <span className="big">
                <img
                  src="assets/images/logo-dark.png"
                  height={24}
                  className="logo-light-mode"
                  alt=""
                />
                <img
                  src="assets/images/logo-light.png"
                  height={24}
                  className="logo-dark-mode"
                  alt=""
                />
              </span>
            </a>

            <button
              className="toggle-button btn btn-icon btn-soft-light"
              onClick={handleToggle}
            >
              <i className="ti ti-menu-2" />
            </button>
          </div>

          <div className="page-profile">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <span className="mdi mdi-account"></span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="header-logout" onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topheader;
