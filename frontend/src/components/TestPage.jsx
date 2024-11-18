import "./Lodge/styles/createlodge.css";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import useFeatures from "../hooks/useFeatures";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input, Textarea } from "@nextui-org/input";
import LodgeDescription from "./Lodge/CreateLodgeComponents/LodgeDescription";
import IndicatorIcon from "../icons/IndicatorIcon";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import LodgeTimeInput from "./Lodge/CreateLodgeComponents/LodgeTimeInput";
import CreateLodge from "./Lodge/CreateLodge";
import CreateLodgeSecondInputs from "./Lodge/CreateLodgeComponents/LodgeSecondInputs";
import LodgeMainImage from "./Lodge/CreateLodgeComponents/LodgeMainImage";
import LodgeFirstInputs from "./Lodge/CreateLodgeComponents/LodgeFirstInputs";
import LodgeDropZone from "./Lodge/CreateLodgeComponents/LodgeDropZone";

const TestPage = () => {
  const [t, i18n] = useTranslation(["createLodge"]);
  let navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [images, setImages] = useState([]);

  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <span>Test</span>
        <CreateLodgeSecondInputs />
        <br />
        <br />
        <br />
        <div>
          <LodgeDropZone images={images} setImages={setImages} />
        </div>
      </Suspense>
    </>
  );
};

export default TestPage;
