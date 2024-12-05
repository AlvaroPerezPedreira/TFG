import React, { startTransition } from "react";
import "./styles/appnavbar.css";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { useThemeContext } from "../context/ThemeContext";
import { FbIcon, IgIcon, TwtIcon } from "../icons/SocialIcons";

const Footer = () => {
  const [t] = useTranslation(["navbar"]);
  let navigate = useNavigate();
  const location = useLocation();
  const { dark } = useThemeContext();

  return (
    <Suspense fallback="loading">
      <Navbar maxWidth="full" className="footer-container">
        <NavbarBrand>
          <div className="footer-title">
            <span className="footer-title-text">{t("rights")}</span>
            <span className="footer-title-text">{t("rights2")}</span>
          </div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-40 mr-20" justify="center">
          <NavbarItem>
            <Link
              className="footer-link"
              underline="hover"
              onClick={() => {
                startTransition(() => {
                  navigate("/policy");
                });
              }}
              size="md"
            >
              <span className="search-text">{t("policy")}</span>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="footer-link"
              underline="hover"
              onClick={() => {
                startTransition(() => {
                  navigate("/about");
                });
              }}
              size="md"
            >
              <span className="search-text">{t("about")}</span>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <div className="footer-icons-container">
          <FbIcon />
          <IgIcon />
          <TwtIcon />
        </div>
      </Navbar>
    </Suspense>
  );
};

export default Footer;
