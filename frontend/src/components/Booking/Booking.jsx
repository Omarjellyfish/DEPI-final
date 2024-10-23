import React from "react";
import "./Booking.css";

export default function Booking({
  bookerName,
  service,
  bookingDate,
  bookingTime,
  onCancel,
}) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{service}</h5>
        <p className="card-text">Booked by: {bookerName}</p>
        <p className="card-text">Date: {bookingDate}</p>
        <p className="card-text">Time: {bookingTime}</p>
      </div>
    </div>
  );
}
