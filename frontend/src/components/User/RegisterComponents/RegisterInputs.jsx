import { Input } from "@nextui-org/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { MailIcon, LockIcon, UserIcon } from "../../../icons/MainAppIcons";

export default function RegisterInputs() {
  const [t, i18n] = useTranslation(["register"]);

  return (
    <div>
      <Input
        name="email"
        label={t("email")}
        variant="underlined"
        color="warning"
        startContent={<MailIcon />}
      />
      <Input
        name="username"
        label={t("username")}
        variant="underlined"
        color="warning"
        startContent={<UserIcon />}
      />
      <Input
        name="password"
        label={t("passwd")}
        variant="underlined"
        color="warning"
        type="password"
        startContent={<LockIcon />}
      />
      <Input
        name="retype_password"
        label={t("retype_passwd")}
        variant="underlined"
        color="warning"
        type="password"
        startContent={<LockIcon />}
      />
    </div>
  );
}
