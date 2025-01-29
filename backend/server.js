// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/cars");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://jyotsnaaman2003:GnGTsnKIK2r9Kjhi@carmanagement.u3x5y.mongodb.net/?retryWrites=true&w=majority&appName=carManagement",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
