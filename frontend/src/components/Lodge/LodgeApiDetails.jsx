import "./styles/lodgeapidetails.css";

import React, { Suspense, startTransition, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useLocation, useParams } from "react-router-dom";
import { User } from "@nextui-org/user";
import { useTranslation } from "react-i18next";
import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";
import ApiLodgeFeatureList from "./LodgeComponents/ApiLodgeFeatureList";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import IndicatorIcon from "../../icons/IndicatorIcon";
import { transformDate } from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import useApi from "../../hooks/useApi";
import languageMap from "../../utils/LanguageMap";

export default function LodgeApiDetails() {
  let navigate = useNavigate();
  const [t, i18n] = useTranslation(["lodgeApiDetails"]);
  const currentLanguage = i18n.language;
  const [lodge, setLodge] = useState(null);
  const [lodgeCheckInOut, setLodgeCheckInOut] = useState(null);

  const { getLodgeDetails, getLodgeDetailsCheckInOut } = useApi();

  const { email } = useParams();
  const hotel_id = email.split("_")[1].split("@")[0];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

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
    getLodgeAux();
    getLodgeWithCheckInOutAux();
  }, []);

  console.log(lodge);
  console.log(lodgeCheckInOut);

  const getDescription = (descriptions) => {
    if (!descriptions) return t("noDescription");

    let locale = currentLanguage;
    if (locale === "en") {
      locale = "en-gb";
    }

    const descriptionObj = descriptions.find(
      (desc) => desc.languagecode === locale
    );
    return descriptionObj ? descriptionObj.description : t("noDescription");
  };

  return (
    <Suspense fallback="loading">
      <Navbar />
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
            <User
              name="Gleen D. Fogel"
              description={
                <Link
                  onClick={() => {
                    startTransition(() => {
                      navigate(`/users/LodgeOwner@apibooking.com`);
                    });
                  }}
                  size="sm"
                >
                  LodgeOwner@apibooking.com
                </Link>
              }
              avatarProps={{
                src: `http://localhost:8080/images/LodgeOwner@apibooking.com_BookingImg.jpg`,
              }}
            />
          </div>
          <div className="lodgeApiDetails-row">
            <span className="lodgeApiDetails-address">
              {lodge?.address}, {lodgeCheckInOut?.district}, {lodge?.zip},{" "}
              {lodge?.city}, {lodge?.country}
            </span>
          </div>
        </div>
        <Divider className="lodgeApiDetails-Hdivider" />
        <div className="lodgeApiDetails-imageCarousel"></div>
        <Divider className="lodgeApiDetails-Hdivider" />
        <div className="lodgeApiDetails-featureList">
          <ApiLodgeFeatureList lodge={lodge} />
        </div>
        <Divider className="lodgeApiDetails-Hdivider" />
        <div className="lodgeApiDetails-secondInputs">
          <div className="lodgeApiDetails-lodgeData">
            <Accordion variant="light">
              <AccordionItem
                key="description"
                aria-label="description"
                indicator={<IndicatorIcon />}
                title={t("description")}
              >
                {lodge && lodge.description_translations
                  ? getDescription(lodge.description_translations)
                  : t("noDescription")}
              </AccordionItem>
              <AccordionItem
                key="check-schedule"
                aria-label="check-schedule"
                indicator={<IndicatorIcon />}
                title={t("checkSchedule")}
              >
                {t("checkIn")}: {lodge?.checkin.from} <br />
                {t("checkOut")}: {lodge?.checkout.to}
              </AccordionItem>
              <AccordionItem
                key="moreInfo"
                aria-label="moreInfo"
                indicator={<IndicatorIcon />}
                title={t("moreInfo")}
              >
                <Accordion variant="bordered">
                  <AccordionItem
                    key="coordinates"
                    aria-label="coordinates"
                    indicator={<IndicatorIcon />}
                    title={t("coordinates")}
                  >
                    {t("lat")}: {lodge?.location.latitude} <br />
                    {t("lon")}: {lodge?.location.longitude}
                  </AccordionItem>
                  <AccordionItem
                    key="languages"
                    aria-label="languages"
                    indicator={<IndicatorIcon />}
                    title={t("languages")}
                  >
                    {lodge?.languages_spoken.languagecode.map((code, index) => (
                      <span key={index}>
                        {languageMap[code] || code} <br />
                      </span>
                    ))}
                  </AccordionItem>
                  <AccordionItem
                    key="review"
                    aria-label="review"
                    indicator={<IndicatorIcon />}
                    title={t("review")}
                  >
                    {t("reviewCount")}: {lodge?.review_nr} <br />
                    {t("rating")}: {lodge?.review_score} <br />
                    {t("wifiRating")}:{" "}
                    {lodgeCheckInOut?.wifi_review_score.rating > 0
                      ? lodgeCheckInOut.wifi_review_score.rating
                      : t("noRating")}
                    <br />
                    {t("breakfastRating")}:{" "}
                    {lodgeCheckInOut?.breakfast_review_score.review_score > 0
                      ? lodgeCheckInOut.breakfast_review_score.review_score
                      : t("noRating")}
                  </AccordionItem>
                  <AccordionItem
                    key="timezone"
                    aria-label="timezone"
                    indicator={<IndicatorIcon />}
                    title={t("timezone")}
                  >
                    {t("timezone2")}: {lodgeCheckInOut?.timezone} <br />
                  </AccordionItem>
                </Accordion>
              </AccordionItem>
              <AccordionItem
                key="contact"
                aria-label="contact"
                indicator={<IndicatorIcon />}
                title={t("contact")}
              >
                {t("email")}: {email} <br />
                {t("url")}: {lodge?.url}
              </AccordionItem>
            </Accordion>
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
              {t("arrival")}: {transformDate(checkIn)} <br />
              {t("departure")}: {transformDate(checkOut)}
            </span>
            <span className="lodgeApiDetails-rooms">
              {t("totalRooms")}: {lodgeCheckInOut?.available_rooms} <br />
              {lodgeCheckInOut?.composite_price_breakdown && (
                <>
                  {t("price")}:{" "}
                  {lodgeCheckInOut.composite_price_breakdown.gross_amount.value}{" "}
                  {" €"}
                </>
              )}
            </span>
            <div className="lodgeApiDetails-button">
              {lodgeCheckInOut?.available_rooms > 0 ? (
                <Button
                  className="bg-[#FFDB58] text-black"
                  type="submit"
                  radius="none"
                >
                  {t("bookButton")}
                </Button>
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
    </Suspense>
  );
}
