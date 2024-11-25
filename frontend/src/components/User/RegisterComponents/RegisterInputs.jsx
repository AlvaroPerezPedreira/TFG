import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { MailIcon, LockIcon, UserIcon } from "../../../icons/MainAppIcons";
import { useThemeContext } from "../../../context/ThemeContext";

export default function RegisterInputs() {
  const [t, i18n] = useTranslation(["register"]);
  const { dark, color } = useThemeContext();

  return (
    <div>
      <Input
        name="email"
        label={t("email")}
        variant="underlined"
        color={color}
        startContent={<MailIcon color={dark ? "#FFDB58": "#006FEE"}/>}
      />
      <Input
        name="username"
        label={t("username")}
        variant="underlined"
        color={color}
        startContent={<UserIcon color={dark ? "#FFDB58": "#006FEE"}/>}
      />
      <Input
        name="password"
        label={t("passwd")}
        variant="underlined"
        color={color}
        type="password"
        startContent={<LockIcon color={dark ? "#FFDB58": "#006FEE"}/>}
      />
      <Input
        name="retype_password"
        label={t("retype_passwd")}
        variant="underlined"
        color={color}
        type="password"
        startContent={<LockIcon color={dark ? "#FFDB58": "#006FEE"}/>}
      />
    </div>
  );
}
