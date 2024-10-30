import "./styles/lodgedetails.css";

import React, { Suspense, startTransition, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { User } from "@nextui-org/user";
import { useTranslation } from "react-i18next";
import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";
import LodgeFeatureList from "./LodgeComponents/LodgeFeatureList";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import IndicatorIcon from "../../icons/IndicatorIcon";
import { currencyConverter } from "../../Functions/currencyFunctions";
import { handleDateChange2 } from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import useGetLodge from "../../hooks/useGetLodge";

export default function LodgeDetails() {
  const [lodge, setLodge] = useState(null);
  const [dollars, setDollars] = useState(0);
  const [pounds, setPounds] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(0);

  const { email } = useParams();
  const { getLodge } = useGetLodge();

  const [t, i18n] = useTranslation(["lodgeDetails"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodge(email);
      setLodge(lodge);
    };
    getLodgeAux();
  }, []);

  useEffect(() => {
    currencyConverter({ value: lodge?.price_per_night, setDollars, setPounds });
  }, [lodge]);

  const handleDateChangeAux = (dates) => {
    handleDateChange2(dates, setCheckIn, setCheckOut);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(checkIn, checkOut);
  };

  return (
    <Suspense fallback="loading">
      <Navbar />
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
            <User
              name={lodge?.user.name + " " + lodge?.user.lastname}
              description={
                <Link
                  onClick={() => {
                    startTransition(() => {
                      navigate(`/users/${lodge?.user.email}`);
                    });
                  }}
                  size="sm"
                >
                  {lodge?.user.email}
                </Link>
              }
              avatarProps={{
                src: `http://localhost:8080/images/${lodge?.user.avatar}`,
              }}
            />
          </div>
          <div className="lodgeDetails-row">
            <span className="lodgeDetails-address">{lodge?.lodge_address}</span>
          </div>
        </div>
        <Divider className="lodgeDetails-Hdivider" />
        <div className="lodgeDetails-imageCarousel"></div>
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
            <Accordion variant="splitted">
              <AccordionItem
                key="description"
                aria-label="description"
                indicator={<IndicatorIcon />}
                title={t("description")}
              >
                {lodge?.lodge_description}
              </AccordionItem>
              <AccordionItem
                key="price"
                aria-label="price"
                indicator={<IndicatorIcon />}
                title={t("price")}
              >
                {t("euro")}: {lodge?.price_per_night} €<br />
                {t("dollar")}: {dollars} $<br />
                {t("pound")}: {pounds} £
              </AccordionItem>
              <AccordionItem
                key="check-schedule"
                aria-label="check-schedule"
                indicator={<IndicatorIcon />}
                title={t("checkSchedule")}
              >
                {t("checkIn")}: {lodge?.check_in} <br />
                {t("checkOut")}: {lodge?.check_out}
              </AccordionItem>
              <AccordionItem
                key="contact"
                aria-label="contact"
                indicator={<IndicatorIcon />}
                title={t("contact")}
              >
                {t("email")}: {lodge?.lodge_email} <br />
                {t("phone")}: {lodge?.lodge_phone}
              </AccordionItem>
            </Accordion>
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
                isRequired
                onChange={handleDateChangeAux}
              />
              <div className="lodgeDetails-button">
                <Button
                  className="bg-[#FFDB58] text-black"
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
    </Suspense>
  );
}
