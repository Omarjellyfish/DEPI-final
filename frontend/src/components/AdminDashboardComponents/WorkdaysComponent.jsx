import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const WorkdaysComponent = () => {
  const [startWorkDay, setStartWorkDay] = useState("");
  const [endWorkDay, setEndWorkDay] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/workdays")
      .then((response) => {
        const { startWorkDay, endWorkDay } = response.data[0];
        console.log(startWorkDay,endWorkDay , 'hello from this');
        setStartWorkDay(startWorkDay);
        setEndWorkDay(endWorkDay);
      })
      .catch((error) => {
        console.error("Error fetching clinic Days:", error);
      });
  }, []);

  const handleWorkdaysSubmit = (e) => {
    e.preventDefault();
    const updatedDays = {  // "key": , "value":
      "key": "startWorkDay" ,"value":startWorkDay,
    };

    axios
      .put("http://localhost:3000/workdays", updatedDays)
      .then(() => {
        toast.success("Clinic Days updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating clinic Days:", error);
        toast.error("Failed to update clinic Days!");
      });
  };

  return (
    <div>
      <form onSubmit={handleWorkdaysSubmit}>
        <div className="mb-3">
          <label className="form-label">Open Day</label>
          <select
            className="form-control"
            value={startWorkDay}
            onChange={(e) => setStartWorkDay(e.target.value)}
            required
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Close Day</label>
          <select
            className="form-control"
            value={endWorkDay}
            onChange={(e) => setEndWorkDay(e.target.value)}
            required
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Workdays
        </button>
      </form>
    </div>
  );
};

export default WorkdaysComponent;
