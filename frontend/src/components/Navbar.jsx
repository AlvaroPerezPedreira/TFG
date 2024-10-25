import React from "react";
import "./styles/navbar.css";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useAuthContext } from "../context/AuthContext";
import { startTransition, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import FlagDropdown from "./GlobalComponents/FlagDropdown";
import NavBarLink from "./GlobalComponents/NavBarLink";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

const Navbar = () => {
  const [t] = useTranslation(["navbar"]);
  const { authUser, setAuthUser } = useAuthContext();
  let navigate = useNavigate();

  const logOut = () => {
    startTransition(() => {
      localStorage.removeItem("authUser");
      setAuthUser(null);
      navigate("/login"); // Mover la navegación dentro de startTransition
    });
  };

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
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src={`http://localhost:8080/images/${authUser.user.avatar}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue={t("profile")}
              >
                <p className="font-semibold">{t("signed")}</p>
                <p className="font-semibold">{authUser.user.email}</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => console.log(authUser)}
              >
                AuthUser
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
              <DropdownItem
                key="logout"
                variant="solid"
                onClick={logOut}
                textValue={t("logOut")}
              >
                {t("logOut")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </Suspense>
  );
};

export default Navbar;
