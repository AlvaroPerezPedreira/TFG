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
import UpdateProfileSecondInputs from "./User/UpdateProfileComponents/UpdateProfileSecondInputs";

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

        <br />

        <Button onClick={handleClick}>Pulsa</Button>
      </Suspense>
    </>
  );
};

export default Home;
