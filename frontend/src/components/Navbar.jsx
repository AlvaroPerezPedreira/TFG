import React from "react";
import "./styles/navbar.css";
import { useTranslation } from "react-i18next";
import UserIcon from "../icons/UserIcon";
import SpainIcon from "../icons/SpainIcon";
import UKIcon from "../icons/UKIcon";
import FranceIcon from "../icons/FranceIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@mirakle-ui/react";
import { useAuthContext } from "../context/AuthContext";
import { startTransition, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [t, i18n] = useTranslation(["navbar"]);
  const currentLanguage = i18n.language;
  const { setAuthUser } = useAuthContext();
  let navigate = useNavigate();

  const getFlagIcon = (currentLanguage) => {
    if (currentLanguage === "es") {
      return <SpainIcon />;
    } else if (currentLanguage === "en") {
      return <UKIcon />;
    } else {
      return <FranceIcon />;
    }
  };

  const logOut = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
  };

  return (
    <Suspense fallback="loading">
      <div className="navbar-container">
        <h1 className="navbar-title">DeepDive</h1>
        <div className="navbar-dropdown">
          <Dropdown>
            <DropdownTrigger>
              <Button
                radius="md"
                variant="bordered"
                color="default"
                isIconOnly
                customRippleColor="black"
              >
                <UserIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              position={"bottom-end"}
              offset={0}
              aria-label="Static Actions"
            >
              <DropdownItem textColor="#FFDB58" key="new" variant="solid">
                New file
              </DropdownItem>
              <DropdownItem key="copy" textColor="#FFDB58" variant="solid">
                Copy link
              </DropdownItem>
              <DropdownItem
                key="updateProfile"
                textColor="#FFDB58"
                variant="solid"
                onClick={() => {
                  startTransition(() => {
                    navigate("/updateProfile");
                  });
                }}
              >
                {t("updProfile")}
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                variant="solid"
                onClick={logOut}
              >
                {t("logOut")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>{" "}
          <Dropdown>
            <DropdownTrigger>
              <Button
                radius="md"
                variant="bordered"
                color="default"
                isIconOnly
                customRippleColor="black"
              >
                {getFlagIcon(currentLanguage)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              position={"bottom-end"}
              offset={0}
              aria-label="Static Actions"
            >
              <DropdownItem
                key="ES_FLAG"
                onClick={() => {
                  i18n.changeLanguage("es");
                }}
              >
                <div className="navbar-flag-container">
                  <SpainIcon />
                  <span>Spain</span>
                </div>
              </DropdownItem>
              <DropdownItem
                key="EN_FLAG"
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <div className="navbar-flag-container">
                  <UKIcon />
                  <span>United Kingdom</span>
                </div>
              </DropdownItem>
              <DropdownItem
                key="FR_FLAG"
                onClick={() => {
                  i18n.changeLanguage("fr");
                }}
              >
                <div className="navbar-flag-container">
                  <FranceIcon />
                  <span>France</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>{" "}
        </div>
      </div>
    </Suspense>
  );
};

export default Navbar;
