// routes/cars.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Car = require("../models/Car");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

router.post("/", authMiddleware, async (req, res) => {
  try {
    const car = new Car({ ...req.body, user: req.user.userId });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: "Error creating car" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cars" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const car = await Car.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Error fetching car" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Error updating car" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting car" });
  }
});

module.exports = router;
