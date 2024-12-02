import React, { useEffect, useState } from "react";
import { TimeInput } from "@nextui-org/date-input";
import ClockIcon from "../../../icons/ClockIcon";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../context/ThemeContext";
import { handleTimeChange2 } from "../../../Functions/calendarFunctions";

export default function UpdLodgeTimeInput({
  lodge,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { dark, color } = useThemeContext();

  useEffect(() => {
    const checkInValue = handleTimeChange2(lodge.check_in, "checkIn");
    const checkOutValue = handleTimeChange2(lodge.check_out, "checkOut");
    setCheckIn(checkInValue);
    setCheckOut(checkOutValue);
  }, [lodge.check_in, lodge.check_out, setCheckIn, setCheckOut]);

  return (
    <>
      <TimeInput
        label={t("checkIn")}
        isRequired
        variant="underlined"
        color={color}
        startContent={<ClockIcon color={dark ? "#FFDB58" : "#006FEE"} />}
        value={checkIn}
        onChange={setCheckIn}
      />
      <TimeInput
        label={t("checkOut")}
        isRequired
        variant="underlined"
        color={color}
        startContent={<ClockIcon color={dark ? "#FFDB58" : "#006FEE"} />}
        value={checkOut}
        onChange={setCheckOut}
      />
    </>
  );
}
