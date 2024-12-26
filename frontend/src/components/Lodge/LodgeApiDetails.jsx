import "./styles/lodgeapidetails.css";

import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ApiLodgeFeatureList from "./LodgeComponents/ApiLodgeFeatureList";
import { transformDate } from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import useApi from "../../hooks/useApi";
import EmblaCarousel from "./LodgeComponents/EmblaCarousel";
import UserLink from "./LodgeComponents/UserLink";
import LodgeApiAccordion from "./LodgeComponents/LodgeApiAccordion";
import AppNavbar from "../AppNavbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import useBookings from "../../hooks/useBookings";

export default function LodgeApiDetails() {
  const [t, i18n] = useTranslation(["lodgeApiDetails"]);
  const currentLanguage = i18n.language;
  const [lodge, setLodge] = useState(null);
  const [lodgeCheckInOut, setLodgeCheckInOut] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [hasReviews, setHasReviews] = useState(false);
  const { getHasReviews } = useBookings();

  const { getLodgeDetails, getLodgeDetailsCheckInOut, getLodgePhotos } =
    useApi();

  const { email } = useParams();
  const hotel_id = email.split("_")[1].split("@")[0];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const OPTIONS = { loop: true };

  let navigate = useNavigate();

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodgeDetails(hotel_id, currentLanguage);
      setLodge(lodge);
    };
    const getLodgeWithCheckInOutAux = async () => {
      const lodgeCheckInOut = await getLodgeDetailsCheckInOut(
        hotel_id,
        currentLanguage,
        checkIn,
        checkOut
      );
      setLodgeCheckInOut(lodgeCheckInOut);
    };
    const getPhotosAux = async () => {
      const photos = await getLodgePhotos({ hotel_id });
      setPhotos(photos);
      getHasReviews({ lodgeEmail: email, setHasReviews });
    };

    getLodgeAux();
    getLodgeWithCheckInOutAux();
    getPhotosAux();
  }, []);

  const handleBooking = async (e) => {
    startTransition(() => {
      const queryParams = new URLSearchParams({
        checkIn,
        checkOut,
      });
      navigate(`/bookApiLodge/${email}?${queryParams.toString()}`);
    });
  };

  const handleComments = () => {
    startTransition(() => {
      const queryParams = new URLSearchParams({
        checkIn,
        checkOut,
      });
      navigate(`/bookings/viewApiReviews/${email}?${queryParams.toString()}`);
    });
  };

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="lodgeApiDetails-container">
        <div className="lodgeApiDetails-firstinputs-container">
          <div className="lodgeApiDetails-row">
            <h1 className="lodgeApiDetails-lodgeName">{lodge?.name}</h1>
            <span className="lodgeApiDetails-provider">
              <span className="lodgeApiDetails-providerTitle">
                {t("provider")}:
              </span>
              <span className="lodgeApiDetails-providerName">
                {t("booking")}
              </span>
            </span>
          </div>
          <div className="lodgeApiDetails-userAvatar">
            <UserLink user={null} />
            <Button
              className="bg-[#006FEE] dark:bg-[#FFDB58] text-black"
              children={hasReviews ? t("viewComments") : t("noComments")}
              onPress={handleComments}
              isDisabled={!hasReviews}
            />
          </div>
          <div className="lodgeApiDetails-row">
            <span className="lodgeApiDetails-address">
              {lodge?.address}, {lodgeCheckInOut?.district}, {lodge?.zip},
              {lodge?.city}, {lodge?.country}
            </span>
          </div>
        </div>
        <Divider className="lodgeApiDetails-Hdivider" />
        <div className="w-full">
          {photos && Array.isArray(photos) && photos?.length > 0 && (
            <EmblaCarousel slides={photos} options={OPTIONS} />
          )}
        </div>
        <Divider className="lodgeApiDetails-Hdivider" />
        <div className="lodgeApiDetails-featureList">
          <ApiLodgeFeatureList lodge={lodge} />
        </div>
        <Divider className="lodgeApiDetails-Hdivider" />
        <div className="lodgeApiDetails-secondInputs">
          <div className="lodgeApiDetails-lodgeData">
            <LodgeApiAccordion
              email={email}
              lodge={lodge}
              lodgeCheckInOut={lodgeCheckInOut}
            />
          </div>
          <Divider
            className="lodgeApiDetails-Vdivider"
            orientation="vertical"
          />
          <div className="lodgeApiDetails-lodgeAvailability">
            <span className="lodgeApiDetials-datesTitle">
              {t("infoDates")} <br />
            </span>
            <span className="lodgeApiDetails-dates">
              {t("arrival")}:{" "}
              <span style={{ color: "var(--AppMainColor)" }}>
                {transformDate(checkIn)}
              </span>{" "}
              <br />
              {t("departure")}:{" "}
              <span style={{ color: "var(--AppMainColor)" }}>
                {transformDate(checkOut)}
              </span>
            </span>
            <span
              className="lodgeApiDetails-rooms"
              style={{ display: "block" }}
            >
              <span>
                {t("totalRooms")}:{" "}
                <span style={{ color: "var(--AppMainColor)" }}>
                  {lodgeCheckInOut?.available_rooms}
                </span>
              </span>
              <br />
              {lodgeCheckInOut?.composite_price_breakdown && (
                <span>
                  {t("price")}:{" "}
                  <span style={{ color: "var(--AppMainColor)" }}>
                    {lodgeCheckInOut.composite_price_breakdown.gross_amount.value.toFixed(
                      2
                    )}
                    {" €"}
                  </span>
                </span>
              )}
            </span>
            <div className="lodgeApiDetails-button">
              {lodgeCheckInOut?.available_rooms > 0 ? (
                <Button
                  className="bg-[#006FEE] dark:bg-[#FFDB58] text-black"
                  type="submit"
                  radius="none"
                  children={t("bookButton")}
                  onPress={handleBooking}
                />
              ) : (
                <span className="lodgeApiDetails-noRooms">
                  {t("noRooms")} <br />
                  {lodgeCheckInOut?.soldout_message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
