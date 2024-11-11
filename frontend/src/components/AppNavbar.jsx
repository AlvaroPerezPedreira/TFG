import React, { startTransition } from "react";
import "./styles/appnavbar.css";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FlagDropdown from "./GlobalComponents/FlagDropdown";
import NavBarLink from "./GlobalComponents/NavBarLink";
import { Link } from "@nextui-org/link";
import UserDropdown from "./GlobalComponents/UserDropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

const AppNavbar = () => {
  const [t] = useTranslation(["navbar"]);
  let navigate = useNavigate();
  const location = useLocation();

  const isActivePage = (path) => location.pathname === path;

  return (
    <Suspense fallback="loading">
      <Navbar maxWidth="full" className="navbar-container">
        <NavbarBrand>
          <NavBarLink />
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
              Home
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
              {t("contact")}
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
