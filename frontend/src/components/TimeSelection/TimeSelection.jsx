import { useState, useRef } from "react";
import "./TimeSelection.css";

const TimeSelection = ({
  times,
  selectedTime,
  setSelectedTime,
  selectedDate,
  setSelectedDate,
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
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
    setSelectedDate(new Date(day));
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

            return (
              <div key={day} className="text-center mx-2">
                <div
                  className={`border rounded p-2 text-center day-box ${
                    isSelected ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => handleDateSelection(day)}
                  style={{ width: "60px", cursor: "pointer" }}
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

      <div className="date-list mt-3">
        {times.map((timeSlot) => (
          <button
            key={timeSlot.id}
            className={`btn btn-light m-1 time-slot p-3 ${
              selectedTime?.id === timeSlot.id ? "selected" : ""
            }`}
            onClick={() => setSelectedTime(timeSlot)}
          >
            {timeSlot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
