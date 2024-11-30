import React, { startTransition } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import IndicatorIcon from "../../../icons/IndicatorIcon";
import languageMap from "../../../utils/LanguageMap";
import { useThemeContext } from "../../../context/ThemeContext";
import { Link } from "@nextui-org/link";

export default function LodgeApiAccordion({ email, lodge, lodgeCheckInOut }) {
  const [t, i18n] = useTranslation(["lodgeApiDetails"]);
  const currentLanguage = i18n.language;
  let navigate = useNavigate();
  const { dark } = useThemeContext();

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
    <Accordion variant="light">
      <AccordionItem
        key="description"
        aria-label="description"
        indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
        title={t("description")}
      >
        <span style={{ color: "var(--AppMainColor)" }}>
          {lodge && lodge.description_translations
            ? getDescription(lodge.description_translations)
            : t("noDescription")}{" "}
        </span>{" "}
      </AccordionItem>
      <AccordionItem
        key="check-schedule"
        aria-label="check-schedule"
        indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
        title={t("checkSchedule")}
      >
        {t("checkIn")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>
          {lodge?.checkin.from}
        </span>{" "}
        <br />
        {t("checkOut")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>
          {lodge?.checkout.to}
        </span>{" "}
      </AccordionItem>
      <AccordionItem
        key="moreInfo"
        aria-label="moreInfo"
        indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
        title={t("moreInfo")}
      >
        <Accordion variant="bordered">
          <AccordionItem
            key="coordinates"
            aria-label="coordinates"
            indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
            title={t("coordinates")}
          >
            {t("lat")}:{" "}
            <span style={{ color: "var(--AppMainColor)" }}>
              {lodge?.location.latitude}
            </span>{" "}
            <br />
            {t("lon")}:{" "}
            <span style={{ color: "var(--AppMainColor)" }}>
              {lodge?.location.longitude}
            </span>{" "}
          </AccordionItem>
          <AccordionItem
            key="languages"
            aria-label="languages"
            indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
            title={t("languages")}
          >
            {lodge?.languages_spoken.languagecode.map((code, index) => (
              <span key={index} style={{ color: "var(--AppMainColor)" }}>
                {languageMap[code] || code} <br />
              </span>
            ))}
          </AccordionItem>
          <AccordionItem
            key="review"
            aria-label="review"
            indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
            title={t("review")}
          >
            {t("reviewCount")}:{" "}
            <span style={{ color: "var(--AppMainColor)" }}>
              {lodge?.review_nr}
            </span>{" "}
            <br />
            {t("rating")}:{" "}
            <span style={{ color: "var(--AppMainColor)" }}>
              {lodge?.review_score}
            </span>{" "}
            <br />
            {t("wifiRating")}:{" "}
            <span style={{ color: "var(--AppMainColor)" }}>
              {lodgeCheckInOut?.wifi_review_score.rating > 0 &&
              lodgeCheckInOut.wifi_review_score.rating
                ? lodgeCheckInOut.wifi_review_score.rating
                : t("noRating")}{" "}
            </span>{" "}
            <br />
            {t("breakfastRating")}:{" "}
            <span style={{ color: "var(--AppMainColor)" }}>
              {lodgeCheckInOut?.breakfast_review_score.review_score > 0 &&
              lodgeCheckInOut.breakfast_review_score.review_score
                ? lodgeCheckInOut.breakfast_review_score.review_score
                : t("noRating")}{" "}
            </span>{" "}
          </AccordionItem>
          <AccordionItem
            key="timezone"
            aria-label="timezone"
            indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
            title={t("timezone")}
          >
            {t("timezone2")}:{" "}
            <span style={{ color: "var(--AppMainColor)" }}>
              {lodgeCheckInOut?.timezone}{" "}
            </span>{" "}
            <br />
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem
        key="contact"
        aria-label="contact"
        indicator={<IndicatorIcon color={dark ? "white" : "black"} />}
        title={t("contact")}
      >
        {t("email")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>{email}</span> <br />
        {t("url")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>
          <Link href={lodge?.url} size="sm" isExternal>
            {lodge?.url}
          </Link>
        </span>
      </AccordionItem>
    </Accordion>
  );
}
