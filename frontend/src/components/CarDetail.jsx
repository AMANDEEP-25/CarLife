// src/components/CarDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CarDetail() {
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setCar(response.data);
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, car, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        navigate("/cars");
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="car-detail">
      <h2>{car.title}</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={car.title}
            onChange={(e) => setCar({ ...car, title: e.target.value })}
            required
          />
          <textarea
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            required
          ></textarea>
          <input
            type="text"
            value={car.tags.car_type}
            onChange={(e) =>
              setCar({
                ...car,
                tags: { ...car.tags, car_type: e.target.value },
              })
            }
          />
          <input
            type="text"
            value={car.tags.company}
            onChange={(e) =>
              setCar({ ...car, tags: { ...car.tags, company: e.target.value } })
            }
          />
          <input
            type="text"
            value={car.tags.dealer}
            onChange={(e) =>
              setCar({ ...car, tags: { ...car.tags, dealer: e.target.value } })
            }
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{car.description}</p>
          <div className="tags">
            <span>Car Type: {car.tags.car_type}</span>
            <span>Company: {car.tags.company}</span>
            <span>Dealer: {car.tags.dealer}</span>
          </div>
          <div className="images">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Car ${index + 1}`}
              />
            ))}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default CarDetail;
