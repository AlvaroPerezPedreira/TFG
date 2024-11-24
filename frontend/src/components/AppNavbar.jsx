import React, { startTransition } from "react";
import "./styles/appnavbar.css";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FlagDropdown from "./GlobalComponents/FlagDropdown";
import { Link } from "@nextui-org/link";
import UserDropdown from "./GlobalComponents/UserDropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { NbSearchIcon, NbHomeIcon, NbContactIcon } from "../icons/NavbarIcons";
import { useThemeContext } from "../context/ThemeContext";

const AppNavbar = () => {
  const [t] = useTranslation(["navbar"]);
  let navigate = useNavigate();
  const location = useLocation();
  const { dark, setDark } = useThemeContext();

  const isActivePage = (path) => location.pathname === path;

  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      navigate("/");
    });
  };

  const handleMode = () => {
    setDark((prev) => !prev);
  };

  console.log(dark);

  return (
    <Suspense fallback="loading">
      <Navbar maxWidth="full" className="navbar-container">
        <NavbarBrand>
          <Link
            className="navbar-deepdive-link"
            onClick={handleClick}
            isBlock
            color=""
          >
            {dark ? (
              <img
                src="/images/logo/LogoNegro.jpg"
                alt="Logo"
                className="navbar-logo-img"
              />
            ) : (
              <img
                src="/images/logo/LogoBlanco.jpg"
                alt="Logo"
                className="navbar-logo-img"
              />
            )}
            <span style={{ fontFamily: "Caveat, sans-serif" }}>DeepDive</span>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-8" justify="center">
          <NavbarItem className="navbar-links" isActive={isActivePage("/")}>
            <Link
              className="navbar-link"
              underline="hover"
              onClick={() => {
                startTransition(() => {
                  navigate("/");
                });
              }}
              size="md"
            >
              <div className="navbar-icon-text-container">
                <NbHomeIcon />
                <span className="search-text">{t("home")}</span>
              </div>
            </Link>
          </NavbarItem>
          <NavbarItem
            className="navbar-links"
            isActive={isActivePage("/searchLodges")}
          >
            <Link
              className="navbar-link"
              underline="hover"
              onClick={() => {
                startTransition(() => {
                  navigate("/searchLodges");
                });
              }}
              size="md"
            >
              <div className="navbar-icon-text-container">
                <NbSearchIcon />
                <span>{t("search")}</span>
              </div>
            </Link>
          </NavbarItem>
          <NavbarItem className="navbar-links" isActive={isActivePage("/test")}>
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
          </NavbarItem>
          <NavbarItem className="navbar-links">
            <button onClick={handleMode} className="bg-red-500">
              modo
            </button>
          </NavbarItem>
          <NavbarItem
            isActive={isActivePage("/contact")}
            className="navbar-links"
          >
            <Link
              className="navbar-link"
              underline="hover"
              size="md"
              onClick={() => {
                startTransition(() => {
                  navigate("/contact");
                });
              }}
            >
              <div className="navbar-icon-text-container">
                <NbContactIcon />
                <span>{t("contact")}</span>
              </div>
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <FlagDropdown />
          <UserDropdown />
        </NavbarContent>
      </Navbar>
    </Suspense>
  );
};

export default AppNavbar;
