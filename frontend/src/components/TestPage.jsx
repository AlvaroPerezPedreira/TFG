import "./styles/home.css";
import React, { useEffect } from "react";
import { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import useGetLodges from "../hooks/useGetLodges";
import { useLodgeStore } from "../store/useLodgeStore";
import HotelsList from "./HotelsList";
import SearchBar from "./GlobalComponents/SearchBar";
import LodgeCard from "./Lodge/LodgeComponents/LodgeCard";
import LodgeBento from "./Lodge/LodgeComponents/LodgeBento";

const TestPage = () => {
  const [t] = useTranslation(["welcome"]);
  let navigate = useNavigate();
  const { lodges } = useLodgeStore();
  const { getLodges } = useGetLodges();

  useEffect(() => {
    getLodges(0, 12);
  }, []);

  return (
    <>
      <Suspense fallback="loading">
        <Navbar />
        <div className="home-container">
          <SearchBar />
          <br />

          <LodgeBento />

          <br />

          <div className="flex flex-wrap justify-center">
            {lodges.map((lodge, index) => (
              <LodgeCard
                index={index}
                id={lodge.id}
                lodge_name={lodge.lodge_name}
                price_per_night={lodge.price_per_night}
                lodge_provider={lodge.lodge_provider}
                image_url={`http://localhost:8080/images/${lodge.images[0].image_url}`}
              />
            ))}
          </div>

          <br />
          <br />
          <br />

          <HotelsList />
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
