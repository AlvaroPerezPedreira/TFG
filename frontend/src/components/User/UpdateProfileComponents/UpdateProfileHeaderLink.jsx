import "../styles/updateProfile.css";
import React from "react";
import { Link } from "react-router-dom";

export default function UpdateProfileHeaderLink() {
  return (
    <>
      <Link to="/" className="updProfile-deepdive-link">
        <img
          src="/images/logo/LogoBlanco.jpg"
          alt="Logo"
          className="updProfile-logo-img"
        />
        <span>DeepDive</span>
      </Link>
    </>
  );
}
