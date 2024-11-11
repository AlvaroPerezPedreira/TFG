import "./styles/createlodge.css";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import LodgeFeatureTable from "./LodgeComponents/LodgeFeatureTable";

export default function CreateLodge() {
  const [t, i18n] = useTranslation(["FlagDropdown"]);

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  console.log("selectedFeatures", selectedFeatures);

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div>
        <span>Create Lodge</span>
      </div>
      <div className="createLodge-container">
        <div className="createLodge-featureTable">
          <LodgeFeatureTable
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
          />
        </div>
      </div>
    </Suspense>
  );
}
