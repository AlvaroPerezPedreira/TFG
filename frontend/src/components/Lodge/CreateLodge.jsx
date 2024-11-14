import "./styles/createlodge.css";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import LodgeFeatureTable from "./CreateLodgeComponents/LodgeFeatureTable";
import LodgeTimeInput from "./CreateLodgeComponents/LodgeTimeInput";
import { handleTimeChange } from "../../Functions/calendarFunctions";
import LodgeFirstInputs from "./CreateLodgeComponents/LodgeFirstInputs";
import LodgeCountryAutocomplete from "./CreateLodgeComponents/LodgeCountryAutocomplete";
import { Button } from "@nextui-org/button";
import LodgeDescription from "./CreateLodgeComponents/LodgeDescription";
import CreateLodgeAccordion from "./CreateLodgeComponents/CreateLodgeAccordion";
import LodgeMainImage from "./CreateLodgeComponents/LodgeMainImage";

export default function CreateLodge() {
  const [t, i18n] = useTranslation(["createLodge"]);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [country, setCountry] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);

  const handleClick = () => {
    const checkInDate = handleTimeChange(checkIn, "checkIn");
    const checkOutDate = handleTimeChange(checkOut, "checkOut");

    console.log(checkInDate, checkOutDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div>
        <span>Create Lodge</span>
      </div>
      <form className="createLodge-container" onSubmit={handleSubmit}>
        <div className="createLodge-firstInputsContainer">
          <LodgeFirstInputs />
        </div>
        <div className="createLodge-secondInputsContainer">
          <CreateLodgeAccordion
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
          />
        </div>
        <div className="createLodge-mainImageContainer">
          <LodgeMainImage
            mainImageUrl={mainImageUrl}
            setMainImageUrl={setMainImageUrl}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
        </div>
        <div className="createLodge-countryContainer">
          <LodgeCountryAutocomplete setCountry={setCountry} />
        </div>
        <div className="createLodge-descriptionContainer">
          <LodgeDescription />
        </div>

        <div className="createLodge-featureTableContainer">
          <LodgeFeatureTable
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
          />
        </div>
        <button onClick={handleClick}>dasfdsaf</button>
        <div className="createLodge-buttonContainer">
          <Button
            className="bg-[#FFDB58] text-black w-full"
            radius="none"
            type="submit"
            children={t("create")}
          />
        </div>
      </form>
    </Suspense>
  );
}
