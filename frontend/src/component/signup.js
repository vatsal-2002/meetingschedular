import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Saleshandy-Logo-.png";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};

    if (!firstName) {
      validationErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]*$/.test(firstName)) {
      validationErrors.firstName =
        "Alphabetic characters only allowed in the first name";
    }

    // Validation for Last Name
    if (!lastName) {
      validationErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]*$/.test(lastName)) {
      validationErrors.lastName =
        "Alphabetic characters only allowed in the last name";
    }

    // Updated email validation
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,5}$/.test(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (
      password.length < 8 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      validationErrors.password =
        "Password should be at least 8 characters long and contain at least one special character";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.status === 201) {
        const data = await response.json();
        // Extract token from response
        const token = data.token;
        // Store token in session storage
        sessionStorage.setItem("SignUpToken", token);
        // Redirect to the login page
        navigate("/setting");
      } else if (response.status === 400) {
        // Error handling code...
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <section className="bg-home bg-circle-gradiant d-flex align-items-center">
        <div className="bg-overlay bg-overlay-white"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card form-signin p-4 rounded shadow">
                <form>
                  <img src={logo} alt="Logo" />
                  <h5 className="mb-3 text-center">Register your account</h5>

                  {/* First Name */}
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className={`form-control ${errors.firstName || (firstNameFocused && !firstName)
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Harry"
                      value={firstName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFirstName(value);
                        setErrors({
                          ...errors,
                          firstName: /^[a-zA-Z]*$/.test(value)
                            ? ""
                            : "Alphabetic characters only allowed in the first name",
                        });
                      }}
                      onFocus={() => setFirstNameFocused(true)}
                      onBlur={() => setFirstNameFocused(false)}
                    />
                    <label>First Name</label>
                    {(errors.firstName || (firstNameFocused && !firstName)) && (
                      <div className="invalid-feedback">
                        {errors.firstName || "First name is required"}
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className={`form-control ${errors.lastName || (lastNameFocused && !lastName)
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Potter"
                      value={lastName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setLastName(value);
                        setErrors({
                          ...errors,
                          lastName: /^[a-zA-Z]*$/.test(value)
                            ? ""
                            : "Alphabetic characters only allowed in the last name",
                        });
                      }}
                      onFocus={() => setLastNameFocused(true)}
                      onBlur={() => setLastNameFocused(false)}
                    />
                    <label>Last Name</label>
                    {(errors.lastName || (lastNameFocused && !lastName)) && (
                      <div className="invalid-feedback">
                        {errors.lastName || "Last name is required"}
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="form-floating mb-2">
                    <input
                      type="email"
                      className={`form-control ${errors.email || (emailFocused && !email)
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);
                        setErrors({
                          ...errors,
                          email: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,5}$/.test(value)
                            ? ""
                            : "Invalid email address",
                        });
                      }}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                    />
                    <label>Email Address</label>
                    {(errors.email || (emailFocused && !email)) && (
                      <div className="invalid-feedback">
                        {errors.email || "Invalid email address"}
                      </div>
                    )}
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${errors.password || (passwordFocused && !password)
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        setErrors({
                          ...errors,
                          password:
                            value.length >= 8 &&
                              /[!@#$%^&*(),.?":{}|<>]/.test(value)
                              ? ""
                              : "Password should be at least 8 characters long and contain at least one special character",
                        });
                      }}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                    <label>Password</label>
                    {(errors.password || (passwordFocused && !password)) && (
                      <div className="invalid-feedback">
                        {errors.password || "Password is required"}
                      </div>
                    )}
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    onClick={handleSignup}
                  >
                    Register
                  </button>

                  {/* Display error message for existing user */}
                  {errors.userExists && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {errors.userExists}
                    </div>
                  )}

                  <div className="col-12 text-center mt-3">
                    <p className="mb-0 mt-3">
                      <small className="text-dark me-2">
                        Already have an account ?
                      </small>
                      <Link to="/login" className="text-dark fw-bold btn-none">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
