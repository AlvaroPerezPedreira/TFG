import "./styles/lodgedetails.css";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LodgeFeatureList from "./LodgeComponents/LodgeFeatureList";
import { handleDateChange2 } from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import useGetLodge from "../../hooks/useGetLodge";
import EmblaCarousel from "./LodgeComponents/EmblaCarousel";
import UserLink from "./LodgeComponents/UserLink";
import LodgeAccordion from "./LodgeComponents/LodgeAccordion";
import AppNavbar from "../AppNavbar";
import { useThemeContext } from "../../context/ThemeContext";

export default function LodgeDetails() {
  const [lodge, setLodge] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(0);

  const { email } = useParams();
  const { getLodge } = useGetLodge();
  const { color } = useThemeContext();

  const [t, i18n] = useTranslation(["lodgeDetails"]);
  const currentLanguage = i18n.language;

  const OPTIONS = { loop: true };

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodge(email);
      setLodge(lodge);
    };
    getLodgeAux();
  }, []);

  console.log(lodge);

  const handleDateChangeAux = (dates) => {
    handleDateChange2(dates, setCheckIn, setCheckOut);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(checkIn, checkOut);
  };

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="lodgeDetails-container">
        <div className="lodgeDetails-firstinputs-container">
          <div className="lodgeDetails-row">
            <h1 className="lodgeDetails-lodgeName">{lodge?.lodge_name}</h1>
            <span className="lodgeDetails-provider">
              <span className="lodgeDetails-providerTitle">
                {t("provider")}:
              </span>
              <span className="lodgeDetails-providerName">
                {lodge?.lodge_provider}
              </span>
            </span>
          </div>
          <div className="lodgeDetails-userAvatar">
            <UserLink user={lodge?.user} />
          </div>
          <div className="lodgeDetails-row">
            <span className="lodgeDetails-address">{lodge?.lodge_address}</span>
          </div>
        </div>
        <Divider className="lodgeDetails-Hdivider" />
        <div className="w-full">
          {lodge?.images?.length > 0 && (
            <EmblaCarousel slides={lodge.images} options={OPTIONS} />
          )}
        </div>
        <Divider className="lodgeDetails-Hdivider" />
        <div className="lodgeDetails-featureList">
          {lodge?.features.map((feature, index) => (
            <LodgeFeatureList
              key={index}
              feature={feature}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
        <Divider className="lodgeDetails-Hdivider" />
        <div className="lodgeDetails-secondInputs">
          <div className="lodgeDetails-lodgeData">
            <LodgeAccordion lodge={lodge} />
          </div>
          <Divider className="lodgeDetails-Vdivider" orientation="vertical" />
          <div className="lodgeDetails-lodgeAvailability">
            <span className="lodgeDetails-rooms">
              {t("totalRooms")}: {lodge?.available_rooms}
            </span>
            <span className="lodgeDetails-rooms">
              {t("availableRooms")}: {availableRooms}
            </span>
            <form
              className="lodgeDetails-checkAvailability"
              onSubmit={handleSubmit}
            >
              <DateRangePicker
                label={t("stay_duration")}
                variant="bordered"
                visibleMonths={1}
                startName="checkIn"
                endName="checkOut"
                color={color}
                isRequired
                onChange={handleDateChangeAux}
              />
              <div className="lodgeDetails-button">
                <Button
                  className="bg-[#006FEE] dark:bg-[#FFDB58] text-black"
                  type="submit"
                  radius="none"
                >
                  {t("checkButton")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <></>
    </Suspense>
  );
}
