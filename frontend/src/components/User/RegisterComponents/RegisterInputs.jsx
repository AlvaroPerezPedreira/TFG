import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";

export default function RegisterInputs() {
  const [t, i18n] = useTranslation(["register"]);

  return (
    <>
      <Input name="email" placeholder={t("email")} variant="underlined" />
      <Input name="username" placeholder={t("username")} variant="underlined" />
      <Input
        name="password"
        placeholder={t("passwd")}
        variant="underlined"
        type="password"
      />
      <Input
        name="retype_password"
        placeholder={t("retype_passwd")}
        variant="underlined"
        type="password"
      />
    </>
  );
}
