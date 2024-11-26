import React from "react";
import { useTranslation } from "react-i18next";
import LodgeTimeInput from "./LodgeTimeInput";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import {
  MoneyIcon,
  MailIcon,
  PhoneIcon,
  BedIcon,
} from "../../../icons/MainAppIcons";
import { useThemeContext } from "../../../context/ThemeContext";

export default function CreateLodgeAccordion({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { color, dark } = useThemeContext();

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
      <div className="createLodge-priceInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>{t("priceInfo")}</span>
        <Input
          name="rooms"
          label={t("rooms")}
          variant="underlined"
          color={color}
          isRequired
          startContent={<BedIcon color={dark ? "#FFDB58" : "#006FEE"} />}
        />
        <Tooltip
          showArrow={false}
          content={t("pricePerNight_tt")}
          size="sm"
          placement="bottom-start"
          offset={10}
          color={color}
        >
          <Input
            name="pricePerNight"
            label={t("pricePerNight")}
            variant="underlined"
            color={color}
            isRequired
            startContent={<MoneyIcon color={dark ? "#FFDB58" : "#006FEE"} />}
          />
        </Tooltip>
      </div>
      <div className="createLodge-contactInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>{t("contact")}</span>
        <Input
          name="email"
          label={t("email")}
          variant="underlined"
          color={color}
          isRequired
          startContent={<MailIcon color={dark ? "#FFDB58" : "#006FEE"} />}
        />
        <Input
          name="phone"
          label={t("phone")}
          variant="underlined"
          color={color}
          isRequired
          startContent={<PhoneIcon color={dark ? "#FFDB58" : "#006FEE"} />}
        />
      </div>
    </div>
  );
}
