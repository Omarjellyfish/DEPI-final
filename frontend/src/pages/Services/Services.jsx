import "./Services.css";
import BookingDetails from "../../components/BookingDetails/BookingDetails";

function Services() {
  return (
    <div className="services bg-light">
      <div className="container pt-5">
        <p className="m-0">Step 1 of 3:</p>
        <div className="container ">
          <div className="row align-items-center">
            <h3 className="col-md-6 fw-bold me-4 mt-3">Select services</h3>
            <h4 className="col-md-6 fs-4 my-4 therapy py-2 px-4 rounded">
              physical therapy
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="services-parent d-flex flex-column bg-white rounded p-3">
              <div
                className="service p-2 d-flex border-bottom"
                data-service="selected"
              >
                <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                <div className="details">
                  <div className="service-name d-flex align-items-base-line">
                    <h4 className="fs-5 m-2">Haircut - Premier Stylist</h4>
                    <p className="fs-6 text-black-50 mx-5 mt-2">INR 900</p>
                  </div>
                  <p className="fs-6 text-black-50 text-start mx-2">1h</p>
                </div>
              </div>
              <div className="service p-2 d-flex border-bottom mt-3">
                <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                <div className="details">
                  <div className="service-name d-flex align-items-base-line">
                    <h4 className="fs-5 m-2">Haircut - Premier Stylist</h4>
                    <p className="fs-6 text-black-50 mx-5 mt-2">INR 900</p>
                  </div>
                  <p className="fs-6 text-black-50 text-start mx-2">1h</p>
                </div>
              </div>
              <div className="service p-2 d-flex border-bottom mt-3">
                <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                <div className="details">
                  <div className="service-name d-flex align-items-base-line">
                    <h4 className="fs-5 m-2">Haircut - Premier Stylist</h4>
                    <p className="fs-6 text-black-50 mx-5 mt-2">INR 900</p>
                  </div>
                  <p className="fs-6 text-black-50 text-start mx-2">1h</p>
                </div>
              </div>
              <div className="service p-2 d-flex border-bottom mt-3">
                <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                <div className="details">
                  <div className="service-name d-flex align-items-base-line">
                    <h4 className="fs-5 m-2">Haircut - Premier Stylist</h4>
                    <p className="fs-6 text-black-50 mx-5 mt-2">INR 900</p>
                  </div>
                  <p className="fs-6 text-black-50 text-start mx-2">1h</p>
                </div>
              </div>
              <div className="service p-2 d-flex border-bottom mt-3">
                <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                <div className="details">
                  <div className="service-name d-flex align-items-base-line">
                    <h4 className="fs-5 m-2">Haircut - Premier Stylist</h4>
                    <p className="fs-6 text-black-50 mx-5 mt-2">INR 900</p>
                  </div>
                  <p className="fs-6 text-black-50 text-start mx-2">1h</p>
                </div>
              </div>
              <div className="service p-2 d-flex border-bottom mt-3">
                <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                <div className="details">
                  <div className="service-name d-flex align-items-base-line">
                    <h4 className="fs-5 m-2">Haircut - Premier Stylist</h4>
                    <p className="fs-6 text-black-50 mx-5 mt-2">INR 900</p>
                  </div>
                  <p className="fs-6 text-black-50 text-start mx-2">1h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 pt-3 pt-md-0">
            <BookingDetails
              location="Vurve - shara "
              service="Haircut - Premier Stylist"
              price="900"
              dateTime="Sun 16 July 2023 at 5:00pm"
              duration="1h duration, ends at 6:00pm"
              showDateTime={true}
              showButtonNext={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
