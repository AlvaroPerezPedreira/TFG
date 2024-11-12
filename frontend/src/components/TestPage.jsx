import "./styles/home.css";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import useFeatures from "../hooks/useFeatures";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Textarea } from "@nextui-org/input";
import LodgeDescription from "./Lodge/CreateLodgeComponents/LodgeDescription";
import IndicatorIcon from "../icons/IndicatorIcon";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import LodgeTimeInput from "./Lodge/CreateLodgeComponents/LodgeTimeInput";
import CreateLodge from "./Lodge/CreateLodge";
import CreateLodgeAccordion from "./Lodge/CreateLodgeComponents/CreateLodgeAccordion";

const TestPage = () => {
  const [t, i18n] = useTranslation(["createLodge"]);
  const [features, setFeatures] = useState([]);

  const { getAllFeatures } = useFeatures();
  let navigate = useNavigate();

  useEffect(() => {
    getAllFeatures({ setFeatures });
  }, []);

  const [country, setCountry] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="home-container">
          <span>Test</span>
          <div style={{ maxWidth: "400px", gap: "10px" }}>
            <CreateLodgeAccordion
              checkIn={checkIn}
              checkOut={checkOut}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
            />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
