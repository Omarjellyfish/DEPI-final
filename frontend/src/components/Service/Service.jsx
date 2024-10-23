import React, { useState } from "react";
import "./Service.css";

function Service({ name, price, duration, onDelete, onUpdateCost, isAdmin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCost, setNewCost] = useState("");

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateCost(name, newCost);
    setIsEditing(false);
  };

  return (
    <div className="service p-2 d-flex border-bottom">
      <i className="fa-solid fa-check p-2 m-2 rounded-circle"></i>
      <div className="details">
        <div className="service-name d-flex align-items-base-line">
          <h4 className="fs-5 m-2">{name}</h4>
          <p className="fs-6 text-black-50 mx-5 mt-2">{price}</p>
          {isAdmin && !isEditing && (
            <button onClick={handleUpdateClick} className="btn btn-sm btn-link">
              Update Cost
            </button>
          )}
        </div>
        <p className="fs-6 text-black-50 text-start mx-2">{duration}</p>
        {isAdmin && (
          <>
            {isEditing && (
              <>
                <input
                  type="number"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  placeholder="New Cost"
                />
                <button onClick={handleSaveClick} className="btn btn-sm btn-success">
                  Save
                </button>
              </>
            )}
            <button
              onClick={() => onDelete(name)}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Service;
