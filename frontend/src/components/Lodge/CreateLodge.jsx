import "./styles/createlodge.css";
import React, { Suspense, useState, startTransition } from "react";
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
import { useNavigate } from "react-router-dom";

export default function CreateLodge() {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { createLodge, uploadImages } = useCreateLodge();
  let navigate = useNavigate();

  const [error, setError] = useState("");

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

    const form = new FormData(e.currentTarget);
    const lodgeEmail = form.get("email");
    const lodge_description = form.get("description");
    const lodge_address = form.get("address");
    const city = form.get("city");
    const lodgePhone = form.get("phone");
    const availableRooms = form.get("rooms");
    const pricePerNight = form.get("pricePerNight");

    if (
      !lodgeEmail ||
      !lodge_description ||
      !lodge_address ||
      !city ||
      !lodgePhone ||
      !availableRooms ||
      !pricePerNight ||
      !checkIn ||
      !checkOut ||
      !country ||
      !mainImage ||
      selectedFeatures.length === 0
    ) {
      setError(t("errorEmptyFields")); // Error si algún campo esencial está vacío
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(lodgeEmail)) {
      setError(t("errorEmail")); // Error si el email no tiene formato válido
      return;
    }

    const phonePattern = /^[0-9]{9}$/;
    if (!phonePattern.test(lodgePhone)) {
      setError(t("errorPhone")); // Error si el teléfono no es válido
      return;
    }

    if (
      !Number.isInteger(Number(availableRooms)) ||
      Number(availableRooms) <= 0
    ) {
      setError(t("errorRooms")); // Error si el número de habitaciones no es un entero positivo
      return;
    }

    if (isNaN(pricePerNight) || parseFloat(pricePerNight) <= 0) {
      setError(t("errorPrice")); // Error si el precio por noche no es un número positivo
      return;
    }

    setError("");

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

    uploadImages(lodgeEmail, mainImage);

    async function uploadAllImages(lodgeEmail, images) {
      for (const image of images) {
        try {
          await uploadImages(lodgeEmail, image);
        } catch (error) {
          console.error(
            `Error uploading image: ${image.name || "unknown"}`,
            error
          );
        }
      }
    }
    uploadAllImages(lodgeEmail, images);

    startTransition(() => {
      navigate("/");
    });
  };

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <form className="createLodge-container" onSubmit={handleSubmit}>
        <div className="createLodge-header-container">
          <span>{t("createLodge")}</span>
        </div>
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
        <div className="error-messages">
          {error && (
            <div className="error-container">
              <span className="error">{error}</span>
            </div>
          )}
        </div>
        <div className="createLodge-buttonContainer">
          <Button
            className="bg-[#006FEE] dark:bg-[#FFDB58] text-black w-full"
            radius="none"
            type="submit"
            children={t("create")}
          />
        </div>
      </form>
    </Suspense>
  );
}
