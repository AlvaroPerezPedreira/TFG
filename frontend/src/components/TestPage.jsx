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
import LodgeMainImage from "./Lodge/CreateLodgeComponents/LodgeMainImage";

const TestPage = () => {
  const [t, i18n] = useTranslation(["createLodge"]);
  let navigate = useNavigate();

  const [mainImage, setMainImage] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="home-container">
          <span>Test</span>
          <div style={{ maxWidth: "300px", gap: "10px" }}>
            <LodgeMainImage
              mainImageUrl={mainImageUrl}
              setMainImageUrl={setMainImageUrl}
              mainImage={mainImage}
              setMainImage={setMainImage}
            />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
