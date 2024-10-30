import "./styles/lodgeapidetails.css";

import React, { Suspense, startTransition, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { User } from "@nextui-org/user";
import { useTranslation } from "react-i18next";
import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";
import ApiLodgeFeatureList from "./LodgeComponents/ApiLodgeFeatureList";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import IndicatorIcon from "../../icons/IndicatorIcon";
import { currencyConverter } from "../../Functions/currencyFunctions";
import { handleDateChange2 } from "../../Functions/calendarFunctions";
import { Divider } from "@nextui-org/divider";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import useApi from "../../hooks/useApi";

export default function LodgeApiDetails() {
  const [lodge, setLodge] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(0);

  const { email } = useParams();
  const hotel_id = email.split("_")[1].split("@")[0];

  const { getLodgeDetails } = useApi();

  const [t, i18n] = useTranslation(["lodgeApiDetails"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();

  useEffect(() => {
    const getLodgeAux = async () => {
      const lodge = await getLodgeDetails(hotel_id, currentLanguage);
      setLodge(lodge);
    };
    getLodgeAux();
  }, []);

  console.log(currentLanguage);
  console.log(lodge);

  const getDescription = (descriptions) => {
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
            <span className="lodgeApiDetails-address">{lodge?.address}</span>
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
            <Accordion variant="splitted">
              <AccordionItem
                key="description"
                aria-label="description"
                indicator={<IndicatorIcon />}
                title={t("description")}
              >
                {lodge && getDescription(lodge.description_translations)}
              </AccordionItem>
              <AccordionItem
                key="price"
                aria-label="price"
                indicator={<IndicatorIcon />}
                title={t("price")}
              >
                {/* {t("euro")}: {lodge?.price_per_night} €<br />
                {t("dollar")}: {lodge?.price_per_night} $<br />
                {t("pound")}: {lodge?.price_per_night} £ */}
                dinero
              </AccordionItem>
              <AccordionItem
                key="check-schedule"
                aria-label="check-schedule"
                indicator={<IndicatorIcon />}
                title={t("checkSchedule")}
              >
                {/* {t("checkIn")}: {lodge?.check_in} <br />
                {t("checkOut")}: {lodge?.check_out} */}
                checkin checkout
              </AccordionItem>
              <AccordionItem
                key="contact"
                aria-label="contact"
                indicator={<IndicatorIcon />}
                title={t("contact")}
              >
                {/* {t("email")}: {lodge?.lodge_email} <br />
                {t("phone")}: {lodge?.lodge_phone} */}
                contacto
              </AccordionItem>
            </Accordion>
          </div>
          <Divider
            className="lodgeApiDetails-Vdivider"
            orientation="vertical"
          />
          <div className="lodgeApiDetails-lodgeAvailability">
            <span className="lodgeApiDetails-rooms">
              {t("totalRooms")}: {lodge?.available_rooms}
            </span>
            <span className="lodgeApiDetails-rooms">
              {t("availableRooms")}: {availableRooms}
            </span>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
