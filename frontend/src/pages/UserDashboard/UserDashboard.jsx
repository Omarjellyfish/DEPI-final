import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Booking from "../../components/Booking/Booking";

const UserDashboard = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex flex-column align-items-center">
        <FontAwesomeIcon icon={faUserCircle} size="5x" className="mb-3" />
        <h1 className="mb-4 text-center">User Dashboard</h1>
      </div>
      <div className="border border-secondary p-4 rounded">
        <h2 className="text-center">Your Bookings :</h2>
        <div className="row">
          <div className="col-md-4">
            <Booking
              bookerName="Jellyfish"
              service="Consultation"
              bookingDate="2024-10-24"
              bookingTime="$50"
            />
            <button className="btn btn-danger w-100 mt-2">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
