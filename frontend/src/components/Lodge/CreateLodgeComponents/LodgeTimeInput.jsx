import React, { useState } from "react";
import { TimeInput } from "@nextui-org/date-input";
import ClockIcon from "../../../icons/ClockIcon";
import { useTranslation } from "react-i18next";

export default function LodgeTimeInput({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
}) {
  const [t, i18n] = useTranslation(["createLodge"]);

  return (
    <>
      <TimeInput
        label={t("checkIn")}
        isRequired
        variant="underlined"
        color="warning"
        startContent={<ClockIcon />}
        value={checkIn}
        onChange={setCheckIn}
      />
      <TimeInput
        label={t("checkOut")}
        isRequired
        variant="underlined"
        color="warning"
        startContent={<ClockIcon />}
        value={checkOut}
        onChange={setCheckOut}
      />
    </>
  );
}
