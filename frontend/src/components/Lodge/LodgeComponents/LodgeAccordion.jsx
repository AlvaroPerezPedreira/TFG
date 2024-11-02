import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { currencyConverter } from "../../../Functions/currencyFunctions";
import IndicatorIcon from "../../../icons/IndicatorIcon";
import { useTranslation } from "react-i18next";

export default function LodgeAccordion({ lodge }) {
  const [t, i18n] = useTranslation(["lodgeDetails"]);

  const [dollars, setDollars] = useState(0);
  const [pounds, setPounds] = useState(0);

  useEffect(() => {
    currencyConverter({ value: lodge?.price_per_night, setDollars, setPounds });
  }, [lodge]);

  return (
    <Accordion variant="light">
      <AccordionItem
        key="description"
        aria-label="description"
        indicator={<IndicatorIcon />}
        title={t("description")}
      >
        <span style={{ color: "var(--AppMainColor)" }}>
          {lodge?.lodge_description}{" "}
        </span>
      </AccordionItem>
      <AccordionItem
        key="price"
        aria-label="price"
        indicator={<IndicatorIcon />}
        title={t("price")}
      >
        {t("euro")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>
          {lodge?.price_per_night} €
        </span>{" "}
        <br />
        {t("dollar")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>{dollars} $</span> <br />
        {t("pound")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>{pounds} £</span>{" "}
      </AccordionItem>
      <AccordionItem
        key="check-schedule"
        aria-label="check-schedule"
        indicator={<IndicatorIcon />}
        title={t("checkSchedule")}
      >
        {t("checkIn")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>{lodge?.check_in}</span>{" "}
        <br />
        {t("checkOut")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>{lodge?.check_out}</span>{" "}
        <br />
      </AccordionItem>
      <AccordionItem
        key="contact"
        aria-label="contact"
        indicator={<IndicatorIcon />}
        title={t("contact")}
      >
        {t("email")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>
          {lodge?.lodge_email}
        </span>{" "}
        <br />
        {t("phone")}:{" "}
        <span style={{ color: "var(--AppMainColor)" }}>
          {lodge?.lodge_phone}
        </span>
      </AccordionItem>
    </Accordion>
  );
}
