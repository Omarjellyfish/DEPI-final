import { useState, useEffect } from "react";
import axios from "axios";
import Booking from "../../components/Booking/Booking";
import { toast } from "react-toastify";

const BookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2024);

  const fetchBookings = () => {
    axios
      .get(`http://localhost:3000/appointments/month/`, {
        params: {
          year: year,
          month: month,
        },
      })
      .then((response) => {
        console.log(response.data.appointments, "hello from appointments");
        setBookings(response.data.appointments);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };

  const fetchFilteredBookings = () => {
    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      const bookingMonth = bookingDate.getMonth() + 1;
      const bookingYear = bookingDate.getFullYear();
      return bookingMonth === parseInt(month) && bookingYear === parseInt(year);
    });
    setFilteredBookings(filtered);
  };

  const handleCancelBooking = (bookingId) => {
    axios
      .delete(`http://localhost:3000/appointments/cancel`,{params:{appointmentId:bookingId}})
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
        setFilteredBookings(
          filteredBookings.filter((booking) => booking.id !== bookingId)
        );
        toast.success("Booking canceled successfully!");
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
        toast.error("Failed to cancel booking!");
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchFilteredBookings();
        }}
      >
        <div className="mb-3">
          <label className="form-label">Month</label>
          <input
            type="number"
            className="form-control"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Enter month (1-12)"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={fetchBookings}>
          Fetch Bookings
        </button>
      </form>

      <div className="row mt-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="col-md-3 mb-3 d-flex flex-column" key={booking._id}>
              {console.log(booking._id)}
              <Booking
                bookerName={booking.months.days.times.appointment.user}
                service={booking.months.days.times.appointment.service}
                bookingDate={booking.months.days.times.appointment.date}
                cost={booking.months.days.times.appointment.cost}
              />
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleCancelBooking(booking._id)}
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <div>No bookings available for this month and year</div>
        )}
      </div>
    </div>
  );
};

export default BookingsComponent;
