import "./styles/createlodge.css";
import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import LodgeFeatureTable from "./CreateLodgeComponents/LodgeFeatureTable";
import { handleTimeChange } from "../../Functions/calendarFunctions";
import LodgeFirstInputs from "./CreateLodgeComponents/LodgeFirstInputs";
import { Button } from "@nextui-org/button";
import LodgeSecondInputs from "./CreateLodgeComponents/LodgeSecondInputs";
import { Divider } from "@nextui-org/divider";
import LodgeDropZone from "./CreateLodgeComponents/LodgeDropZone";
import useCreateLodge from "../../hooks/useCreateLodge";

export default function CreateLodge() {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { createLodge } = useCreateLodge();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [country, setCountry] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkInDate = handleTimeChange(checkIn, "checkIn");
    const checkOutDate = handleTimeChange(checkOut, "checkOut");

    const allImages = [
      { image_url: mainImage.name },
      ...images.map((image) => ({ image_url: image.name })),
    ];

    const orderedFeatures = [...selectedFeatures]
      .map((id) => ({ id: parseInt(id) }))
      .sort((a, b) => a.id - b.id);

    createLodge(
      e,
      checkInDate,
      checkOutDate,
      country,
      allImages,
      orderedFeatures
    );
  };

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div>
        <span>Create Lodge</span>
      </div>
      <form className="createLodge-container" onSubmit={handleSubmit}>
        <LodgeFirstInputs
          setCountry={setCountry}
          mainImageUrl={mainImageUrl}
          setMainImageUrl={setMainImageUrl}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
        <Divider className="createLodge-horizontalDivider" />
        <LodgeSecondInputs
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />
        <Divider className="createLodge-horizontalDivider" />
        <div className="createLodge-featureTableContainer">
          <LodgeFeatureTable
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
          />
        </div>
        <Divider className="createLodge-horizontalDivider" />
        <div className="createLodge-imagesContainer">
          <LodgeDropZone images={images} setImages={setImages} />
        </div>
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
