import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email format is invalid.");
      return false;
    }
    if (!/^(?=.*[a-zA-Z]).{8,16}$/.test(password)) {
      setError(
        "Password must be 8-16 characters long and contain at least one letter."
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("https://your-api-endpoint/login", {
        email,
        password,
        remember,
      });

      toast.success("Login successful!");
      console.log("Login successful:", response.data);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Login failed. Please check your credentials."
        );
        toast.error("Login failed. Please check your credentials.");
      } else {
        setError("Login failed. Please try again later.");
        toast.error("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid login-page d-flex align-items-center justify-content-center p-0">
      <div className="row w-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center left-section p-5">
          <div className="text-center text-white">
            <h1 className="fs-1 website-name">EasyReserve™</h1>
            <p className="text-white-50">Your Path to Recovery Starts Here</p>
            <p className="px-5">
              You are about to access one of our core services: Personalized
              Physical Therapy Solutions™
            </p>

            <button className="btn btn-outline-light m-2">
              What to Expect?
            </button>
            <button className="btn btn-outline-light m-2">
              Other Future Applications
            </button>
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center right-section p-5">
          <div className="card form-card-parent p-4 shadow-lg border-0">
            <h2 className="text-center mb-4 form-title">
              Log In to EasyReserve™
            </h2>

            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="email" className="form-label email">
                  Your Email
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control form-control-login"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label password">
                  Your Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control form-control-login"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-key"></i>
                  </span>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>

              <div className="d-flex flex-column justify-content-between align-items-center">
                <a href="#" className="forgotten mb-2">
                  Forgotten?
                </a>
                <button
                  type="submit"
                  className="btn btn-primary w-50 mb-2"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In as admin"}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-50 mb-0"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In as user"}
                </button>
              </div>
              <p className="text-center mt-3 dont-have">
                Don't have an account?{" "}
                <Link to="/signup" className="signup-word">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Login;
