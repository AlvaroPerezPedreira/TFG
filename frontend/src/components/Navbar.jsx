import React from "react";
import "./styles/navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <div className="navbar-container">
      <h1 className="navbar-title">Booking</h1>
      {location.pathname === "/" && (
        <button onClick={handleClick} className="navbar-button">
          Regístrate o inicia sesión
        </button>
      )}
    </div>
  );
};

export default Navbar;
