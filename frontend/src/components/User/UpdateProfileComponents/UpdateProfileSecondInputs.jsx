import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";

export default function UpdateProfileSecondInputs({
  formData,
  handleInputChange,
}) {
  const [t, i18n] = useTranslation(["updProfile"]);

  return (
    <>
      <Input
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        placeholder={t("country")}
        variant="underlined"
        label={formData.country ? t("country") : ""}
      />

      <Input
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder={t("address")}
        variant="underlined"
        label={formData.address ? t("address") : ""}
      />

      <Input
        name="passport"
        value={formData.passport}
        onChange={handleInputChange}
        placeholder={t("passport")}
        variant="underlined"
        label={formData.passport ? t("passport") : ""}
      />
    </>
  );
}
