import "./AdminDashboard.css";
import { useState } from "react";
import BookingsComponent from "../../components/AdminDashboardComponents/BookingsComponent";
import ReviewsComponent from "../../components/AdminDashboardComponents/ReviewsComponent";
import ServicesComponent from "../../components/AdminDashboardComponents/ServicesComponent";
import WorkdaysComponent from "../../components/AdminDashboardComponents/WorkdaysComponent";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Admin Dashboard</h2>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => handleTabChange("bookings")}
            >
              Bookings
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => handleTabChange("reviews")}
            >
              Reviews
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "services" ? "active" : ""}`}
              onClick={() => handleTabChange("services")}
            >
              Services
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Workdays" ? "active" : ""}`}
              onClick={() => handleTabChange("Workdays")}
            >
              Clinic Days
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "bookings" && <BookingsComponent />}
          {activeTab === "reviews" && <ReviewsComponent />}
          {activeTab === "services" && <ServicesComponent />}
          {activeTab === "Workdays" && <WorkdaysComponent />}
        </div>
      </div>
    </div>
  );
}
