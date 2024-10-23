import React, { useState, useContext } from "react";
import "./BookingDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SelectedServicesContext } from "../../context/SelectedServicesContext"; // Import the context

const BookingDetails = ({
  location,
  duration,
  dateTime,
  showDateTime,
  showButtonNext,
  onNextClick,
  nextButtonDisabled,
  showButtonPayPal,
  showButtonCash,
  showButtonBook,
  year,
  month,
  day,
  timeSlot,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch selected services and total price from context
  const { selectedServices } = useContext(SelectedServicesContext);
  const service =
    selectedServices.map((s) => s.name).join(", ") || "No Service";
  const price = selectedServices.reduce((total, s) => total + s.cost, 0) || 0;

  const handleNavigation = () => {
    navigate("/review");
  };

  const handlePayPalCheckout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setMessage("");

    try {
      const items = [
        {
          name: service,
          description: service,
          quantity: 1,
          unit_amount: {
            currency_code: "USD",
            value: price.toString(),
          },
        },
      ];

      const response = await axios.post(
        "http://localhost:3000/paypal/create-order",
        {
          items,
          cost: price,
        }
      );
      window.location.href = response.data.approvalUrl;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setMessage(
        "There was an error creating your PayPal order. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCashCheckout = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const appointmentData = {
      year: year,
      month: month,
      day: day,
      timeSlot: timeSlot,
      service: service,
      cost: price,
      note: "",
    };

    try {
      const response = await axios.post("http://localhost:3000/appointments", {
        ...appointmentData,
      });
      if (response.data.error) {
        setMessage(
          "There was an error creating your appointment. Please try again."
        );
      } else {
        setMessage("Appointment created successfully!");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setMessage(
        "There was an error creating your appointment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card booking-card border-light w-sm-100 border">
        <div className="image-and-location d-flex align-items-center justify-content-around p-2">
          <img
            src="images/service-details.jpg"
            className="img-fluid book-details-img"
            alt="Service"
          />
          <h5 className="card-title">{location}</h5>
        </div>
        <div className="card-body pt-0">
          <hr />
          {showDateTime && (
            <div className="mb-3">
              <strong>{dateTime}</strong>
              <p className="text-muted">{duration}</p>
              <hr />
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <span className="service">{service}</span>
            <span className="price">USD {price}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>USD {price}</span>
          </div>
        </div>
      </div>
      {showButtonNext && (
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={handleNavigation}
          disabled={nextButtonDisabled}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon ms-3" />
        </button>
      )}
      {showButtonBook && (
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={onNextClick}
          disabled={nextButtonDisabled}
        >
          Book Now
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon ms-3" />
        </button>
      )}
      {showButtonPayPal && (
        <button
          className={`btn ${
            isLoading ? "btn-secondary" : "btn-primary"
          } w-100 mt-3`}
          onClick={handlePayPalCheckout}
          disabled={nextButtonDisabled || isLoading}
        >
          {isLoading ? "Processing..." : "Check out with PayPal"}
        </button>
      )}
      {showButtonCash && (
        <button
          className={`btn ${
            isLoading ? "btn-secondary" : "btn-primary"
          } w-100 mt-3`}
          onClick={handleCashCheckout}
          disabled={nextButtonDisabled || isLoading}
        >
          {isLoading ? "Processing..." : "Pay with cash and check out"}
        </button>
      )}
      {message && <div className="mt-3 text-danger">{message}</div>}
    </>
  );
};

export default BookingDetails;
