import React from "react";
import "./styles/navbar.css";
import { useTranslation } from "react-i18next";
import { startTransition, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import FlagDropdown from "./GlobalComponents/FlagDropdown";
import NavBarLink from "./GlobalComponents/NavBarLink";
import { Link } from "@nextui-org/link";
import UserDropdown from "./GlobalComponents/UserDropdown";

const Navbar = () => {
  const [t] = useTranslation(["navbar"]);
  let navigate = useNavigate();

  return (
    <Suspense fallback="loading">
      <div className="navbar-container">
        <h1 className="navbar-title">
          <NavBarLink />
        </h1>
        <div className="navbar-links">
          <Link
            className="navbar-link"
            underline="hover"
            onClick={() => {
              startTransition(() => {
                navigate("/test");
              });
            }}
            size="md"
          >
            Test
          </Link>
          <Link className="navbar-link" underline="hover" href="/" size="md">
            {t("contact")}
          </Link>
          <Link className="navbar-link" underline="hover" href="/" size="md">
            {t("about")}
          </Link>
          <Link
            className="navbar-link"
            underline="hover"
            onClick={() => {
              startTransition(() => {
                navigate("/users/a@udc.es");
              });
            }}
            size="md"
          >
            GetUserTest
          </Link>
        </div>
        <div className="navbar-dropdown">
          <FlagDropdown />
          <UserDropdown />
        </div>
      </div>
    </Suspense>
  );
};

export default Navbar;
