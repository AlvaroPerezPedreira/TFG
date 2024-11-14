import React from "react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import LodgeTimeInput from "./LodgeTimeInput";
import IndicatorIcon from "../../../icons/IndicatorIcon";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import {
  MoneyIcon,
  MailIcon,
  PhoneIcon,
  BedIcon,
} from "../../../icons/MainAppIcons";
import { Divider } from "@nextui-org/divider";

export default function CreateLodgeAccordion({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);

  return (
    <div className="createLodge-secondInputsContainer">
      <div className="createLodge-timeInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>
          {t("checkSchedule")}
        </span>
        <LodgeTimeInput
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />
      </div>
      <Divider orientation="vertical" className="createLodge-verticalDivider" />
      <div className="createLodge-priceInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>{t("priceInfo")}</span>
        <Input
          name="rooms"
          label={t("rooms")}
          variant="underlined"
          color="warning"
          isRequired
          startContent={<BedIcon />}
        />
        <Tooltip
          showArrow={false}
          content={t("pricePerNight_tt")}
          size="sm"
          placement="bottom-start"
          offset={10}
        >
          <Input
            name="pricePerNight"
            label={t("pricePerNight")}
            variant="underlined"
            color="warning"
            isRequired
            startContent={<MoneyIcon />}
          />
        </Tooltip>
      </div>
      <Divider orientation="vertical" className="createLodge-verticalDivider" />
      <div className="createLodge-contactInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>{t("contact")}</span>
        <Input
          name="email"
          label={t("email")}
          variant="underlined"
          color="warning"
          isRequired
          startContent={<MailIcon />}
        />
        <Input
          name="phone"
          label={t("phone")}
          variant="underlined"
          color="warning"
          isRequired
          startContent={<PhoneIcon />}
        />
      </div>
    </div>
  );
}
