import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { Divider, Input } from "@miracle-ui/react";
import "./styles/home.css";

const Home = () => {
  const [t, i18n] = useTranslation(["welcome"]);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>{t("title")}</h1>
        <h2>{t("description")}</h2>
        <Input variant="underlined" />
        <Divider />
      </div>
    </>
  );
};

export default Home;
