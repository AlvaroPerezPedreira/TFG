import "./styles/updatelodge.css";
import React, { Suspense, useState, startTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Divider } from "@nextui-org/divider";

import AppNavbar from "../AppNavbar";
import useGetLodge from "../../hooks/useGetLodge";
import UpdLodgeFirstInputs from "./UpdateLodgeComponents/UpdLodgeFirstInputs";
import UpdLodgeSecondInputs from "./UpdateLodgeComponents/UpdLodgeSecondInputs";
import UpdLodgeFeatureTable from "./UpdateLodgeComponents/UpdLodgeFeatureTable";
import UpdLodgeDropZone from "./UpdateLodgeComponents/UpdLodgeDropZone";
import { Button } from "@nextui-org/button";
import { handleTimeChange } from "../../Functions/calendarFunctions";
import useCreateLodge from "../../hooks/useCreateLodge";

export default function UpdateLodge() {
  const [t, i18n] = useTranslation(["createLodge"]);
  let navigate = useNavigate();

  const { email } = useParams();
  const { getLodge } = useGetLodge();
  const { updateLodge, uploadImages } = useCreateLodge();

  const [lodge, setLodge] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [country, setCountry] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [images, setImages] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodge(email);
      setLodge(lodge);

      if (lodge && lodge.country) {
        setCountry(lodge.country);
      }

      if (lodge && lodge.images && lodge.images.length > 0) {
        const firstImage = lodge.images[0].image_url;
        setMainImage({ name: firstImage });
      }
    };
    getLodgeAux();
  }, [email]);

  console.log("lodge", lodge);

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

    console.log(
      lodgeEmail,
      lodge_description,
      lodge_address,
      city,
      lodgePhone,
      availableRooms,
      pricePerNight,
      checkInDate,
      checkOutDate,
      country,
      mainImage,
      selectedFeatures
    );

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

    updateLodge(
      e,
      checkInDate,
      checkOutDate,
      country,
      allImages,
      orderedFeatures
    );

    console.log("allImgs", allImages);

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

  if (!lodge) return <div>Loading...</div>;

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <form className="updateLodge-container" onSubmit={handleSubmit}>
        <div className="updateLodge-header-container">
          <span>{t("updateLodge")}</span>
        </div>
        <UpdLodgeFirstInputs
          lodge={lodge}
          setCountry={setCountry}
          mainImageUrl={mainImageUrl}
          setMainImageUrl={setMainImageUrl}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
        <Divider className="updateLodge-horizontalDivider" />
        <UpdLodgeSecondInputs
          lodge={lodge}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />
        <Divider className="updateLodge-horizontalDivider" />
        <div className="createLodge-featureTableContainer">
          <UpdLodgeFeatureTable
            lodge={lodge}
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
          />
        </div>
        <Divider className="createLodge-horizontalDivider" />
        <div className="createLodge-imagesContainer">
          <UpdLodgeDropZone
            images={images}
            setImages={setImages}
            lodgeImages={lodge.images}
          />
          <div className="error-messages">
            {error && (
              <div className="error-container">
                <span className="error">{error}</span>
              </div>
            )}
          </div>
          <div className="updateLodge-buttonContainer">
            <Button
              className="bg-[#006FEE] dark:bg-[#FFDB58] text-black w-full"
              radius="none"
              type="submit"
              children={t("update")}
            />
          </div>
        </div>
      </form>
    </Suspense>
  );
}
