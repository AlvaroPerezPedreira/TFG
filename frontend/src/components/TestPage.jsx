import React from "react";
import { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const TestPage = () => {
  const [t] = useTranslation(["welcome"]);
  const { authUser } = useAuthContext();
  let navigate = useNavigate();

  const handleClick1 = () => {
    startTransition(() => {
      navigate("/users/a@udc.es");
    });
  };

  const handleClick2 = () => {
    console.log(authUser);
  };

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />
        <div className="home-container">
          <h1>{t("test")}</h1>
        </div>
        <br />
        <Button onClick={handleClick1}>getUser</Button>
        <Button onClick={handleClick2}>authUser</Button>
      </Suspense>
    </>
  );
};

export default TestPage;
