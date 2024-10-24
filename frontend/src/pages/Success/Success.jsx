import "./Success.css";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import { useState, useEffect } from "react";

function Success() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [confirmedAppointment, setConfirmedAppointment] = useState({});

  useEffect(() => {
    const fetchData = () => {
      const upcoming = [
        {
          location: "Vurve - Bangalore",
          service: "Haircut - Premier Stylist",
          price: 900,
          dateTime: "Sun 16 July 2023 at 5:00pm",
          duration: "1h",
        },
      ];

      const past = [
        {
          location: "Vurve - Bangalore",
          service: "Haircut - Premier Stylist",
          price: 900,
          dateTime: "Sun 16 July 2023 at 5:00pm",
          duration: "1h",
        },
      ];

      const confirmed = {
        location: "Vurve - Bangalore",
        service: "Haircut - Premier Stylist",
        price: 900,
        dateTime: "Sun 16 July 2023 at 5:00pm",
        duration: "1h",
      };

      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
      setConfirmedAppointment(confirmed);
    };

    fetchData();
  }, []);

  return (
    <div className="success p-5 bg-light rounded">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="upcoming mb-5">
              <h3 className="fs-4 ms-5">Upcoming appointments</h3>
              {upcomingAppointments.map((appointment, index) => (
                <BookingDetails
                  key={index}
                  location={appointment.location}
                  service={appointment.service}
                  price={appointment.price}
                  dateTime={appointment.dateTime}
                  duration={appointment.duration}
                  showDateTime={true}
                />
              ))}
            </div>

            <div className="past mb-5">
              <h3 className="fs-4 ms-5">Past appointments</h3>
              {pastAppointments.map((appointment, index) => (
                <BookingDetails
                  key={index}
                  location={appointment.location}
                  service={appointment.service}
                  price={appointment.price}
                  dateTime={appointment.dateTime}
                  duration={appointment.duration}
                  showDateTime={true}
                />
              ))}
            </div>
          </div>

          <div className="col-md-8 bg-white rounded-3">
            <div className="confirmed-service-parent d-flex flex-column justify-content-center p-2">
              <div className="title d-flex align-items-center justify-content-between pt-2 mb-4">
                <h3 className="fs-4">{confirmedAppointment.dateTime}</h3>
                <div
                  className="confirm-icon pe-2 m-3 btn-success rounded-pill d-flex align-items-center"
                  data-service="selected"
                >
                  <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                  <div className="confirmed-title">Confirmed</div>
                </div>
              </div>

              <div className="service-options p-4 my-4">
                <BookingDetails
                  location={confirmedAppointment.location}
                  service={confirmedAppointment.service}
                  price={confirmedAppointment.price}
                  dateTime={confirmedAppointment.dateTime}
                  duration={confirmedAppointment.duration}
                  showDateTime={true}
                  showButtonPayPal={false}
                  showButtonCash={false}
                />
              </div>
              <div className="cancellation-policy rounded mt-5 mx-2 p-2">
                <h3 className="fs-6 fw-bold">Cancellation policy</h3>
                <p className="fs-6 text-muted w-50">
                  Cancel for free anytime in advance, otherwise you will be
                  charged<strong> 100%</strong> of the service price for not
                  showing up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
