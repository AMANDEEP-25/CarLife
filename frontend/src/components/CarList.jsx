// src/components/CarList.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

function CarList() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(car.tags).some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="car-list">
      <h2>Your Cars</h2>
      <input
        type="text"
        placeholder="Search cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link to="/cars/new">Add New Car</Link>
      {filteredCars.map((car) => (
        <div key={car._id} className="car-item">
          <h3>{car.title}</h3>
          <p>{car.description}</p>
          <Link to={`/cars/${car._id}`}>View Details</Link>
        </div>
      ))}
      <br />
      <a href={`${url}/api/docs`} target="_blank" rel="noopener noreferrer">
        API Documentation
      </a>
    </div>
  );
}

export default CarList;
