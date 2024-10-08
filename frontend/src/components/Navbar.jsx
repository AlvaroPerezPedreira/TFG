import React from "react";
import "./styles/navbar.css";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useAuthContext } from "../context/AuthContext";
import { startTransition, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import FlagDropdown from "./GlobalComponents/FlagDropdown";
import NavBarLink from "./GlobalComponents/NavBarLink";

const Navbar = () => {
  const [t, i18n] = useTranslation(["navbar"]);
  const { authUser, setAuthUser } = useAuthContext();
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
  };

  return (
    <Suspense fallback="loading">
      <div className="navbar-container">
        <h1 className="navbar-title">
          <NavBarLink />
        </h1>
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
                <img
                  src={`http://localhost:8080/images/${authUser.user.avatar}`}
                  alt=""
                  className="navbar-avatar"
                />
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
          </Dropdown>
          <FlagDropdown />
        </div>
      </div>
    </Suspense>
  );
};

export default Navbar;
