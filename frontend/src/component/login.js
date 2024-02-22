import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Saleshandy-Logo-.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if signup token exists in session storage
    const signUpToken = sessionStorage.getItem("userToken");

    // If signup token exists, navigate to index page
    if (signUpToken) {
      navigate("/event");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[\w!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // Update email validation error on change
    const validationErrors = { ...errors };
    if (!validateEmail(e.target.value)) {
      validationErrors.email = "Invalid email address";
    } else {
      delete validationErrors.email;
    }
    setErrors(validationErrors);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // Update password validation error on change
    const validationErrors = { ...errors };
    if (!validatePassword(e.target.value)) {
      validationErrors.password =
        "Password should be at least 8 characters long and contain at least one special character";
    } else {
      delete validationErrors.password;
    }
    setErrors(validationErrors);
  };

  const handleEmailFocus = () => {
    // Clear email validation error on focus
    const validationErrors = { ...errors };
    delete validationErrors.email;
    setErrors(validationErrors);
  };

  const handlePasswordFocus = () => {
    // Clear password validation error on focus
    const validationErrors = { ...errors };
    delete validationErrors.password;
    setErrors(validationErrors);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!validatePassword(password)) {
      validationErrors.password =
        "Password should be at least 8 characters long and contain at least one special character";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Remove the signup token from sessionStorage if it exists
        sessionStorage.removeItem("SignUpToken");

        // Store the JWT token in sessionStorage
        sessionStorage.setItem("userToken", data.token);

        // Redirect to the index page
        navigate("/event");
      } else {
        // Set login error state
        setErrors({ login: "Email or password is incorrect" });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <div className="Login">
      <section className="bg-home bg-circle-gradiant d-flex align-items-center">
        <div className="bg-overlay bg-overlay-white"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card form-signin p-4 rounded shadow">
                <form>
                  <img src={logo} alt="Logo" />
                  <h5 className="mb-3 text-center">Please sign in</h5>

                  <div className="form-floating mb-2">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""
                        }`}
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      onFocus={handleEmailFocus}
                    />
                    <label>Email address</label>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""
                        }`}
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      onFocus={handlePasswordFocus}
                    />
                    <label>Password</label>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>

                  {errors.login && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {errors.login}
                    </div>
                  )}

                  <div className="col-12 text-center mt-3">
                    <p className="mb-0 mt-3">
                      <small className="text-dark me-2">
                        Don't have an account ?
                      </small>{" "}
                      <Link to="/signup" className="text-dark fw-bold btn-none">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
