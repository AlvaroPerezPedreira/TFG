import React from "react";
import { Link } from "react-router-dom";

export default function NavBarLink() {
  return (
    <>
      <Link to="/" className="navbar-deepdive-link">
        <img
          src="/images/logo/LogoNegro.jpg"
          alt="Logo"
          className="navbar-logo-img"
        />
        <span style={{ fontFamily: "Caveat, sans-serif" }}>DeepDive</span>
      </Link>
    </>
  );
}
