import React, { startTransition, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import "./styles/home.css";
import { useAuthContext } from "../context/AuthContext";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import SearchBar from "./GlobalComponents/SearchBar";
import LodgeBento from "./Lodge/LodgeComponents/LodgeBento";
import { useLodgeStore } from "../store/useLodgeStore";
import useGetLodges from "../hooks/useGetLodges";
import LodgeCard from "./Lodge/LodgeComponents/LodgeCard";

const Home = () => {
  const [t] = useTranslation(["home"]);
  const { authUser } = useAuthContext();
  let navigate = useNavigate();
  const { lodges } = useLodgeStore();
  const { getLodges } = useGetLodges();

  useEffect(() => {
    getLodges(0, 24);
  }, []);

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />
        <div className="home-container">
          <SearchBar />
          <LodgeBento />
          <br />
          <br />
          <div className="title-container">
            <span className="title-text">{t("title")}</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {lodges.map((lodge, index) => (
              <LodgeCard
                key={index}
                lodge_email={lodge.lodge_email}
                lodge_name={lodge.lodge_name}
                price_per_night={lodge.price_per_night}
                lodge_provider={lodge.lodge_provider}
                image_url={`http://localhost:8080/images/${lodge.images[0].image_url}`}
              />
            ))}
          </div>
          <br />
        </div>
      </Suspense>
    </>
  );
};

export default Home;
