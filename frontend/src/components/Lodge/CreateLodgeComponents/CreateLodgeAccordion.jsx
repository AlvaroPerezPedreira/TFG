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

export default function CreateLodgeAccordion({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);

  return (
    <>
      <Accordion
        variant="light"
        className="p-2 flex flex-col gap-0 w-full"
        showDivider={false}
        selectionMode="multiple"
        isCompact
      >
        <AccordionItem
          key="check-schedule"
          aria-label="check-schedule"
          indicator={<IndicatorIcon />}
          title={t("checkSchedule")}
        >
          <LodgeTimeInput
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
          />
        </AccordionItem>
        <AccordionItem
          key="priceInfo"
          aria-label="priceInfo"
          indicator={<IndicatorIcon />}
          title={t("priceInfo")}
        >
          <Tooltip
            showArrow={false}
            content={t("pricePerNight_tt")}
            size="sm"
            placement="left"
            offset={25}
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
          <Input
            name="rooms"
            label={t("rooms")}
            variant="underlined"
            color="warning"
            isRequired
            startContent={<BedIcon />}
          />
        </AccordionItem>
        <AccordionItem
          key="contact"
          aria-label="contact"
          indicator={<IndicatorIcon />}
          title={t("contact")}
        >
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
        </AccordionItem>
      </Accordion>
    </>
  );
}
