import { useContext, useEffect, useState } from "react";
import { SelectedServicesContext } from "../../context/SelectedServicesContext"; // Adjust the import path
import TimeSelection from "../../components/TimeSelection/TimeSelection";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import "./Time.css";

const Time = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const {
    year,              // renamed from selectedYear
    setSelectedYear,    
    month,             // renamed from selectedMonth
    setSelectedMonth,   
    day,               // renamed from selectedDay
    setSelectedDay,     
    timeSlot,          // renamed from selectedTimeSlot
    setSelectedTimeSlot 
  } = useContext(SelectedServicesContext);
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed in JavaScript
    const day = selectedDate.getDate();
    // Update the context
    setSelectedMonth(month);
    setSelectedDay(day);
    console.log(year,month,day,timeSlot,'sdfs')
    // Optionally, you can also set the time slot if selectedTime is updated
    if (selectedTime) {
      setSelectedTimeSlot(selectedTime);
    }

    // Optional: You can set a message based on the selected date or time
    setMessage(`Selected Date: ${year}-${month}-${day}, Time: ${selectedTime}`);
  }, [selectedTime,selectedDate]);
  return (
    <div className="time">
      <div className="container mt-4">
        <p>Step 2 of 3:</p>
        <h3 className="fw-bold">Select Time</h3>
        <div className="row">
          <div className="col-md-9">
            <TimeSelection
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setMessage={setMessage}
            />
          </div>
          <div className="col-md-3">
            <BookingDetails
              location="Vurve - Bangalore"
              service="Haircut - Premier Stylist"
              price="900"
              duration="1 hour"
              dateTime={`${selectedDate.toDateString()} at ${
                selectedTime ? selectedTime : "not selected"
              }`}
              showDateTime={!!selectedTime}
              showButtonBook={true}
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
