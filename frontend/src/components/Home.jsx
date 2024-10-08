import React, { startTransition, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import "./styles/home.css";
import { useAuthContext } from "../context/AuthContext";

import { Button } from "@nextui-org/button";
import GenderRadioGroup from "./User/UserComponents/GenderRadioGroup";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [t] = useTranslation(["welcome"]);
  const { authUser } = useAuthContext();
  const [gender, setGender] = useState(authUser.user?.gender || "");
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: authUser.user?.username || "",
    name: authUser.user?.name || "",
    lastname: authUser.user?.lastname || "",
    phone: authUser.user?.phone || "",
    birthdate: authUser.user?.birthdate || "",
    country: authUser.user?.country || "",
    gender: gender,
    address: authUser.user?.address || "",
    passport: authUser.user?.passport || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    console.log("Button clicked", authUser);
  };

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
          <GenderRadioGroup gender={gender} setGender={setGender} />
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              startTransition(() => {
                navigate("/changePassword");
              });
            }}
            className="updProfile-changePassword-Link"
          >
            {t("changePassword")}
          </button>
        </div>

        <br />
        <Button onClick={handleClick}>Pulsa</Button>
      </Suspense>
    </>
  );
};

export default Home;
