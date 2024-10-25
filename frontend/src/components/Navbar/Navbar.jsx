import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const userTypeVar = localStorage.getItem("userType");
  const loggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    navigate("/login");
  };

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
              <>
                {userTypeVar === "admin" ? (
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                      Logout
                    </span>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/userDashboard">
                        User Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/testimonials">
                        Testimonials
                      </Link>
                    </li>
                    <li className="nav-item">
                      <span
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={handleLogout}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                        Logout
                      </span>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
