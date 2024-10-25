import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Booking from "../../components/Booking/Booking";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/appointments/user",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(
        response.data.appointments,
        "hello from response in user dashboard"
      );

      let userBookings = response.data.appointments.map((booking) => ({
        appointmentId: booking.appointmentId,
        cost: booking.cost,
        date: booking.date,
        note: booking.note,
        service: booking.service,
        user: booking.user,
        _id: booking._id,
      }));

      console.log(userBookings, "hello from user bookings");

      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/appointments/cancel/${bookingId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        toast.success("Booking canceled successfully!");

        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        toast.error("Failed to cancel booking!");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      if (error.response) {
        toast.error(
          `Failed to cancel booking! ${
            error.response.data.message || error.message
          }`
        );
      } else {
        toast.error("Failed to cancel booking! Network error.");
      }
    }
  };
  return (
    <div className="container mt-4">
      <div className="d-flex flex-column align-items-center">
        <FontAwesomeIcon icon={faUserCircle} size="5x" className="mb-3" />
        <h1 className="mb-4 text-center">User Dashboard</h1>
      </div>
      <div className="border border-secondary p-4 rounded">
        <h2 className="text-center">Your Bookings :</h2>
        <div className="row">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div className="col-md-4" key={index}>
                <Booking
                  bookerName={booking.user}
                  service={booking.service}
                  bookingDate={booking.date}
                  cost={booking.cost}
                />
                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel
                </button>
              </div>
            ))
          ) : (
            <div>No bookings available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
