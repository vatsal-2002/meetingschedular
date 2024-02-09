import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Viewlivepage = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <div className="container-fuild">
        <row>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <NavDropdown title="Menu" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#">Home</NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Edit event type
                    </NavDropdown.Item>
                  </NavDropdown>
                  <a href="#" className="btn btn-outline-primary"> Copy link </a>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          
          <div className="col-12 d-flex align-items-center bg-soft-secondary vh-100">
            <div className="container create-preview">
              <div className="row d-flex">
                {/* <p>
                  This is a preview. To book an event, share the link with your
                  invitees.
                  <label>View live page</label>
                </p> */}

                <div className="col-6 d-flex flex-column p-4">
                  <label>MEET PATEL</label>
                  <h3>Event name here</h3>
                  <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    30 min
                  </label>
                  <label>
                    <span className="mdi mdi-map-marker"></span>Add a location
                    for it to show here
                  </label>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center h-550 preview-right">
                  {/* <h5 className='text-center'>A preview of your availability will show on the next step</h5> */}
                  <div>
                    <h4>Select Date & Times</h4>
                    <Calendar
                      className="border-0"
                      onChange={onChange}
                      value={date}
                    />
                    {/* <p>Selected Date: {date.toDateString()}</p> */}
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

export default Viewlivepage;
