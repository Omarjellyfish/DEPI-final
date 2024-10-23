import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./TimeSelection.css";

const TimeSelection = ({
  selectedTime,
  setSelectedTime,
  selectedDate,
  setSelectedDate,
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [availableTimes, setAvailableTimes] = useState({});
  const [holidayMessage, setHolidayMessage] = useState("");
  const [filteredTimes, setFilteredTimes] = useState([]);
  const dayContainerRef = useRef(null);

  const getDaysInMonth = (date) => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1)
    );
  };

  const days = getDaysInMonth(
    new Date(new Date().getFullYear(), currentMonthIndex)
  );
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
  };

  const scrollDays = (direction) => {
    if (dayContainerRef.current) {
      dayContainerRef.current.scrollBy({
        left: direction * 100,
        behavior: "smooth",
      });
    }
  };

  const handleDateSelection = (day) => {
    const selectedDateStr = day.toISOString().split("T")[0];
    const isFriday = day.getDay() === 5;

    if (isFriday) {
      setHolidayMessage("This day is a holiday (Friday). No available times.");
      setSelectedTime(null);
      setFilteredTimes([]);
    } else {
      setHolidayMessage("");
      setSelectedDate(new Date(day));

      const availableTimesForSelectedDate =
        availableTimes[selectedDateStr] || [];
      setSelectedTime(null);
      setFilteredTimes(availableTimesForSelectedDate);
    }
  };

  return (
    <div className="time-selection card p-3 border-light">
      <div className="d-flex justify-content-between align-items-center mb-3 fw-bold">
        <button className="btn btn-secondary" onClick={handlePrevMonth}>
          &lt;
        </button>
        <div>
          {new Date(new Date().getFullYear(), currentMonthIndex).toLocaleString(
            "default",
            { month: "long" }
          )}
        </div>
        <button className="btn btn-secondary" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>

      <div className="d-flex align-items-center">
        <button className="btn btn-secondary" onClick={() => scrollDays(-1)}>
          &lt;
        </button>
        <div
          className="d-flex overflow-hidden flex-nowrap day-selection"
          ref={dayContainerRef}
        >
          {days.map((day) => {
            const dayName = dayNames[day.getDay()];
            const isSelected =
              selectedDate.toDateString() === day.toDateString();
            const isFriday = day.getDay() === 5;

            return (
              <div key={day} className="text-center mx-2">
                <div
                  className={`border rounded p-2 text-center day-box ${
                    isSelected ? "bg-primary text-white" : ""
                  } ${isFriday ? "bg-secondary text-white" : ""}`}
                  onClick={() => handleDateSelection(day)}
                  style={{
                    width: "60px",
                    cursor: isFriday ? "not-allowed" : "pointer",
                  }}
                >
                  <div className="fw-bold">{dayName}</div>
                  <div>{day.getDate()}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn btn-secondary" onClick={() => scrollDays(1)}>
          &gt;
        </button>
      </div>

      {holidayMessage && (
        <div className="alert alert-warning mt-3">
          <strong>{holidayMessage}</strong>
        </div>
      )}

      <div className="date-list mt-3">
        {/* {filteredTimes.length > 0 ? (
          filteredTimes.map((timeSlot) => (
            <button
              key={timeSlot.id}
              className={`btn btn-light m-1 time-slot p-3 ${
                selectedTime?.id === timeSlot.id ? "selected" : ""
              }`}
              onClick={() => setSelectedTime(timeSlot)}
            >
              {timeSlot.time}
            </button>
          ))
        ) : ( */}
          <div className="alert alert-info mt-3">No available times</div>
        {/* )} */}
      </div>
    </div>
  );
};

export default TimeSelection;
