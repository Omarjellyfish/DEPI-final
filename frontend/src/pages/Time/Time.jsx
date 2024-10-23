import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TimeSelection from "../../components/TimeSelection/TimeSelection";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import "./Time.css";

const Time = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [times, setTimes] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAvailableTimes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/times");
      const availableTimes = response.data.filter((time) => !time.isBooked);
      setTimes(availableTimes);
    } catch (err) {
      console.error("Error fetching available times:", err);
    }
  }, []);

  const postBookingDetails = async () => {
    if (!selectedDate || !selectedTime) {
      setMessage("Please select both date and time to proceed.");
      return;
    }

    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const response = await axios.post("http://localhost:5000/bookings", {
        time: selectedTime?.id,
        date: formattedDate,
      });

      if (response.status === 201) {
        setMessage("Booking successful!");
        fetchAvailableTimes();
      } else {
        setMessage("Booking failed. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
      console.error("Error posting booking details:", err);
    }
  };

  useEffect(() => {
    fetchAvailableTimes();
  }, [fetchAvailableTimes]);

  return (
    <div className="time">
      <div className="container mt-4">
        <p>Step 2 of 3:</p>
        <h3 className="fw-bold">Select Time</h3>
        <div className="row">
          <div className="col-md-9">
            <TimeSelection
              times={times}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="col-md-3">
            <BookingDetails
              location="Vurve - Bangalore"
              service="Haircut - Premier Stylist"
              price="900"
              duration="1 hour"
              dateTime={`${selectedDate.toDateString()} at ${
                selectedTime?.time
              }`}
              showDateTime={!!selectedTime}
              showButtonNext={true}
              onNextClick={postBookingDetails}
              nextButtonDisabled={!selectedTime || !selectedDate}
            />
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;
