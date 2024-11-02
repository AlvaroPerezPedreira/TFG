import "../styles/updateProfile.css";
import React, { startTransition } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateProfileHeaderLink() {
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    startTransition(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Link onClick={handleClick} className="updProfile-deepdive-link">
        <img
          src="/images/logo/LogoBlanco.jpg"
          alt="Logo"
          className="updProfile-logo-img"
        />
        <span style={{ fontFamily: "Caveat, sans-serif" }}>DeepDive</span>
      </Link>
    </>
  );
}
