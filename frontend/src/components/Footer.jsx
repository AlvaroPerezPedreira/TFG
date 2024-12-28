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
import { Button } from "@nextui-org/button";
import toast, { Toaster } from "react-hot-toast";

const Footer = () => {
  const [t] = useTranslation(["navbar"]);
  let navigate = useNavigate();
  const location = useLocation();
  const { dark } = useThemeContext();

  const handleClick = (social) => () => {
    if (social === "fb") {
      toast("Facebook!", {
        icon: <FbIcon />,
        duration: 1000,
        style: {
          borderRadius: "10px",
          backgroundColor: "var(--main-background)",
          border: "1px solid var(--inverted-background-color)",
          color: "var(--AppMainColor)",
        },
      });
    } else if (social === "ig") {
      toast("Instagram!", {
        icon: <IgIcon />,
        duration: 1000,
        style: {
          borderRadius: "10px",
          backgroundColor: "var(--main-background)",
          border: "1px solid var(--inverted-background-color)",
          color: "var(--AppMainColor)",
        },
      });
    } else if (social === "twt") {
      toast("Twitter!", {
        icon: <TwtIcon />,
        duration: 1000,
        style: {
          borderRadius: "10px",
          backgroundColor: "var(--main-background)",
          border: "1px solid var(--inverted-background-color)",
          color: "var(--AppMainColor)",
        },
      });
    } else {
      toast("Something went wrong", {
        icon: "⚠️",
        duration: 1000,
        style: {
          borderRadius: "10px",
          backgroundColor: "var(--main-background)",
          border: "1px solid var(--inverted-background-color)",
          color: "var(--AppMainColor)",
        },
      });
    }
  };

  return (
    <Suspense fallback="loading">
      <Toaster position="top-center" reverseOrder={false} />
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
              onPress={() => {
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
              onPress={() => {
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
          <Button isIconOnly variant="" onPress={handleClick("fb")}>
            <FbIcon />
          </Button>
          <Button isIconOnly variant="" onPress={handleClick("ig")}>
            <IgIcon />
          </Button>
          <Button isIconOnly variant="" onPress={handleClick("twt")}>
            <TwtIcon />
          </Button>
        </div>
      </Navbar>
    </Suspense>
  );
};

export default Footer;
