import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { MailIcon, LockIcon } from "../../../icons/MainAppIcons";

export default function LoginInputs() {
  const [t, i18n] = useTranslation(["login"]);

  return (
    <>
      <Input
        name="email"
        label={t("email")}
        variant="underlined"
        color="warning"
        startContent={<MailIcon />}
      />
      <Input
        name="password"
        label={t("passwd")}
        variant="underlined"
        color="warning"
        type="password"
        startContent={<LockIcon />}
      />
    </>
  );
}
