import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";

export default function UpdateProfileFirstInputs({
  formData,
  handleInputChange,
}) {
  const [t, i18n] = useTranslation(["updProfile"]);

  return (
    <>
      <Input
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder={t("username")}
        variant="underlined"
        label={formData.username ? t("username") : ""}
      />

      <Input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder={t("name")}
        variant="underlined"
        label={formData.name ? t("name") : ""}
      />

      <Input
        name="lastname"
        value={formData.lastname}
        onChange={handleInputChange}
        placeholder={t("lastname")}
        variant="underlined"
        label={formData.lastname ? t("lastname") : ""}
      />

      <Input
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder={t("phone")}
        variant="underlined"
        label={formData.phone ? t("phone") : ""}
      />
    </>
  );
}
