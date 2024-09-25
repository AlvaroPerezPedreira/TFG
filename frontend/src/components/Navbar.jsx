import React from "react";
import "./styles/navbar.css";
import { useTranslation } from "react-i18next";
import UserIcon from "../icons/UserIcon";
import SpainIcon from "../icons/SpainIcon";
import UKIcon from "../icons/UKIcon";
import FranceIcon from "../icons/FranceIcon";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
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
          <Dropdown placement="bottom-end">
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
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" variant="solid">
                New file
              </DropdownItem>
              <DropdownItem key="copy" variant="solid">
                Copy link
              </DropdownItem>
              <DropdownItem
                className="text-[#FFDB58] w-full"
                key="updateProfile"
                variant="solid"
                onClick={() => {
                  startTransition(() => {
                    navigate("/updateProfile");
                  });
                }}
              >
                {t("updProfile")}
              </DropdownItem>
              <DropdownItem key="logout" variant="solid" onClick={logOut}>
                {t("logOut")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>{" "}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button radius="md" variant="bordered" color="default" isIconOnly>
                {getFlagIcon(currentLanguage)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="ES_FLAG"
                onClick={() => {
                  i18n.changeLanguage("es");
                }}
              >
                <div className="register-flag-container">
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
                <div className="register-flag-container">
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
                <div className="register-flag-container">
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
