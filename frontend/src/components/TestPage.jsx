import "./styles/home.css";
import React, { useEffect } from "react";
import { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [t] = useTranslation(["welcome"]);
  let navigate = useNavigate();

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />
        <div className="home-container">
          <span>Test</span>
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
