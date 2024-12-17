import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import {
  MoneyIcon,
  MailIcon,
  PhoneIcon,
  BedIcon,
} from "../../../icons/MainAppIcons";
import { useThemeContext } from "../../../context/ThemeContext";
import UpdLodgeTimeInput from "./UpdLodgeTimeInput";

export default function UpdLodgeSecondInputs({
  lodge,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { color, dark } = useThemeContext();

  return (
    <div className="updateLodge-secondInputsContainer">
      <div className="updateLodge-timeInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>
          {t("checkSchedule")}
        </span>
        <UpdLodgeTimeInput
          lodge={lodge}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />
      </div>
      <div className="updateLodge-priceInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>{t("priceInfo")}</span>
        <Input
          name="rooms"
          placeholder={t("rooms")}
          defaultValue={lodge?.available_rooms || ""}
          label={lodge?.available_rooms ? t("rooms") : ""}
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
            placeholder={t("pricePerNight")}
            defaultValue={lodge?.price_per_night || ""}
            label={lodge?.price_per_night ? t("pricePerNight") : ""}
            variant="underlined"
            color={color}
            isRequired
            startContent={<MoneyIcon color={dark ? "#FFDB58" : "#006FEE"} />}
          />
        </Tooltip>
      </div>
      <div className="updateLodge-contactInputsContainer">
        <span style={{ color: "var(--AppMainColor)" }}>{t("contact")}</span>
        <Input
          name="email"
          placeholder={t("email")}
          defaultValue={lodge?.lodge_email || ""}
          label={lodge?.lodge_email ? t("email") : ""}
          variant="underlined"
          color={color}
          isRequired
          startContent={<MailIcon color={dark ? "#FFDB58" : "#006FEE"} />}
        />
        <Input
          name="phone"
          placeholder={t("phone")}
          defaultValue={lodge?.lodge_phone || ""}
          label={lodge?.lodge_phone ? t("phone") : ""}
          variant="underlined"
          color={color}
          isRequired
          startContent={<PhoneIcon color={dark ? "#FFDB58" : "#006FEE"} />}
        />
      </div>
    </div>
  );
}
