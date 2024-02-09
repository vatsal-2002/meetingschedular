const Sidebarblock = () => {
  return (
    <>
      <div className="sidebar-block">
        <nav id="sidebar" className="sidebar-wrapper toggled">
          <div
            className="sidebar-content"
            data-simplebar=""
            style={{ height: "calc(100% - 60px)" }}
          >
            <div className="create-meeting mt-3 p-3">
              <button className="meeting-cancel"><span className="mdi mdi-arrow-left-thick"></span>Cancel</button>
              <h4 className="mt-3">New Meeting</h4>
            </div>
            <hr />
            <div className="d-flex flex-column meeting-detail p-4">
              <label>Meeting name</label>
              <input type="textbox" className="form-control mb-3" placeholder="Name your meeting" />

              <label>Duration</label>
              <select id="timezone" className="custom-select">
                <option value="15" >15 min</option>
                <option value="30" >30 min</option>
                <option value="45" >45 min</option>
                <option value="60" >60 min</option>
                <option value="Custom" >Custom</option>
              </select>
              <br />
              <label>Location</label>
              <select id="timezone" className="custom-select">
                <option value="googlemeet" >Google Meet</option>
              </select>
            </div>

          </div>
          <div className="meeting-controller d-flex justify-content-end me-4">
            <button className="meeting-cancel">Cancel</button>
            <button className="btn btn-primary">Continue</button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebarblock;
