import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../components/Service/Service";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import "./Services.css";

function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching services");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
      }
    };

    fetchServices();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: serviceName,
          cost: parseInt(serviceCost),
        }),
      });

      if (response.ok) {
        const newService = { name: serviceName, cost: serviceCost };
        setServices([...services, newService]);
        setMessage("Service added successfully.");
        setServiceName("");
        setServiceCost("");
      } else {
        throw new Error("Error adding service");
      }
    } catch (err) {
      setMessage("Failed to add service. Please try again later.");
    }
  };

  const handleDeleteService = async (serviceName) => {
    try {
      const response = await fetch("/api/services", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: serviceName }),
      });

      if (response.ok) {
        setServices(services.filter((service) => service.name !== serviceName));
        setMessage("Service deleted successfully.");
      } else if (response.status === 404) {
        setMessage("No service found with that name.");
      } else {
        throw new Error("Error deleting service");
      }
    } catch (err) {
      setMessage("Failed to delete service. Please try again later.");
    }
  };

  const handleUpdateServiceCost = async (serviceName, newCost) => {
    try {
      const response = await fetch("/api/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: serviceName, newCost }),
      });

      if (response.ok) {
        const updatedServices = services.map((service) =>
          service.name === serviceName ? { ...service, cost: newCost } : service
        );
        setServices(updatedServices);
        setMessage("Service cost updated successfully.");
      } else {
        throw new Error("Error updating service cost");
      }
    } catch (err) {
      setMessage("Failed to update service. Please try again later.");
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="services bg-light">
      <div className="container pt-5">
        {error && <p className="text-danger">{error}</p>}
        {message && <p className="text-success">{message}</p>}

        <button onClick={redirectToLogin} className="btn btn-primary mb-3">
          Switch to Admin
        </button>

        <p className="m-0">Step 1 of 3:</p>
        <div className="container">
          <div className="row align-items-center">
            <h3 className="col-md-6 fw-bold me-4 mt-3">Select services</h3>
            <h4 className="col-md-6 fs-4 my-4 therapy py-2 px-4 rounded">
              Physical Therapy
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <div className="services-parent d-flex flex-column bg-white rounded p-3">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <Service
                    key={index}
                    name={service.name}
                    price={`INR ${service.cost}`}
                    duration="1h"
                    onDelete={isAdmin ? handleDeleteService : null}
                    onUpdateCost={isAdmin ? handleUpdateServiceCost : null}
                    isAdmin={isAdmin}
                  />
                ))
              ) : (
                <p>No services available</p>
              )}
            </div>

            {isAdmin && (
              <div className="add-service mt-4">
                <form onSubmit={handleAddService}>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Service Name"
                    required
                    className="form-control mb-2"
                  />
                  <input
                    type="number"
                    value={serviceCost}
                    onChange={(e) => setServiceCost(e.target.value)}
                    placeholder="Service Cost"
                    required
                    className="form-control mb-2"
                  />
                  <button type="submit" className="btn btn-primary">
                    Add Service
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="col-md-3 pt-3 pt-md-0">
            <BookingDetails
              location="Vurve - Shara"
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

// sample data ///////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Service from "../../components/Service/Service";
// import BookingDetails from "../../components/BookingDetails/BookingDetails";
// import "./Services.css";

// function Services() {
//   const navigate = useNavigate();
//   const [services, setServices] = useState([]);
//   const [serviceName, setServiceName] = useState("");
//   const [serviceCost, setServiceCost] = useState("");
//   const [selectedService, setSelectedService] = useState(null);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   // Sample data
//   const sampleServices = [
//     { name: "Massage Therapy", cost: 50 },
//     { name: "Physical Therapy", cost: 75 },
//     { name: "Yoga Session", cost: 30 },
//   ];

//   // Instead of fetching services, set sample data directly
//   useEffect(() => {
//     setServices(sampleServices);
//   }, []);

//   const handleAddService = async (e) => {
//     e.preventDefault();
//     // Only allow adding services if admin is true
//     if (isAdmin) {
//       try {
//         const response = await fetch("/api/services", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: serviceName,
//             cost: parseInt(serviceCost),
//           }),
//         });

//         if (response.ok) {
//           const newService = { name: serviceName, cost: serviceCost };
//           setServices([...services, newService]);
//           setMessage("Service added successfully.");
//           setServiceName("");
//           setServiceCost("");
//         } else {
//           throw new Error("Error adding service");
//         }
//       } catch (err) {
//         setMessage("Failed to add service. Please try again later.");
//       }
//     } else {
//       setMessage("You need to be an admin to add services.");
//     }
//   };

//   const handleDeleteService = async (serviceName) => {
//     // Ensure user is admin before deletion
//     if (isAdmin) {
//       try {
//         const response = await fetch("/api/services", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name: serviceName }),
//         });

//         if (response.ok) {
//           setServices(
//             services.filter((service) => service.name !== serviceName)
//           );
//           setMessage("Service deleted successfully.");
//         } else if (response.status === 404) {
//           setMessage("No service found with that name.");
//         } else {
//           throw new Error("Error deleting service");
//         }
//       } catch (err) {
//         setMessage("Failed to delete service. Please try again later.");
//       }
//     } else {
//       setMessage("You need to be an admin to delete services.");
//     }
//   };

//   const handleUpdateServiceCost = async (serviceName, newCost) => {
//     // Ensure user is admin before updating
//     if (isAdmin) {
//       try {
//         const response = await fetch("/api/services", {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name: serviceName, newCost }),
//         });

//         if (response.ok) {
//           const updatedServices = services.map((service) =>
//             service.name === serviceName
//               ? { ...service, cost: newCost }
//               : service
//           );
//           setServices(updatedServices);
//           setMessage("Service cost updated successfully.");
//         } else {
//           throw new Error("Error updating service cost");
//         }
//       } catch (err) {
//         setMessage("Failed to update service. Please try again later.");
//       }
//     } else {
//       setMessage("You need to be an admin to update services.");
//     }
//   };

//   const redirectToLogin = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="services bg-light">
//       <div className="container pt-5">
//         {error && <p className="text-danger">{error}</p>}
//         {message && <p className="text-success">{message}</p>}

//         <button onClick={redirectToLogin} className="btn btn-primary mb-3">
//           Switch to Admin
//         </button>

//         <p className="m-0">Step 1 of 3:</p>
//         <div className="container">
//           <div className="row align-items-center">
//             <h3 className="col-md-6 fw-bold me-4 mt-3">Select services</h3>
//             <h4 className="col-md-6 fs-4 my-4 therapy py-2 px-4 rounded">
//               Physical Therapy
//             </h4>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-9">
//             <div className="services-parent d-flex flex-column bg-white rounded p-3">
//               {services.length > 0 ? (
//                 services.map((service, index) => (
//                   <Service
//                     key={index}
//                     name={service.name}
//                     price={`INR ${service.cost}`}
//                     duration="1h"
//                     onDelete={isAdmin ? handleDeleteService : null}
//                     onUpdateCost={isAdmin ? handleUpdateServiceCost : null}
//                     isAdmin={isAdmin}
//                   />
//                 ))
//               ) : (
//                 <p>No services available</p>
//               )}
//             </div>

//             {isAdmin && (
//               <div className="add-service mt-4">
//                 <form onSubmit={handleAddService}>
//                   <input
//                     type="text"
//                     value={serviceName}
//                     onChange={(e) => setServiceName(e.target.value)}
//                     placeholder="Service Name"
//                     required
//                     className="form-control mb-2"
//                   />
//                   <input
//                     type="number"
//                     value={serviceCost}
//                     onChange={(e) => setServiceCost(e.target.value)}
//                     placeholder="Service Cost"
//                     required
//                     className="form-control mb-2"
//                   />
//                   <button type="submit" className="btn btn-primary">
//                     Add Service
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>

//           <div className="col-md-3 pt-3 pt-md-0">
//             <BookingDetails
//               location="Vurve - Shara"
//               service="Haircut - Premier Stylist"
//               price="900"
//               dateTime="Sun 16 July 2023 at 5:00pm"
//               duration="1h duration, ends at 6:00pm"
//               showDateTime={true}
//               showButtonNext={true}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Services;
