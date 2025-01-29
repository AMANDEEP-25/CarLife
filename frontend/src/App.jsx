// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import CarList from "./components/CarList";
import CarForm from "./components/CarForm";
import CarDetail from "./components/CarDetail";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Car Management App</h1>
          {token && <button onClick={handleLogout}>Logout</button>}
        </header>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/cars" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/cars"
            element={token ? <CarList /> : <Navigate to="/" />}
          />
          <Route
            path="/cars/new"
            element={token ? <CarForm /> : <Navigate to="/" />}
          />
          <Route
            path="/cars/:id"
            element={token ? <CarDetail /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
