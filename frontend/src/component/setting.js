import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Saleshandy-Logo-.png";

const Setting = () => {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to decode JWT token
  const decodeJwt = (token) => {
    const parts = token.split(".");
    const decodedPayload = atob(parts[1]);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  };

  // Effect to run when component mounts
  useEffect(() => {
    const storedToken = sessionStorage.getItem("SignUpToken");

    if (storedToken) {
      const decodedPayload = decodeJwt(storedToken);
      // Here you can perform any additional actions based on the decoded token
      console.log("Decoded token payload:", decodedPayload);
    } else {
      console.log("No token found in session storage.");
    }
  }, []);

  // Function to handle saving data
  const handleSaveData = async () => {
    setLoading(true);

    const storedToken = sessionStorage.getItem("SignUpToken");

    if (!storedToken) {
      setError("No token found in session storage.");
      setLoading(false);
      return;
    }

    const decodedPayload = decodeJwt(storedToken);
    const serverUrl = `http://localhost:8000/users/${decodedPayload.id}`;

    const requestBody = {
      username,
    };

    try {
      const response = await fetch(serverUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data updated successfully:", data);
        navigate("/availability");
      } else {
        const errorData = await response.json();
        console.error("Error updating data:", errorData);
        setError("Error updating data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Error updating data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="setting">
        <section className="bg-home bg-circle-gradiant d-flex align-items-center">
          <div className="bg-overlay bg-overlay-white"></div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card form-setting p-4 rounded shadow">
                  <img src={logo} alt="Logo" className="form-setting-logo" />
                  <h4>Welcome to Saleshandy</h4>
                  <p>
                    We take the work of connecting with others so you can
                    accomplish more.
                  </p>
                  <hr />
                  <h4>Create your Saleshandy URL</h4>
                  <p>
                    Choose a URL that describes you or your business in a
                    concise way. Make it short and easy to remember so you can
                    share the link with ease.
                  </p>
                  <div className="Create-url d-flex align-items-center">
                    <h4 className="">saleshandy.com/</h4>
                    <div className="form-floating mb-2 w-100 ml-2">
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Harry"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                      />
                      <label className="input-user-lable">
                        Create Your Saleshandy URL
                      </label>
                    </div>
                  </div>
                  <hr />

                  <div className="d-flex justify-content-end mt-4">
                    <button
                      className="btn btn-pills btn-primary w-30"
                      onClick={handleSaveData}
                    >
                      <Link
                        to="/login"
                        className="text-white fw-bold btn-none"
                      >
                        Next
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Setting;
