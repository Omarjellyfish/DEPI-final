import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const userTypeVar = localStorage.getItem("userType");
  const loggedIn = localStorage.getItem("loggedIn");
  return (
    <nav className="navbar navbar-expand-lg navbar-light text-md-center sticky-top">
      <div className="container">
        <Link className="navbar-brand ps-3" to="/">
          <img src={logo} className="mb-3" alt="Logo" width="75" height="70" />
          <h1 className="site-name-h1 fs-5 mx-1">EasyReserve</h1>
        </Link>
        <button
          className="navbar-toggler navbar-toggler-home"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarSupportedContent"
          aria-expanded={isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-lg-auto ps-3 mb-2 mb-lg-0 gap-md-3 gap-lg-4">
            {loggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  logout
                </Link>
              </li>
              
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {userTypeVar == "admin" ? (
              <li className="nav-item">
                <Link className="nav-link" to="/adminDashboard">
                  Admin Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/userDashboard">
                  User Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
