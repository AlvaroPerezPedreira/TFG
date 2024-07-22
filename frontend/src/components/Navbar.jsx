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

const Navbar = () => {
  const [t, i18n] = useTranslation(["navbar"]);
  const currentLanguage = i18n.language;
  const { setAuthUser } = useAuthContext();

  console.log(currentLanguage);

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
            <DropdownItem textColor="aqua" key="new">
              New file
            </DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
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
  );
};

export default Navbar;
