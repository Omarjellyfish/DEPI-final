import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z]).{8,16}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be 8-16 characters long and contain at least one letter."
      );
      return;
    }
    if (!validatePhone(phone)) {
      setError("Phone number must be in the format 000-000-0000.");
      return;
    }

    setError("");

    const data = {
      name,
      email,
      password,
      phone,
      acceptTerms,
    };

    try {
      const response = await axios.post("http://localhost:3000/user/", data);

      if (response.data.error) {
        toast.error(response.data.error, {
          theme: "dark",
        });
      } else {
        toast.success("Signed up successfully!", {
          theme: "dark",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to sign up. Please try again later.";
      toast.error(errorMessage, {
        theme: "dark",
      });
    }
  };

  return (
    <div className="container-fluid h-sm-auto signup-page d-flex align-items-center justify-content-center p-0">
      <ToastContainer position="top-right" />
      <div className="row w-100">
        <div className="col-md-6 d-flex h-sm-auto align-items-center justify-content-center right-section p-2">
          <div className="card form-card-parent h-sm-auto px-4 pt-3 pb-1 shadow-lg border-0">
            <h2 className="text-center mb-3 form-title">
              Sign Up for EasyReserve™
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label Label">
                  Your Name
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-signup"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label Label">
                  Your Email
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control form-control-signup"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label Label">
                  Your Phone Number
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-signup"
                    id="phone"
                    placeholder="123-456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="\d{3}-\d{3}-\d{4}"
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                </div>
                {error.includes("Phone number") && (
                  <p className="text-danger mt-1">{error}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label Label">
                  Your Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control form-control-signup"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-key"></i>
                  </span>
                </div>
                {error.includes("Password") && (
                  <p className="text-danger mt-1">{error}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label Label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control form-control-signup"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-key"></i>
                  </span>
                </div>
                {error.includes("Passwords") && (
                  <p className="text-danger mt-1">{error}</p>
                )}
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  required
                />
                <label className="form-check-label" htmlFor="acceptTerms">
                  I accept the terms and conditions
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary w-50 mx-1">
                  Sign Up <br />
                  as admin
                </button>
                <button type="submit" className="btn btn-primary w-50 mx-1">
                  Sign Up <br />
                  as user
                </button>
              </div>
              {error && !error.includes("Password") && (
                <p className="text-danger mt-2">{error}</p>
              )}
              <p className="text-center mt-3 already-word">
                Already have an account?{" "}
                <Link to="/login" className="login-word">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center left-section">
          <div className="text-center text-white">
            <h1 className="fs-1 website-name">EasyReserve™</h1>
            <p className="text-white-50">Your Path to Recovery Starts Here</p>
            <p>Join us to access personalized physical therapy services.</p>
            <button className="btn btn-outline-light m-2">Learn More</button>
            <button className="btn btn-outline-light m-2">Our Services</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
