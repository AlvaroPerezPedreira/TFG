import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { MailIcon, LockIcon } from "../../../icons/MainAppIcons";
import { useThemeContext } from "../../../context/ThemeContext";

export default function LoginInputs() {
  const [t, i18n] = useTranslation(["login"]);
  const { dark, color } = useThemeContext();

  return (
    <>
      <Input
        name="email"
        label={t("email")}
        variant="underlined"
        color={color}
        startContent={<MailIcon color={dark ? "#FFDB58": "#006FEE"}/>}
      />
      <Input
        name="password"
        label={t("passwd")}
        variant="underlined"
        color={color}
        type="password"
        startContent={<LockIcon color={dark ? "#FFDB58": "#006FEE"}/>}
      />
    </>
  );
}
