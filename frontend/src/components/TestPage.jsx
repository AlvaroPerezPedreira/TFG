import "./Lodge/styles/createlodge.css";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TestPage = () => {
  const [t, i18n] = useTranslation(["createLodge"]);
  let navigate = useNavigate();

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <span>Test</span>
        <br />
        <div></div>
      </Suspense>
    </>
  );
};

export default TestPage;
