const Meeting = () => {
  return (
    <>
      <div className="container-fuild">
        <row>
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
                  <span className="mdi mdi-calendar-blank-outline"></span>9:00am - 9:30am, Wednesday, January 31, 2024
                  </label>
                  <label>
                  <span className="mdi mdi-earth"></span>India Standard Time
                  </label>
                </div>
                <div className="col-6 d-flex align-items-center h-550 preview-right">
                  <div className="w-100">
                    <h5>Enter Details</h5>
                    <label>Name *</label>
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
