import React from "react";

function Service({ name, cost, selected, onSelect }) {
  return (
    <div
      className={`service p-2 d-flex border-bottom ${
        selected ? "selected" : ""
      }`}
      onClick={onSelect}
    >
      <i
        className={`fa-solid fa-check p-2 m-2 rounded-circle ${
          selected ? "selected" : ""
        }`}
      ></i>
      <div className="details">
        <div className="service-name d-flex align-items-base-line">
          <h4 className="fs-5 m-2">{name}</h4>
          <p className="fs-6 text-black-50 mx-5 mt-2">{cost}</p>
        </div>
      </div>
    </div>
  );
}

export default Service;
