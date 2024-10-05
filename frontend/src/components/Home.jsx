import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import "./styles/home.css";
import { useAuthContext } from "../context/AuthContext";

import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import GenderRadioGroup from "./GenderRadioGroup";

const Home = () => {
  const [t] = useTranslation(["welcome"]);
  const { authUser } = useAuthContext();
  const [gender, setGender] = useState(authUser.user?.gender || "");

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

  const handleClick = () => {
    console.log("Button clicked", gender);
  };

  const handleRadioChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
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
      <Button onClick={handleClick}>Pulsa</Button>
    </>
  );
};

export default Home;
