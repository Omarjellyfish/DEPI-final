import React, { useState, useEffect, useContext } from "react";
import Service from "../../components/Service/Service";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SelectedServicesContext } from "../../context/SelectedServicesContext";

function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedServices, setSelectedServices } = useContext(SelectedServicesContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services");
        if (Array.isArray(response.data)) {
          setServices(response.data);
          setFilteredServices(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError("Failed to load services. Please try again later.");
      }
    };

    fetchServices();
  }, []);

  const handleSelectService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  };

  return (
    <div className="services bg-light">
      <div className="container pt-5">
        {error && <p className="text-danger">{error}</p>}
        <p className="m-0">Step 1 of 3:</p>
        <div className="container">
          <div className="row align-items-center">
            <h3 className="col-md-3 fw-bold me-4 mt-3">Select services</h3>
            <form
              action="#"
              className="col-md-6 ms-3 d-flex position-relative flex-grow-1 flex-lg-grow-0 mb-3 mb-lg-0"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="position-absolute"
              />
              <input
                className="form-control ps-5 btn-outline-none mt-2 mt-md-0"
                type="search"
                placeholder="Search Available Services"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
            <h4 className="col-md-3 fs-4 my-4 therapy py-2 px-4 rounded">
              Physical Therapy
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="services-parent d-flex flex-column bg-white rounded p-3">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <Service
                    key={index}
                    name={service.name}
                    cost={`USD ${service.cost}`}
                    selected={selectedServices.includes(service)}
                    onSelect={() => handleSelectService(service)}
                  />
                ))
              ) : (
                <p>No services available</p>
              )}
            </div>
          </div>

          <div className="col-md-3 pt-3 pt-md-0">
            <BookingDetails
              location="Vurve - Shara"
              service={selectedServices.map((s) => s.name).join(", ") || "No Service"}
              price={selectedServices.reduce((total, s) => total + s.cost, 0) || "0"}
              dateTime="Sun 16 July 2023 at 5:00pm"
              duration="1h"
              showDateTime={false}
              showButtonNext={true} // Keep the "Next" button here
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
