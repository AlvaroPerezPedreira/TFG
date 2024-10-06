import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LoginInputs() {
  const [t, i18n] = useTranslation(["login"]);

  return (
    <>
      <Input name="email" placeholder={t("email")} variant="underlined" />
      <Input
        name="password"
        placeholder={t("passwd")}
        variant="underlined"
        type="password"
      />
    </>
  );
}
