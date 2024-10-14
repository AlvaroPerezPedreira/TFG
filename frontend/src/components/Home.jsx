import React, { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import "./styles/home.css";
import { useAuthContext } from "../context/AuthContext";

import { Button } from "@nextui-org/button";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [t] = useTranslation(["welcome"]);
  const { authUser, setAuthUser } = useAuthContext();
  let navigate = useNavigate();

  const handleClick = () => {
    startTransition(() => {
      navigate("/users/a@udc.es");
    });
  };

  const logOut = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
  };

  console.log(authUser);

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />

        <div className="home-container">
          <h1>{t("title")}</h1>
          <h2>{t("description")}</h2>
        </div>

        <br />

        <div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={`http://localhost:8080/images/${authUser.user.avatar}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{t("signed")}</p>
                <p className="font-semibold">{authUser.user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Test</DropdownItem>
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
        </div>

        <br />
        <br />

        <Button onClick={handleClick}>Pulsa</Button>
      </Suspense>
    </>
  );
};

export default Home;
