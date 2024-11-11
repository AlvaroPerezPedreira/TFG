import "./styles/home.css";
import React, { useEffect, useState } from "react";
import { startTransition } from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import useFeatures from "../hooks/useFeatures";
import { useNavigate } from "react-router-dom";
import SearchBar from "./GlobalComponents/SearchBar";

const TestPage = () => {
  const [features, setFeatures] = useState([]);

  const { getAllFeatures } = useFeatures();
  let navigate = useNavigate();

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
          <SearchBar />
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
