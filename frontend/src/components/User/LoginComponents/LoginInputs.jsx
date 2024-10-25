import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LoginInputs() {
  const [t, i18n] = useTranslation(["login"]);

  return (
    <>
      <Input name="email" label={t("email")} variant="underlined" />
      <Input
        name="password"
        label={t("passwd")}
        variant="underlined"
        type="password"
      />
    </>
  );
}
