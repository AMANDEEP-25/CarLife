// src/components/CarForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CarForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState({ car_type: "", company: "", dealer: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/cars",
        { title, description, images, tags },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      navigate("/cars");
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls].slice(0, 10));
  };

  return (
    <div className="car-form">
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <div className="image-preview">
          {images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Car Type"
          value={tags.car_type}
          onChange={(e) => setTags({ ...tags, car_type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          value={tags.company}
          onChange={(e) => setTags({ ...tags, company: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dealer"
          value={tags.dealer}
          onChange={(e) => setTags({ ...tags, dealer: e.target.value })}
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default CarForm;
