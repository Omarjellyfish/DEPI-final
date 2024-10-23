import "./Success.css";
import BookingDetails from "../../components/BookingDetails/BookingDetails";

function Success() {
  return (
    <div className="success p-5 bg-light rounded">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="upcoming mb-5">
              <h3 className="fs-4 ms-5">Upcoming appointments</h3>

              <div className="card mb-3 card-parent">
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-md-4">
                    <img
                      src="images/service-details.jpg"
                      className="img-fluid service-img rounded m-2"
                      alt="service"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-text  mb-1">
                        <small className="text-muted">
                          Sun 16 July 2023 at 5:00pm
                        </small>
                      </p>
                      <h5 className="card-title fw-bold">Vurve - Bangalore</h5>
                      <p className="card-text mb-2">
                        Haircut - Premier Stylist
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="past mb-5">
              <h3 className="fs-4 ms-5">Past appointments</h3>

              <div className="card mb-3 card-parent">
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-md-4">
                    <img
                      src="images/service-details.jpg"
                      className="img-fluid service-img rounded m-2"
                      alt="service"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-text  mb-1">
                        <small className="text-muted">
                          Sun 16 July 2023 at 5:00pm
                        </small>
                      </p>
                      <h5 className="card-title fw-bold">Vurve - Bangalore</h5>
                      <p className="card-text mb-2">
                        Haircut - Premier Stylist
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 bg-white rounded-3">
            <div className="confirmed-service-parent">
              <div className="title d-flex align-items-center justify-content-between pt-2">
                <h3 className="fs-4">Sun 16 July 2023 at 5:00pm</h3>
                <div
                  className="confirm-icon pe-2 m-3 btn-success rounded-pill d-flex align-items-center"
                  data-service="selected"
                >
                  <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
                  <div className="confirmed-title">Confirmed</div>
                </div>
              </div>

              <div className="service-options">
                <div className="container bg-light rounded-4 pt-3">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-6">
                      <div className="card mb-3 card-parent">
                        <div className="row g-0 d-flex align-items-center">
                          <div className="col-md-4">
                            <img
                              src="images/service-details.jpg"
                              className="img-fluid service-img rounded m-2"
                              alt="service"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <p className="card-text  mb-1">
                                <small className="text-muted">
                                  Sun 16 July 2023 at 5:00pm
                                </small>
                              </p>
                              <h5 className="card-title fw-bold">
                                Vurve - Bangalore
                              </h5>
                              <p className="card-text mb-2">
                                Haircut - Premier Stylist
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="container">
                        <div className="row text-center">
                          <div className="option-names-parent col-lg-4 w-md-100">
                            <div className="bg-white icon-parent rounded-4 p-1 my-1 mx-2 py-3 ms-0 w-100">
                              <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <h3 className="text-muted small-txt my-3">Directions</h3>
                          </div>
                          <div className="option-names-parent col-lg-4 w-md-100">
                            <div className="bg-white icon-parent rounded-4 p-1 my-1 mx-2 py-3 ms-0 w-100">
                              <i className="fa-solid fa-calendar-days"></i>
                            </div>
                            <h3 className="text-muted small-txt my-3">Reschedule</h3>
                          </div>
                          <div className="option-names-parent col-lg-4 w-md-100">
                            <div className="bg-white icon-parent rounded-4 p-1 my-1 mx-2 py-3 ms-0 w-100">
                              <i className="fa-solid fa-circle-xmark"></i>
                            </div>
                            <h3 className="text-muted small-txt my-3">Cancel</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="service-info m-2 p-2 rounded-3 bg-white border">
                <div className="details ms-3 mb-1 border-bottom border-2">
                  <div className="service-name d-flex align-items-base-line justify-content-between">
                    <h4 className="fs-5 m-2">Haircut - Premier Stylist</h4>
                    <p className="fs-6 mx-5 mt-2">INR 900</p>
                  </div>
                  <p className="fs-6 text-black-50 text-start mx-2">1h</p>
                </div>
                <div className="details ms-3 mb-1 border-bottom border-2">
                  <div className="service-name d-flex align-items-base-line justify-content-between">
                    <h4 className="fs-6 m-2 text-black-50">Taxes</h4>
                    <p className="fs-6 mx-5 mt-2 text-black-50">INR 0</p>
                  </div>
                  <div className="service-name d-flex align-items-base-line justify-content-between">
                    <h4 className="fs-4 m-2">Total</h4>
                    <p className="fs-6 mx-5 mt-2">INR 900</p>
                  </div>
                </div>
              </div>

              <div className="cancellation-policy bg-white rounded m-2 p-2">
                <h3 className="fs-6 fw-bold">Cancellation policy</h3>
                <p className="fs-6 text-muted w-50">
                  Cancel for free anytime in advance, otherwise you will be
                  charged
                  <strong> 100%</strong> of the service price for not showing
                  up.
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
