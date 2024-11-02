import React, { startTransition } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBarLink() {
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      navigate("/");
    });
  };

  return (
    <Link
      to="/" // Es importante tener el `to` aquí para que funcione correctamente
      onClick={handleClick}
      className="navbar-deepdive-link"
    >
      <img
        src="/images/logo/LogoNegro.jpg"
        alt="Logo"
        className="navbar-logo-img"
      />
      <span style={{ fontFamily: "Caveat, sans-serif" }}>DeepDive</span>
    </Link>
  );
}
