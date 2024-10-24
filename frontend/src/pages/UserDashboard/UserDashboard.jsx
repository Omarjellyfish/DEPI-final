import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Booking from "../../components/Booking/Booking";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = () => {
    axios
      .get("http://localhost:3000/user/bookings", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const userBookings = [];
        response.data.bookings.forEach((booking) => {
          booking.months.forEach((month) => {
            month.days.forEach((day) => {
              day.times.forEach((time) => {
                userBookings.push(time.appointment);
              });
            });
          });
        });

        setBookings(userBookings);
      })
      .catch((error) => {
        console.error("Error fetching user bookings:", error);
      });
  };

  const handleCancelBooking = (bookingId) => {
    axios
      .delete(`http://localhost:3000/appointments/cancel`, {
        headers: {
          token: localStorage.getItem("token"),
          appointmentId: bookingId,
        },
      })
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
        toast.success("Booking canceled successfully!");
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
        toast.error("Failed to cancel booking!");
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
