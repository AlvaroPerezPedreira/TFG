import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { Divider } from "@mirakle-ui/react";
import "./styles/home.css";

const Home = () => {
  const [t, i18n] = useTranslation(["welcome"]);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>{t("title")}</h1>
        <h2>{t("description")}</h2>
        <Divider />
      </div>
    </>
  );
};

export default Home;
