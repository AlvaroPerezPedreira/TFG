import { Textarea } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../context/ThemeContext";

export default function LodgeDescription() {
  const [t, i18n] = useTranslation(["createLodge"]);
  const { color } = useThemeContext();

  return (
    <>
      <Textarea
        key="description"
        name="description"
        variant="bordered"
        label={t("description")}
        labelPlacement="outside"
        placeholder={t("description_ph")}
        color={color}
        isRequired
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
      />
    </>
  );
}
