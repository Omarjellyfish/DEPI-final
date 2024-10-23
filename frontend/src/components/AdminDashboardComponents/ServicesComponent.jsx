import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ServicesComponent = () => {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [services, setServices] = useState([]);
  const [editServiceId, setEditServiceId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const newService = {
      name: serviceName,
      cost: servicePrice,
    };

    if (editServiceId) {
      axios
        .put(`http://localhost:5001/services/${editServiceId}`, newService)
        .then((response) => {
          setServices(
            services.map((service) =>
              service.id === editServiceId ? response.data : service
            )
          );
          toast.success("Service updated successfully!");
          setServiceName("");
          setServicePrice("");
          setEditServiceId(null);
        })
        .catch((error) => {
          console.error("Error updating service:", error);
          toast.error("Failed to update service!");
        });
    } else {
      axios
        .post("http://localhost:5001/services", newService)
        .then((response) => {
          setServices([...services, response.data]);
          toast.success("Service added successfully!");
          setServiceName("");
          setServicePrice("");
        })
        .catch((error) => {
          console.error("Error adding service:", error);
          toast.error("Failed to add service!");
        });
    }
  };

  const handleDeleteService = (serviceId) => {
    axios
      .delete(`http://localhost:5001/services/${serviceId}`)
      .then(() => {
        setServices(services.filter((service) => service.id !== serviceId));
        toast.success("Service deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service!");
      });
  };

  const handleUpdateService = (serviceId) => {
    const serviceToEdit = services.find((service) => service.id === serviceId);
    if (serviceToEdit) {
      setServiceName(serviceToEdit.name);
      setServicePrice(serviceToEdit.cost);
      setEditServiceId(serviceId);
    }
  };

  return (
    <div>
      <form onSubmit={handleServiceSubmit}>
        <div className="mb-3">
          <label className="form-label">Service Name</label>
          <input
            type="text"
            className="form-control"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Service Price</label>
          <input
            type="number"
            className="form-control"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editServiceId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <h4 className="mt-4">Available Services</h4>
      <ul className="list-group">
        {services.map((service) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={service.id}
          >
            {service.name} - ${service.cost}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleUpdateService(service.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteService(service.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesComponent;
