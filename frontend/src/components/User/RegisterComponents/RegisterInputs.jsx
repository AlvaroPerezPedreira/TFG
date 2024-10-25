import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";

export default function RegisterInputs() {
  const [t, i18n] = useTranslation(["register"]);

  return (
    <div>
      <Input name="email" label={t("email")} variant="underlined" />
      <Input name="username" label={t("username")} variant="underlined" />
      <Input
        name="password"
        label={t("passwd")}
        variant="underlined"
        type="password"
      />
      <Input
        name="retype_password"
        label={t("retype_passwd")}
        variant="underlined"
        type="password"
      />
    </div>
  );
}
