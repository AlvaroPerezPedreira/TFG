import "./styles/home.css";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import useFeatures from "../hooks/useFeatures";

const TestPage = () => {
  const [features, setFeatures] = useState([]);

  const { getAllFeatures } = useFeatures();

  useEffect(() => {
    getAllFeatures({ setFeatures });
  }, []);

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="home-container">
          <span>Test</span>
          <button onClick={() => console.log(features)}>Features</button>
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
