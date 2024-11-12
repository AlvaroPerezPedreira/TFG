import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LodgeFirstInputs() {
  const [t, i18n] = useTranslation(["createLodge"]);

  return (
    <>
      <Input
        name="name"
        label={t("name")}
        variant="underlined"
        color="warning"
        isRequired
      />
      <Input
        name="address"
        label={t("address")}
        variant="underlined"
        color="warning"
        isRequired
      />
      <Input
        name="city"
        label={t("city")}
        variant="underlined"
        color="warning"
        isRequired
      />
    </>
  );
}
